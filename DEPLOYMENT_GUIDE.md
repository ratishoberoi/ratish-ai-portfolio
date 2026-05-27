# Deployment Guide

## GitHub Pages

1. Push the repository to GitHub.
2. In GitHub, open Settings -> Pages.
3. Set Source to GitHub Actions.
4. The included workflow runs:

```bash
npm ci
npm run build:github
```

5. The exported site is uploaded from `out/`.

Expected URL for this repo:

```text
https://ratishoberoi.github.io/ratish-ai-portfolio/
```

## Vercel

1. Import `ratishoberoi/ratish-ai-portfolio` in Vercel.
2. Framework preset: Next.js.
3. Build command:

```bash
npm run build
```

4. Output is handled by Vercel automatically.

For Vercel, do not set `NEXT_PUBLIC_BASE_PATH`.

## Custom Domain

1. Add the domain in GitHub Pages or Vercel project settings.
2. For an apex domain, create A records pointing to the provider.
3. For a subdomain, create a CNAME record.
4. After DNS is verified, enable HTTPS in the provider settings.

## Local Preview

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```
