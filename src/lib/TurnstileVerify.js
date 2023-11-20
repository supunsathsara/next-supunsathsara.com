export default async function TurnstileVerify(token){
    const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
    const secret = process.env.TURNSTILE_SECRET

    const res = await fetch(verifyEndpoint, {
        method: 'POST',
        body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
    
      const data = await res.json()

      return data;
}