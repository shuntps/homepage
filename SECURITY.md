# Security Policy

## Supported Versions

| Version | Supported |
| --- | --- |
| `main` | Yes, until the first public release |
| `1.x` | Yes, after the first public release |
| `< 1.0.0` | No |

## Reporting a Vulnerability

Please do not report security vulnerabilities through public issues.

Preferred reporting path:

1. Use GitHub private vulnerability reporting if it is enabled for this
   repository.
2. If private reporting is not enabled, contact the maintainer privately before
   sharing technical details publicly.

Include:

- A clear description of the vulnerability.
- Steps to reproduce.
- Affected versions, commits, or deployment modes.
- Impact and realistic attack scenario.
- Any suggested mitigation, if known.

## Handling Expectations

Maintainers will acknowledge valid private reports as soon as practical, assess
impact, prepare a fix, and coordinate disclosure when appropriate.

## Secret Handling

Never commit secrets, tokens, passwords, certificates, private keys, or local
`.env` files. Use GitHub repository secrets for CI/CD credentials and keep
`.env.example` limited to safe placeholder values.
