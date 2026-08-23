"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const test_1 = require("@playwright/test");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const LOG_DIR = path.join(__dirname, "../../logs/browser-automation");
const JSON_LOG_FILE = path.join(LOG_DIR, "execution_log.json");
const REPORT_FILE = path.join(LOG_DIR, "execution_report.md");
const logs = [];
function addLog(phase, type, message, details) {
    const entry = {
        timestamp: new Date().toISOString(),
        phase,
        type,
        message,
        details,
    };
    logs.push(entry);
    console.log(`[${entry.phase}] [${entry.type}] ${message}`);
}
(0, test_1.test)("CRM Automated Browser Journey with Logger", async ({ page }) => {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }
    addLog("INIT", "INFO", "Starting Automated Playwright Browser Test...");
    page.on("console", (msg) => {
        addLog("BROWSER_CONSOLE", "CONSOLE", `[${msg.type()}] ${msg.text()}`);
    });
    page.on("pageerror", (err) => {
        addLog("FRONTEND_EXCEPTION", "ERROR", err.message);
    });
    page.on("request", (req) => {
        if (req.url().includes("/api/")) {
            addLog("NETWORK", "NETWORK_REQUEST", `${req.method()} ${req.url()}`);
        }
    });
    page.on("response", async (res) => {
        if (res.url().includes("/api/")) {
            let body = null;
            try {
                body = await res.json();
            }
            catch (e) {
                body = null;
            }
            addLog("NETWORK", "NETWORK_RESPONSE", `${res.status()} ${res.url()}`, {
                status: res.status(),
                ok: res.ok(),
                body,
            });
        }
    });
    const timestamp = Date.now();
    const dummyEmail = `admin_auto_${timestamp}@testcrm.com`;
    const dummyPassword = "Password123!";
    try {
        // PHASE 1: REGISTRATION
        addLog("PHASE_1_REGISTER", "ACTION", "Navigating to http://localhost:5173/register");
        await page.goto("http://localhost:5173/register");
        addLog("PHASE_1_REGISTER", "ACTION", "Filling registration dummy data...");
        await page.fill('input[name="name"]', `AutoTest Global ${timestamp}`);
        await page.fill('input[name="code"]', `ATG${timestamp.toString().slice(-4)}`);
        await page.fill('input[name="email"]', `org_${timestamp}@testcrm.com`);
        await page.fill('input[name="phone"]', "+91 9876543210");
        await page.fill('input[name="website"]', "https://autotest-global.com");
        await page.fill('input[name="ownerName"]', "Demo Admin User");
        await page.fill('input[name="ownerEmail"]', dummyEmail);
        await page.fill('input[name="password"]', dummyPassword);
        await page.fill('input[name="confirmPassword"]', dummyPassword);
        const checkbox = page.locator('input[type="checkbox"]');
        if (await checkbox.count()) {
            await checkbox.check();
        }
        addLog("PHASE_1_REGISTER", "ACTION", "Submitting Organization registration form...");
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2000);
        // PHASE 2: LOGIN
        addLog("PHASE_2_LOGIN", "ACTION", "Navigating to http://localhost:5173/login");
        await page.goto("http://localhost:5173/login");
        addLog("PHASE_2_LOGIN", "ACTION", "Filling login credentials...");
        await page.fill('input[type="email"]', dummyEmail);
        await page.fill('input[type="password"]', dummyPassword);
        addLog("PHASE_2_LOGIN", "ACTION", "Clicking Sign In button...");
        await page.click('button[type="submit"]');
        await page.waitForTimeout(2500);
        // PHASE 3: DASHBOARD
        addLog("PHASE_3_DASHBOARD", "ACTION", `Current URL: ${page.url()}`);
        await page.goto("http://localhost:5173/dashboard/organization");
        await page.waitForTimeout(1000);
        await page.goto("http://localhost:5173/dashboard/companies");
        await page.waitForTimeout(1000);
        await page.goto("http://localhost:5173/dashboard/contacts");
        await page.waitForTimeout(1000);
        addLog("PHASE_COMPLETE", "INFO", "Full automated test flow completed successfully!");
    }
    catch (err) {
        addLog("EXECUTION_FAILURE", "ERROR", `Browser automation error: ${err.message}`);
    }
    finally {
        fs.writeFileSync(JSON_LOG_FILE, JSON.stringify(logs, null, 2), "utf-8");
        let markdownContent = `# 📊 Browser Automation Execution Log Report\n\n`;
        markdownContent += `**Generated At**: ${new Date().toLocaleString()}\n`;
        markdownContent += `**Log Directory**: \`${LOG_DIR}\`\n\n`;
        markdownContent += `| Timestamp | Phase | Type | Message | Status/Details |\n`;
        markdownContent += `| :--- | :--- | :--- | :--- | :--- |\n`;
        for (const l of logs) {
            const detailStr = l.details ? `\`${JSON.stringify(l.details).slice(0, 100)}\`` : "-";
            markdownContent += `| ${l.timestamp.split("T")[1].slice(0, 8)} | **${l.phase}** | \`${l.type}\` | ${l.message} | ${detailStr} |\n`;
        }
        fs.writeFileSync(REPORT_FILE, markdownContent, "utf-8");
    }
});
//# sourceMappingURL=auth-flow-logger.spec.js.map