import os from "os";

export const isWindows = os.platform() === "win32";
export const clientFolderName =
  process.env.npm_package_config_clientOutput || "portfolio.client";
export const serverFolderName =
  process.env.npm_package_config_serverOutput || "Portfolio.Server";
