export const config = {
  matcher: ['/((?!_next/|_vercel/|favicon\\.ico).*)'],
  runtime: 'edge',
};

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export default function middleware(request) {
  const expectedUser = process.env.AUDIT_USER || 'apiant';
  const expectedPwd = process.env.AUDIT_PASSWORD;

  if (!expectedPwd) {
    return new Response('Audit dashboard misconfigured: AUDIT_PASSWORD not set', {
      status: 500,
    });
  }

  const auth = request.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      let decoded = '';
      try {
        decoded = atob(encoded);
      } catch {
        decoded = '';
      }
      const idx = decoded.indexOf(':');
      if (idx !== -1) {
        const user = decoded.slice(0, idx);
        const pwd = decoded.slice(idx + 1);
        if (timingSafeEqual(user, expectedUser) && timingSafeEqual(pwd, expectedPwd)) {
          return;
        }
      }
    }
  }

  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="APIANT Audit Dashboard", charset="UTF-8"',
      'Cache-Control': 'no-store',
    },
  });
}
