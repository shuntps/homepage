// Lightweight liveness endpoint for Docker and Traefik health checks.

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}