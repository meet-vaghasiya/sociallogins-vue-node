import { OAuth2Client } from "google-auth-library";
import axios from "axios"; // Add axios for making HTTP requests

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function exchangeCodeForToken(code) {
  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await fetch(
    `https://oauth2.googleapis.com/token?${params}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  // Verify the token received from the exchange
  console.log('cccccccccccccccalling verifyGoogleToken');
  return await verifyGoogleToken(data.id_token);
}

export async function verifyGoogleToken(token) {
    console.log({token});
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log('get ticket', ticket);
    const payload = ticket.getPayload();
    console.log('get payload', payload);
    
    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      sub: payload.sub,
    };
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}
