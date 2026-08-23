/**
 * Playwright MCP Connection Launcher
 * Launches the official @playwright/mcp server for AI chat automation.
 */
const { spawn } = require("child_process");

console.log("🚀 Starting Playwright MCP Server for AI CRM Automation...");
console.log("Connecting to Web App (http://localhost:5173) and API Server (http://localhost:4001)...");

const mcp = spawn("npx", ["-y", "@playwright/mcp@latest", "--browser=chromium", "--viewport-size=1440,900"], {
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    BASE_URL: "http://localhost:5173",
    API_URL: "http://localhost:4001",
  },
});

mcp.on("error", (err) => {
  console.error("MCP Server Error:", err);
});

mcp.on("close", (code) => {
  console.log(`MCP Server exited with code ${code}`);
});
