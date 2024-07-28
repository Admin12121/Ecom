import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';

function generateSignature() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const token = cookies.access_token || null;

  const encsh = cookies.encsh;
  const enclg = cookies.enclg;

  let newEncsh = null;
  let newEnclg = null;

  if (!encsh && !enclg) {
    newEncsh = generateSignature();
    newEnclg = generateSignature();
  } else if (!encsh && enclg) {
    newEncsh = generateSignature();
    newEnclg = enclg;
  } else if (encsh && !enclg) {
    newEncsh = encsh;
    newEnclg = generateSignature();
  }

  if (newEncsh || newEnclg && !encsh) {
    const ipResponse = await fetch('https://ipinfo.io?token=4b2c23c07a83a2');
    const ipData = await ipResponse.json();

    const { ip, city, region, country } = ipData;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}api/accounts/site-view-logs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          user_agent: req.headers.get('user-agent'),
          ip_address: ip,
          location: {
            city: city,
            region: region,
            country: country,
          },
          encsh: newEncsh,
          enclg: newEnclg,
        }),
      });

      if (response.ok) {
        const responseCookies = new Response(null, { status: 201 });

        if (newEncsh) {
          responseCookies.headers.append('Set-Cookie', `encsh=${newEncsh}; Path=/;  SameSite=Strict`);
        }
        if (newEnclg) {
          responseCookies.headers.append('Set-Cookie', `enclg=${newEnclg}; Path=/;  SameSite=Strict; Max-Age=${60 * 60 * 24 * 365}`);
        }

        return responseCookies;
      } else {
        console.error('Failed to log view with status:', response.status);
        return NextResponse.json({ error: 'Failed to log view' }, { status: response.status });
      }
    } catch (error) {
      console.error('Error logging view:', error);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }

  return NextResponse.json({ status: 'No new cookies needed' }, { status: 200 });
}
