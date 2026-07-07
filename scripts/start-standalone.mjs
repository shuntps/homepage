// Local helper to run the Next.js standalone build, mirroring the Docker runtime.
// Usage: npm run build && npm run start
import { spawn } from "node:child_process";
import { cpSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import process from "node:process";

const root = process.cwd();
const standaloneDir = join(root, ".next", "standalone");
const serverFile = join(standaloneDir, "server.js");

if (!existsSync(serverFile)) {
  console.error("Standalone build not found. Run `npm run build` first.");
  process.exit(1);
}

// The standalone output does not include static assets or public files.
cpSync(join(root, ".next", "static"), join(standaloneDir, ".next", "static"), {
  recursive: true,
});
if (existsSync(join(root, "public"))) {
  cpSync(join(root, "public"), join(standaloneDir, "public"), {
    recursive: true,
  });
}

// Load .env for parity with `next dev`. Existing process env always wins.
const env = { ...process.env };
const envFile = join(root, ".env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && env[match[1]] === undefined) {
      env[match[1]] = match[2].replace(/^["']|["']$/g, "");
    }
  }
}

const child = spawn(process.execPath, [serverFile], {
  cwd: standaloneDir,
  stdio: "inherit",
  env,
});

child.on("exit", (code) => process.exit(code ?? 0));
