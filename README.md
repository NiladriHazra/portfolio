# niladri.in

Personal site of Niladri Hazra (Humi). Live at [niladri.in](https://niladri.in) and [niladrihazra.com](https://niladrihazra.com).

Next.js static export, served from Cloudflare Workers static assets.

```bash
npm install
npm run dev        # local dev on :3000
npm run resume     # re-render public/resume.pdf and public/og.png from scripts/*.html
npm run deploy     # next build && wrangler deploy
```

Content lives in `data/`: `site.ts` (bio, links), `project.tsx` (cards), `caseStudies.ts` (project pages), `experience.ts` (roles, education).

Built on [portfolio-template](https://github.com/prasanjit-dey-ux/portfolio-template) by Prasanjit Dey (MIT).
