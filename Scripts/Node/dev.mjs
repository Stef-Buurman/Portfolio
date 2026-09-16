import { spawn } from "node:child_process";
import { resolve } from "node:path";
import { clientFolderName, serverFolderName } from "./Helpers/Globals.mjs";

const rootDirectory = process.cwd();
const clientDirectory = resolve(rootDirectory, clientFolderName);
const serverDirectory = resolve(rootDirectory, serverFolderName);
const children = new Set();
let shuttingDown = false;

function start(command, args, cwd, useShell = false) {
  const child = spawn(command, args, {
    cwd,
    stdio: "inherit",
    shell: useShell,
    env: process.env,
  });

  children.add(child);

  child.on("error", (error) => {
    console.error(`Failed to start ${command}:`, error);
  });

  child.on("exit", (code) => {
    children.delete(child);
    if (!shuttingDown && code !== null && code !== 0) {
      console.error(`${command} exited with code ${code}.`);
    }
  });

  return child;
}

function shutdown() {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log("\nStopping development servers...");

  for (const child of children) {
    if (!child.killed) child.kill();
  }

  setTimeout(() => process.exit(0), 300);
}

process.once("SIGINT", shutdown);
process.once("SIGTERM", shutdown);

console.log("Starting ASP.NET Core API...");
start(
  "dotnet",
  ["watch", "run", "--launch-profile", "https"],
  serverDirectory,
);

setTimeout(() => {
  console.log("Starting Angular client...");
  start(
    "npm",
    ["start"],
    clientDirectory,
    process.platform === "win32",
  );
}, 1000);
