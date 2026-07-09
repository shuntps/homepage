# Homepage

[![CI](https://github.com/shuntps/homepage/actions/workflows/ci.yml/badge.svg)](https://github.com/shuntps/homepage/actions/workflows/ci.yml)
[![Release](https://github.com/shuntps/homepage/actions/workflows/release.yml/badge.svg)](https://github.com/shuntps/homepage/actions/workflows/release.yml)
[![Latest Release](https://img.shields.io/github/v/release/shuntps/homepage?label=latest%20release)](https://github.com/shuntps/homepage/releases)
[![Docker Hub](https://img.shields.io/docker/v/shuntps/homepage?sort=semver&logo=docker&label=docker%20hub)](https://hub.docker.com/r/shuntps/homepage)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-339933?logo=node.js&logoColor=white)](package.json)

A small, Docker-ready Next.js landing page for a personal homelab. It renders a
futuristic terminal-style homepage with runtime configuration, SEO routes, a
generated Open Graph image, and a hardened container deployment path.

## Features

- Runtime-configured domain, description, keywords, author, and locale.
- Terminal-style landing page with typewriter animation and live clock.
- SEO metadata, JSON-LD, Open Graph, Twitter Card, sitemap, and robots.txt.
- Generated Open Graph image at `/opengraph-image`.
- PWA manifest and complete favicon set.
- RFC 9116 `/.well-known/security.txt` route.
- Lightweight `/api/health` liveness endpoint.
- Docker standalone output with non-root runtime.
- GitHub Actions validation, release, Docker publishing, secret scanning, and image scanning.

## Tech Stack

- [Next.js 16](https://nextjs.org) with the App Router and standalone output.
- [React 19](https://react.dev).
- [Tailwind CSS v4](https://tailwindcss.com).
- Docker and Docker Compose for deployment.
- GitHub Actions for CI/CD.

## Requirements

- Node.js 22 or newer.
- npm 10 or newer.
- Docker with the Compose plugin, for container deployment.

The repository includes `.nvmrc` and `package.json` engine metadata to keep the
local toolchain aligned with CI and Docker.

## Quick Start

Clone and install:

```bash
git clone https://github.com/shuntps/homepage.git
cd homepage
npm install
```

Create local configuration:

```bash
cp .env.example .env
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Configuration

All runtime configuration is provided through environment variables. Local
values belong in `.env`, which is ignored by Git. Commit only safe placeholders
in `.env.example`.

### Site

| Variable | Description | Example |
| --- | --- | --- |
| `SITE_DOMAIN` | Domain displayed on the page and used for metadata | `example.com` |
| `SITE_DESCRIPTION` | SEO description | `My personal homelab.` |
| `SITE_KEYWORDS` | Comma-separated SEO keywords | `homelab,self-hosted` |
| `SITE_AUTHOR` | Author name used in metadata | `yourname` |
| `SITE_LOCALE` | Locale tag, normalized by the app | `en_CA` |
| `SECURITY_TXT_EXPIRES` | Optional fixed `security.txt` expiry in ISO 8601 | `2027-01-01T00:00:00.000Z` |
| `SECURITY_TXT_CONTACT` | Optional `mailto:` or `https:` contact URI | `mailto:security@example.com` |

If `SECURITY_TXT_EXPIRES` is empty, the app generates an expiry one year from
the request time. If `SECURITY_TXT_CONTACT` is empty, the site root URL is used.

### Docker

| Variable | Description | Default |
| --- | --- | --- |
| `HOMEPAGE_VERSION` | Docker Hub image tag to deploy | `latest` |
| `HOMEPAGE_CONTAINER_NAME` | Container name | `homepage` |
| `HOMEPAGE_WEB_PORT` | Internal Next.js server port | `3000` |
| `TZ` | Container timezone | `America/Toronto` |

### Development

| Variable | Description |
| --- | --- |
| `DEV_ALLOWED_ORIGINS` | Comma-separated IPs or hosts allowed for dev HMR cross-origin requests |

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the production app |
| `npm run start` | Start the generated standalone production server |
| `npm run lint` | Run ESLint |

Before running `npm run start`, run `npm run build`.

## Project Layout

```text
homepage/
|-- .github/
|   |-- actions/setup/          # Shared Node.js setup action
|   |-- ISSUE_TEMPLATE/         # GitHub issue forms
|   |-- rulesets/               # Optional branch protection ruleset
|   `-- workflows/              # CI, validation, and release workflows
|-- public/                     # Favicons and public static assets
|-- scripts/
|   `-- start-standalone.mjs    # Local helper for Next.js standalone startup
|-- src/app/
|   |-- .well-known/security.txt/route.js
|   |-- api/health/route.js
|   |-- components/HomePage.js
|   |-- fonts/GeistMono-Bold.ttf
|   |-- lib/config.js
|   |-- styles/globals.css
|   |-- layout.js
|   |-- manifest.js
|   |-- opengraph-image.js
|   |-- page.js
|   |-- robots.js
|   `-- sitemap.js
|-- Dockerfile
|-- docker-compose.yml
|-- package.json
`-- README.md
```

## Architecture

The app is intentionally compact:

- `src/app/lib/config.js` loads runtime configuration from environment variables.
- `src/app/page.js` passes site configuration into the client homepage component.
- `src/app/components/HomePage.js` owns the animated UI and live clock.
- `src/app/layout.js` generates metadata, icons, canonical URL, and JSON-LD.
- `src/app/robots.js`, `sitemap.js`, `manifest.js`, and `opengraph-image.js`
  expose SEO and platform routes.
- `src/app/.well-known/security.txt/route.js` serves the security policy route.
- `src/app/api/health/route.js` serves a lightweight liveness endpoint.

The app uses `export const dynamic = "force-dynamic"` where runtime environment
values must be read at request time.

## Quality Checks

Run the same core checks used by CI:

```bash
npm audit --audit-level=high
npm run lint
npm run build
```

## CI/CD

The repository contains three workflows:

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| `ci.yml` | Pull requests and manual runs | Commit message validation plus the reusable validation suite |
| `validate.yml` | Reusable and manual runs | Lint, build, audit, YAML lint, Docker checks, secret scan, image scan |
| `release.yml` | Pushes to `main` | Validate, create SemVer tag and GitHub Release, publish multi-arch Docker image |

Releases are based on Conventional Commits:

- `fix:` -> patch release.
- `feat:` -> minor release.
- A `BREAKING CHANGE:` footer -> major release.
- Other commit types do not release by default.

Required GitHub secrets for Docker publishing:

| Secret | Description |
| --- | --- |
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token with read/write access |

## Docker Deployment

The published image is `shuntps/homepage`.

Pull and start:

```bash
docker compose pull
docker compose up -d
```

Update:

```bash
docker compose pull
docker compose up -d
```

Pin a version by setting `HOMEPAGE_VERSION` in `.env`:

```bash
HOMEPAGE_VERSION=1.0.0
```

Build locally:

```bash
docker build -t shuntps/homepage:local .
```

The provided Compose file expects an external Docker network named
`homelab_homepage` and a Traefik reverse proxy using the labels in
`docker-compose.yml`.

The provided Compose healthcheck calls `/api/health` on the container `PORT`
and validates the `{"status":"ok"}` response. The endpoint can also be used by
reverse proxy or uptime monitoring liveness checks.

## Portainer Deployment

1. Ensure the external `homelab_homepage` network exists.
2. In Portainer, create a stack from the Git repository.
3. Use `docker-compose.yml` as the Compose path.
4. Add the environment variables from `.env.example`.
5. Deploy the stack.

If your core stack creates the shared network, start or restart it first:

```bash
docker compose -f core-compose.yml up -d
```

## Security

- Do not commit `.env` files, tokens, passwords, private keys, or certificates.
- Keep Docker Hub credentials in GitHub repository secrets.
- Use GitHub private vulnerability reporting for sensitive reports when enabled.
- See [SECURITY.md](SECURITY.md) for the vulnerability reporting process.

## Contributing

Contributions are welcome. Please read:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SUPPORT.md](SUPPORT.md)

## License

This project is licensed under the [MIT License](LICENSE).
