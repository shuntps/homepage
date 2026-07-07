# Contributing

Thank you for taking the time to improve Homepage. This project is intentionally
small, so contributions should keep the codebase simple, secure, and easy to
operate.

## Development Setup

Requirements:

- Node.js 22 or newer
- npm 10 or newer
- Docker, if you want to test the container build

Install dependencies:

```bash
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

## Validation

Run these checks before opening a pull request:

```bash
npm run lint
npm run build
npm audit --audit-level=high
```

## Commit Messages

Use Conventional Commits:

- `fix: correct sitemap URL generation`
- `feat: add configurable status label`
- `docs: improve deployment notes`
- `chore: update dependencies`

Release versions are derived from commits on `main`:

- `fix:` creates a patch release.
- `feat:` creates a minor release.
- A `BREAKING CHANGE:` footer creates a major release.

## Pull Requests

Before submitting a pull request:

- Keep the change focused.
- Update documentation when behavior or setup changes.
- Add or update tests for user-visible behavior.
- Avoid committing secrets, local `.env` files, build output, or test reports.
- Confirm CI passes.

## Project Conventions

- Keep runtime configuration in environment variables.
- Keep the app architecture centered on `src/app`.
- Prefer small, explicit modules over broad abstractions.
- Keep public documentation in English.
- Do not add workflows unless the maintenance value is clear and discussed.
