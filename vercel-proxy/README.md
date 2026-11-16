# vercel-proxy

The domains (niladri.in, niladrihazra.com) stay on Vercel DNS. This Vercel
project owns them and forwards every request to the Cloudflare Worker that
actually serves the site (`npm run deploy` in the repo root).

Deploy: `cd vercel-proxy && vercel deploy --prod`
