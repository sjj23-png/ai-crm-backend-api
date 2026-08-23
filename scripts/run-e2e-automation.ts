const API_BASE = "http://localhost:4001/api";

interface TestResult {
  step: string;
  success: boolean;
  details?: string;
  data?: any;
}

const results: TestResult[] = [];

function logPass(step: string, details?: string, data?: any) {
  results.push({ step, success: true, details, data });
  console.log(`✅ PASSED: ${step} ${details ? `- ${details}` : ""}`);
}

function logFail(step: string, error: any) {
  const message = error.message || error;
  results.push({ step, success: false, details: message });
  console.error(`❌ FAILED: ${step} - ${message}`);
}

async function request(path: string, options: { method?: string; token?: string; body?: any } = {}) {
  const url = `${API_BASE}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }
  const body = options.body ? JSON.stringify(options.body) : undefined;
  const res = await fetch(url, { method: options.method || "GET", headers, body });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || `HTTP ${res.status}`);
  }
  return data;
}

async function runFullE2EAutomation() {
  console.log("\n=======================================================");
  console.log("🚀 STARTING E2E AUTOMATION TEST SUITE (11 MODULES)");
  console.log("=======================================================\n");

  const timestamp = Date.now();
  const testEmail = `automation_owner_${timestamp}@testcrm.com`;
  const testPassword = "Password123!";
  let authToken = "";
  let tenantId = "";
  let companyId = "";
  let contactId = "";
  let pipelineId = "";
  let stageId = "";
  let leadId = "";
  let dealId = "";

  // 1. REGISTER OWNER & TENANT
  try {
    const res = await request("/auth/register", {
      method: "POST",
      body: {
        tenantName: `AutoCorp_${timestamp}`,
        name: "Automation Admin",
        email: testEmail,
        ownerName: "Automation Admin",
        ownerEmail: testEmail,
        password: testPassword,
        confirmPassword: testPassword,
      },
    });
    authToken = res.accessToken || res.token;
    tenantId = res.tenant?.id || res.user?.tenantId;
    logPass("TC-01: Tenant & Owner Registration", `Tenant ID: ${tenantId}`);
  } catch (err: any) {
    logFail("TC-01: Tenant & Owner Registration", err);
    return;
  }

  // 2. LOGIN
  try {
    const res = await request("/auth/login", {
      method: "POST",
      body: {
        email: testEmail,
        password: testPassword,
      },
    });
    authToken = res.accessToken || res.token;
    logPass("TC-02: Authentication & Token Retrieval");
  } catch (err: any) {
    logFail("TC-02: Authentication & Token Retrieval", err);
  }

  // 3. ORGANIZATION PROFILE
  try {
    const res = await request("/organizations", { token: authToken });
    logPass("TC-03: Organization Profile Retrieval", `Org Name: ${res?.name || "Verified"}`);
  } catch (err: any) {
    logFail("TC-03: Organization Profile Retrieval", err);
  }

  // 4. CREATE COMPANY
  try {
    const res = await request("/companies", {
      method: "POST",
      token: authToken,
      body: {
        name: `Acme Global ${timestamp}`,
        industry: "Technology",
        phone: "+91 9876543210",
        website: "https://acme-global.com",
      },
    });
    companyId = res.id;
    logPass("TC-04: Client Company Creation", `Company ID: ${companyId}`);
  } catch (err: any) {
    logFail("TC-04: Client Company Creation", err);
  }

  // 5. CREATE CONTACT
  try {
    const res = await request("/contacts", {
      method: "POST",
      token: authToken,
      body: {
        companyId,
        firstName: "John",
        lastName: "Doe",
        email: `john_doe_${timestamp}@acme-global.com`,
        phone: "+91 9123456789",
        designation: "CTO",
      },
    });
    contactId = res.id;
    logPass("TC-05: Client Contact Creation", `Contact ID: ${contactId}`);
  } catch (err: any) {
    logFail("TC-05: Client Contact Creation", err);
  }

  // 6. PIPELINES & STAGES
  try {
    const pipeRes = await request("/pipelines", {
      method: "POST",
      token: authToken,
      body: {
        name: `Enterprise Sales ${timestamp}`,
        isDefault: true,
      },
    });
    pipelineId = pipeRes.id;

    const stageRes = await request("/stages", {
      method: "POST",
      token: authToken,
      body: {
        pipelineId,
        name: "Qualification",
        order: 1,
      },
    });
    stageId = stageRes.id;
    logPass("TC-06: Pipeline & Stage Creation", `Pipeline: ${pipelineId}, Stage: ${stageId}`);
  } catch (err: any) {
    logFail("TC-06: Pipeline & Stage Creation", err);
  }

  // 7. CREATE LEAD
  try {
    const res = await request("/leads", {
      method: "POST",
      token: authToken,
      body: {
        firstName: "Rahul",
        lastName: "Kapoor",
        email: `rahul_${timestamp}@lead-sample.com`,
        companyId,
        contactId,
        source: "WEBSITE",
      },
    });
    leadId = res.id;
    logPass("TC-07: Lead Capture", `Lead ID: ${leadId}`);
  } catch (err: any) {
    logFail("TC-07: Lead Capture", err);
  }

  // 8. CREATE DEAL
  try {
    const res = await request("/deals", {
      method: "POST",
      token: authToken,
      body: {
        title: `Acme Enterprise CRM Deal ${timestamp}`,
        value: 500000,
        currency: "INR",
        companyId,
        contactId,
        pipelineId,
        stageId,
        status: "OPEN",
      },
    });
    dealId = res.id;
    logPass("TC-08: Deal Conversion", `Deal ID: ${dealId}`);
  } catch (err: any) {
    logFail("TC-08: Deal Conversion", err);
  }

  // 9. CREATE TASK
  try {
    const res = await request("/tasks", {
      method: "POST",
      token: authToken,
      body: {
        title: "Contract Review & Sign-off",
        dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
        priority: "HIGH",
        status: "PENDING",
        dealId,
      },
    });
    logPass("TC-09: Task Creation", `Task ID: ${res.id}`);
  } catch (err: any) {
    logFail("TC-09: Task Creation", err);
  }

  // 10. CREATE NOTE
  try {
    const res = await request("/notes", {
      method: "POST",
      token: authToken,
      body: {
        content: "Client agreed to initial deployment terms and security SLA.",
        dealId,
      },
    });
    logPass("TC-10: Note Attachment", `Note ID: ${res.id}`);
  } catch (err: any) {
    logFail("TC-10: Note Attachment", err);
  }

  // 11. NOTIFICATIONS CHECK
  try {
    const res = await request("/notifications", { token: authToken });
    logPass("TC-11: System Notification Check", `Notifications Count: ${Array.isArray(res) ? res.length : 0}`);
  } catch (err: any) {
    logFail("TC-11: System Notification Check", err);
  }

  console.log("\n=======================================================");
  console.log("📊 E2E AUTOMATION TEST SUMMARY");
  console.log("=======================================================");
  const total = results.length;
  const passed = results.filter((r) => r.success).length;
  const failed = total - passed;
  console.log(`Total Test Cases: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runFullE2EAutomation();
