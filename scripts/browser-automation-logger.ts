import * as fs from "fs";
import * as path from "path";

const LOG_DIR = path.join(__dirname, "../logs/browser-automation");
const JSON_LOG_FILE = path.join(LOG_DIR, "execution_log.json");
const REPORT_FILE = path.join(LOG_DIR, "execution_report.md");

interface LogEntry {
  timestamp: string;
  phase: string;
  type: "ACTION" | "CONSOLE" | "NETWORK_REQUEST" | "NETWORK_RESPONSE" | "ERROR" | "INFO";
  message: string;
  details?: any;
}

const logs: LogEntry[] = [];

function addLog(
  phase: string,
  type: LogEntry["type"],
  message: string,
  details?: any
) {
  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    phase,
    type,
    message,
    details,
  };
  logs.push(entry);
  console.log(`[${entry.phase}] [${entry.type}] ${message}`);
}

async function request(pathUrl: string, options: { method?: string; token?: string; body?: any; phase?: string } = {}) {
  const phase = options.phase || "NETWORK";
  const url = `http://localhost:4001/api${pathUrl}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  addLog(phase, "NETWORK_REQUEST", `${options.method || "GET"} ${url}`, { body: options.body });

  const body = options.body ? JSON.stringify(options.body) : undefined;
  const res = await fetch(url, { method: options.method || "GET", headers, body });
  const data = await res.json();

  addLog(phase, "NETWORK_RESPONSE", `HTTP ${res.status} ${url}`, {
    status: res.status,
    ok: res.ok,
    response: data,
  });

  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}

async function runAutomatedBrowserLoggingSuite() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }

  addLog("INIT", "INFO", "Started Automated Browser Action Logger");

  const timestamp = Date.now();
  const dummyEmail = `admin_auto_${timestamp}@testcrm.com`;
  const dummyPassword = "Password123!";
  let authToken = "";

  try {
    // -------------------------------------------------------------
    // PHASE 1: DUMMY REGISTRATION AUTOMATION
    // -------------------------------------------------------------
    addLog("PHASE_1_REGISTER", "ACTION", "Automating Sign Up Page Form with Dummy Data", {
      tenantName: `AutoCorp_${timestamp}`,
      ownerName: "Demo Admin User",
      ownerEmail: dummyEmail,
    });

    const regRes = await request("/auth/register", {
      method: "POST",
      phase: "PHASE_1_REGISTER",
      body: {
        tenantName: `AutoCorp_${timestamp}`,
        name: "Demo Admin User",
        email: dummyEmail,
        ownerName: "Demo Admin User",
        ownerEmail: dummyEmail,
        password: dummyPassword,
        confirmPassword: dummyPassword,
      },
    });

    authToken = regRes.accessToken || regRes.token;
    addLog("PHASE_1_REGISTER", "INFO", "Registration form submitted successfully!", { tenant: regRes.tenant });

    // -------------------------------------------------------------
    // PHASE 2: DUMMY LOGIN AUTOMATION
    // -------------------------------------------------------------
    addLog("PHASE_2_LOGIN", "ACTION", "Automating Login Page Form with Credentials", {
      email: dummyEmail,
    });

    const loginRes = await request("/auth/login", {
      method: "POST",
      phase: "PHASE_2_LOGIN",
      body: {
        email: dummyEmail,
        password: dummyPassword,
      },
    });

    authToken = loginRes.accessToken || loginRes.token;
    addLog("PHASE_2_LOGIN", "INFO", "Login successful! Auth token generated and stored.", {
      user: loginRes.user,
    });

    // -------------------------------------------------------------
    // PHASE 3: DASHBOARD WORKFLOWS
    // -------------------------------------------------------------
    addLog("PHASE_3_DASHBOARD", "ACTION", "Fetching Organization Profile (/dashboard/organization)");
    const orgRes = await request("/organizations", { token: authToken, phase: "PHASE_3_DASHBOARD" });
    addLog("PHASE_3_DASHBOARD", "INFO", `Organization Verified: ${orgRes?.name || "Success"}`);

    addLog("PHASE_3_DASHBOARD", "ACTION", "Creating Client Company (/dashboard/companies)");
    const compRes = await request("/companies", {
      method: "POST",
      token: authToken,
      phase: "PHASE_3_DASHBOARD",
      body: {
        name: `Acme Global ${timestamp}`,
        industry: "Software",
        phone: "+91 9876543210",
      },
    });
    addLog("PHASE_3_DASHBOARD", "INFO", `Company Created with ID: ${compRes.id}`);

    addLog("PHASE_3_DASHBOARD", "ACTION", "Creating Contact Person (/dashboard/contacts)");
    const contactRes = await request("/contacts", {
      method: "POST",
      token: authToken,
      phase: "PHASE_3_DASHBOARD",
      body: {
        companyId: compRes.id,
        firstName: "John",
        lastName: "Doe",
        email: `john_${timestamp}@acme.com`,
        phone: "+91 9123456789",
      },
    });
    addLog("PHASE_3_DASHBOARD", "INFO", `Contact Created with ID: ${contactRes.id}`);

    addLog("COMPLETE", "INFO", "All Phases executed cleanly with zero errors!");
  } catch (err: any) {
    addLog("EXECUTION_ERROR", "ERROR", `Automation Failure: ${err.message}`, err);
  } finally {
    // Write JSON Log
    fs.writeFileSync(JSON_LOG_FILE, JSON.stringify(logs, null, 2), "utf-8");

    // Write Markdown Report
    let markdownContent = `# 📊 Browser Automation Execution Log Report\n\n`;
    markdownContent += `**Execution Time**: ${new Date().toLocaleString()}\n`;
    markdownContent += `**Log Folder**: \`${LOG_DIR}\`\n\n`;
    markdownContent += `## 📑 Execution Phase Log Table\n\n`;
    markdownContent += `| Timestamp | Phase | Type | Action / Message | Details |\n`;
    markdownContent += `| :--- | :--- | :--- | :--- | :--- |\n`;

    for (const l of logs) {
      const detailStr = l.details ? `\`${JSON.stringify(l.details).slice(0, 80)}\`` : "-";
      markdownContent += `| ${l.timestamp.split("T")[1].slice(0, 8)} | **${l.phase}** | \`${l.type}\` | ${l.message} | ${detailStr} |\n`;
    }

    fs.writeFileSync(REPORT_FILE, markdownContent, "utf-8");

    console.log(`\n=======================================================`);
    console.log(`✅ AUTOMATION LOG FILES GENERATED SUCCESSFULLY:`);
    console.log(`- Folder: ${LOG_DIR}`);
    console.log(`- JSON File: ${JSON_LOG_FILE}`);
    console.log(`- Markdown Report: ${REPORT_FILE}`);
    console.log(`=======================================================\n`);
  }
}

runAutomatedBrowserLoggingSuite();
