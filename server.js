const http = require('http');
const PORT = process.env.PORT || 3000;

const users = [{ id: 1, email: 'admin@regentic.com', password: 'admin123', name: 'Admin User' }];
const sessions = {};

function generateToken() {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
}

const loginPage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regentic Systems - Login</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #0a0a0a; display: flex; justify-content: center; align-items: center; min-height: 100vh; }
  .login-box { background: #111; border: 1px solid #222; border-radius: 16px; padding: 40px; width: 100%; max-width: 400px; }
  .logo { text-align: center; margin-bottom: 30px; }
  .logo h1 { color: #00d4ff; font-size: 24px; }
  .logo p { color: #555; font-size: 13px; margin-top: 6px; }
  .form-group { margin-bottom: 20px; }
  label { display: block; font-size: 13px; color: #888; margin-bottom: 8px; }
  input { width: 100%; padding: 12px 16px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; color: white; font-size: 14px; outline: none; }
  input:focus { border-color: #00d4ff; }
  button { width: 100%; padding: 13px; background: #00d4ff; color: #000; font-size: 15px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; margin-top: 10px; }
  button:hover { background: #00b8d9; }
  .error { color: #ef4444; font-size: 13px; text-align: center; margin-top: 12px; display: none; }
  .hint { color: #444; font-size: 12px; text-align: center; margin-top: 16px; }
</style>
</head>
<body>
<div class="login-box">
  <div class="logo">
    <h1>Regentic Systems</h1>
    <p>AI-Enhanced Enterprise Resource Planning</p>
  </div>
  <div class="form-group">
    <label>Email Address</label>
    <input type="email" id="email" placeholder="admin@regentic.com" />
  </div>
  <div class="form-group">
    <label>Password</label>
    <input type="password" id="password" placeholder="••••••••" />
  </div>
  <button onclick="doLogin()">Sign In</button>
  <div class="error" id="error">Invalid email or password</div>
  <div class="hint">Default: admin@regentic.com / admin123</div>
</div>
<script>
  function doLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(r => r.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/dashboard';
      } else {
        document.getElementById('error').style.display = 'block';
      }
    });
  }
  document.addEventListener('keypress', e => { if (e.key === 'Enter') doLogin(); });
</script>
</body>
</html>`;

const dashboardPage = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regentic Systems ERP</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: #0a0a0a; color: white; padding: 20px 0; position: fixed; height: 100vh; overflow-y: auto; }
  .sidebar-logo { padding: 0 20px 20px; border-bottom: 1px solid #222; }
  .sidebar-logo h1 { font-size: 16px; color: #00d4ff; }
  .sidebar-logo p { font-size: 11px; color: #555; margin-top: 4px; }
  .sidebar-nav { padding: 20px 0; }
  .nav-item { padding: 12px 20px; cursor: pointer; font-size: 14px; color: #888; display: flex; align-items: center; gap: 10px; transition: all 0.2s; }
  .nav-item:hover, .nav-item.active { background: #00d4ff15; color: #00d4ff; border-left: 3px solid #00d4ff; }
  .sidebar-footer { padding: 20px; border-top: 1px solid #222; margin-top: auto; }
  .logout-btn { width: 100%; padding: 10px; background: #1a1a1a; color: #888; border: 1px solid #333; border-radius: 8px; cursor: pointer; font-size: 13px; }
  .logout-btn:hover { background: #ef444420; color: #ef4444; border-color: #ef4444; }
  .main { margin-left: 240px; flex: 1; }
  .header { background: white; padding: 16px 30px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
  .header h2 { font-size: 20px; color: #1a1a1a; }
  .header-right { display: flex; align-items: center; gap: 12px; }
  .badge { background: #00d4ff15; color: #00d4ff; padding: 4px 12px; border-radius: 20px; font-size: 12px; border: 1px solid #00d4ff30; }
  .user-info { font-size: 13px; color: #888; }
  .content { padding: 30px; }
  .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
  .kpi-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .kpi-label { font-size: 13px; color: #888; margin-bottom: 8px; }
  .kpi-value { font-size: 28px; font-weight: 700; color: #1a1a1a; }
  .kpi-change { font-size: 12px; color: #22c55e; margin-top: 4px; }
  .grid-2 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
  .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
  .card-title { font-size: 15px; font-weight: 600; color: #1a1a1a; margin-bottom: 16px; }
  .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; }
  .bar { flex: 1; background: linear-gradient(to top, #00d4ff, #0066ff); border-radius: 4px 4px 0 0; }
  .table { width: 100%; border-collapse: collapse; }
  .table th { text-align: left; font-size: 12px; color: #888; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
  .table td { padding: 10px 0; font-size: 13px; border-bottom: 1px solid #f9f9f9; }
  .status { padding: 3px 10px; border-radius: 20px; font-size: 11px; }
  .status.paid { background: #22c55e15; color: #22c55e; }
  .status.pending { background: #f59e0b15; color: #f59e0b; }
  .status.draft { background: #6b728015; color: #6b7280; }
  .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .module-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-align: center; cursor: pointer; transition: all 0.2s; border: 2px solid transparent; }
  .module-card:hover { transform: translateY(-2px); border-color: #00d4ff; }
  .module-icon { font-size: 32px; margin-bottom: 10px; }
  .module-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
  .module-desc { font-size: 12px; color: #888; margin-top: 4px; }
  .page { display: none; }
  .page.active { display: block; }
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-logo">
    <h1>Regentic Systems</h1>
    <p>AI-Enhanced ERP</p>
  </div>
  <div class="sidebar-nav">
    <div class="nav-item active" onclick="showPage('dashboard', this)">&#x1F3E0; Dashboard</div>
    <div class="nav-item" onclick="showPage('inventory', this)">&#x1F4E6; Inventory</div>
    <div class="nav-item" onclick="showPage('billing', this)">&#x1F4B3; Billing</div>
    <div class="nav-item" onclick="showPage('invoices', this)">&#x1F4CB; Invoices</div>
    <div class="nav-item" onclick="showPage('accounting', this)">&#x1F4CA; Accounting</div>
    <div class="nav-item" onclick="showPage('workflows', this)">&#x2699;&#xFE0F; Workflows</div>
    <div class="nav-item" onclick="showPage('ai', this)">&#x1F916; AI Copilot</div>
    <div class="nav-item" onclick="showPage('reports', this)">&#x1F4C8; Reports</div>
    <div class="nav-item" onclick="showPage('notifications', this)">&#x1F514; Notifications</div>
    <div class="nav-item" onclick="showPage('audit', this)">&#x1F6E1;&#xFE0F; Audit Logs</div>
    <div class="nav-item" onclick="showPage('admin', this)">&#x1F527; Admin</div>
  </div>
  <div class="sidebar-footer">
    <button class="logout-btn" onclick="logout()">&#x1F6AA; Sign Out</button>
  </div>
</div>
<div class="main">
  <div class="header">
    <h2 id="page-title">Dashboard</h2>
    <div class="header-right">
      <span class="badge">&#x1F7E2; System Online</span>
      <span class="user-info" id="user-name">Welcome, Admin</span>
    </div>
  </div>
  <div class="content">

    <div id="page-dashboard" class="page active">
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">Total Revenue</div><div class="kpi-value">R0</div><div class="kpi-change">&#x2191; Getting started</div></div>
        <div class="kpi-card"><div class="kpi-label">Active Users</div><div class="kpi-value">1</div><div class="kpi-change">&#x2191; You!</div></div>
        <div class="kpi-card"><div class="kpi-label">Total Products</div><div class="kpi-value">0</div><div class="kpi-change">Add inventory to start</div></div>
        <div class="kpi-card"><div class="kpi-label">Open Invoices</div><div class="kpi-value">0</div><div class="kpi-change">Create your first invoice</div></div>
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-title">Revenue Overview</div>
          <div class="chart-bars">
            <div class="bar" style="height:20%"></div><div class="bar" style="height:35%"></div><div class="bar" style="height:25%"></div><div class="bar" style="height:50%"></div><div class="bar" style="height:40%"></div><div class="bar" style="height:60%"></div><div class="bar" style="height:45%"></div><div class="bar" style="height:70%"></div><div class="bar" style="height:55%"></div><div class="bar" style="height:80%"></div><div class="bar" style="height:65%"></div><div class="bar" style="height:90%"></div>
          </div>
          <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#888;"><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
        </div>
        <div class="card">
          <div class="card-title">Recent Invoices</div>
          <table class="table">
            <tr><th>Invoice</th><th>Amount</th><th>Status</th></tr>
            <tr><td>INV-001</td><td>R0.00</td><td><span class="status draft">Draft</span></td></tr>
            <tr><td>INV-002</td><td>R0.00</td><td><span class="status pending">Pending</span></td></tr>
            <tr><td>INV-003</td><td>R0.00</td><td><span class="status paid">Paid</span></td></tr>
          </table>
        </div>
      </div>
      <div class="card">
        <div class="card-title">ERP Modules</div>
        <div class="modules-grid">
          <div class="module-card" onclick="showPage('inventory', document.querySelector('.nav-item:nth-child(2)'))"><div class="module-icon">&#x1F4E6;</div><div class="module-name">Inventory</div><div class="module-desc">Products, stock & warehouses</div></div>
          <div class="module-card" onclick="showPage('billing', document.querySelector('.nav-item:nth-child(3)'))"><div class="module-icon">&#x1F4B3;</div><div class="module-name">Billing</div><div class="module-desc">Subscriptions & payments</div></div>
          <div class="module-card" onclick="showPage('invoices', document.querySelector('.nav-item:nth-child(4)'))"><div class="module-icon">&#x1F4CB;</div><div class="module-name">Invoices</div><div class="module-desc">Create & manage invoices</div></div>
          <div class="module-card" onclick="showPage('accounting', document.querySelector('.nav-item:nth-child(5)'))"><div class="module-icon">&#x1F4CA;</div><div class="module-name">Accounting</div><div class="module-desc">Journal entries & ledger</div></div>
          <div class="module-card" onclick="showPage('ai', document.querySelector('.nav-item:nth-child(7)'))"><div class="module-icon">&#x1F916;</div><div class="module-name">AI Copilot</div><div class="module-desc">AI-powered business insights</div></div>
          <div class="module-card" onclick="showPage('reports', document.querySelector('.nav-item:nth-child(8)'))"><div class="module-icon">&#x1F4C8;</div><div class="module-name">Reports</div><div class="module-desc">Analytics & dashboards</div></div>
        </div>
      </div>
    </div>

    <div id="page-inventory" class="page">
      <div class="card">
        <div class="card-title">&#x1F4E6; Inventory Management</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Manage your products, stock levels and warehouses.</p>
        <table class="table">
          <tr><th>SKU</th><th>Product Name</th><th>Stock</th><th>Price</th><th>Status</th></tr>
          <tr><td colspan="5" style="text-align:center;color:#888;padding:30px;">No products yet. Add your first product to get started.</td></tr>
        </table>
        <button style="margin-top:16px;padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">+ Add Product</button>
      </div>
    </div>

    <div id="page-billing" class="page">
      <div class="card">
        <div class="card-title">&#x1F4B3; Billing & Subscriptions</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Manage subscriptions, payments and billing cycles.</p>
        <div style="text-align:center;padding:40px;color:#888;">
          <div style="font-size:48px;margin-bottom:16px;">&#x1F4B3;</div>
          <p>Connect Stripe to enable billing features.</p>
          <button style="margin-top:16px;padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Connect Stripe</button>
        </div>
      </div>
    </div>

    <div id="page-invoices" class="page">
      <div class="card">
        <div class="card-title">&#x1F4CB; Invoices</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Create and manage customer invoices.</p>
        <table class="table">
          <tr><th>Invoice #</th><th>Client</th><th>Amount</th><th>Due Date</th><th>Status</th></tr>
          <tr><td colspan="5" style="text-align:center;color:#888;padding:30px;">No invoices yet. Create your first invoice.</td></tr>
        </table>
        <button style="margin-top:16px;padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">+ Create Invoice</button>
      </div>
    </div>

    <div id="page-accounting" class="page">
      <div class="card">
        <div class="card-title">&#x1F4CA; Accounting</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Chart of accounts, journal entries and financial reports.</p>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:20px;">
          <div style="background:#f9f9f9;padding:16px;border-radius:8px;"><div style="font-size:12px;color:#888;">Total Assets</div><div style="font-size:22px;font-weight:700;">R0.00</div></div>
          <div style="background:#f9f9f9;padding:16px;border-radius:8px;"><div style="font-size:12px;color:#888;">Total Liabilities</div><div style="font-size:22px;font-weight:700;">R0.00</div></div>
          <div style="background:#f9f9f9;padding:16px;border-radius:8px;"><div style="font-size:12px;color:#888;">Net Equity</div><div style="font-size:22px;font-weight:700;">R0.00</div></div>
        </div>
        <button style="padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">+ New Journal Entry</button>
      </div>
    </div>

    <div id="page-workflows" class="page">
      <div class="card">
        <div class="card-title">&#x2699;&#xFE0F; Workflow Automation</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Automate business processes with drag-and-drop workflows.</p>
        <div style="text-align:center;padding:40px;color:#888;">
          <div style="font-size:48px;margin-bottom:16px;">&#x2699;&#xFE0F;</div>
          <p>No workflows created yet.</p>
          <button style="margin-top:16px;padding:10px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">+ Create Workflow</button>
        </div>
      </div>
    </div>

    <div id="page-ai" class="page">
      <div class="card">
        <div class="card-title">&#x1F916; AI Copilot</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Ask your AI assistant anything about your business.</p>
        <div style="background:#0a0a0a;border-radius:12px;padding:20px;min-height:300px;margin-bottom:16px;" id="chat-messages">
          <div style="color:#00d4ff;font-size:14px;margin-bottom:8px;">&#x1F916; Regentic AI</div>
          <div style="color:#888;font-size:13px;">Hello! I am your AI business assistant. Ask me about your inventory, finances, or business insights. Connect your OpenAI key to enable full AI features.</div>
        </div>
        <div style="display:flex;gap:10px;">
          <input id="ai-input" type="text" placeholder="Ask me anything about your business..." style="flex:1;padding:12px;background:#1a1a1a;border:1px solid #333;border-radius:8px;color:white;font-size:14px;outline:none;" />
          <button onclick="sendAI()" style="padding:12px 20px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;">Send</button>
        </div>
      </div>
    </div>

    <div id="page-reports" class="page">
      <div class="card">
        <div class="card-title">&#x1F4C8; Reports & Analytics</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Business intelligence and performance reports.</p>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;cursor:pointer;" onclick="alert('Report coming soon!')"><div style="font-size:24px;margin-bottom:8px;">&#x1F4C4;</div><div style="font-weight:600;">Sales Report</div><div style="font-size:12px;color:#888;margin-top:4px;">Monthly sales breakdown</div></div>
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;cursor:pointer;" onclick="alert('Report coming soon!')"><div style="font-size:24px;margin-bottom:8px;">&#x1F4E6;</div><div style="font-weight:600;">Inventory Report</div><div style="font-size:12px;color:#888;margin-top:4px;">Stock levels & valuation</div></div>
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;cursor:pointer;" onclick="alert('Report coming soon!')"><div style="font-size:24px;margin-bottom:8px;">&#x1F4B0;</div><div style="font-weight:600;">P&L Statement</div><div style="font-size:12px;color:#888;margin-top:4px;">Profit & loss overview</div></div>
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;cursor:pointer;" onclick="alert('Report coming soon!')"><div style="font-size:24px;margin-bottom:8px;">&#x1F4CA;</div><div style="font-weight:600;">Balance Sheet</div><div style="font-size:12px;color:#888;margin-top:4px;">Assets, liabilities & equity</div></div>
        </div>
      </div>
    </div>

    <div id="page-notifications" class="page">
      <div class="card">
        <div class="card-title">&#x1F514; Notifications</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">System alerts and notifications.</p>
        <div style="text-align:center;padding:40px;color:#888;">
          <div style="font-size:48px;margin-bottom:16px;">&#x1F514;</div>
          <p>No notifications yet.</p>
        </div>
      </div>
    </div>

    <div id="page-audit" class="page">
      <div class="card">
        <div class="card-title">&#x1F6E1;&#xFE0F; Audit Logs</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">Complete record of all system activity.</p>
        <table class="table">
          <tr><th>Time</th><th>User</th><th>Action</th><th>Details</th></tr>
          <tr><td style="color:#888;font-size:12px;">Just now</td><td>Admin</td><td>LOGIN</td><td style="color:#888;font-size:12px;">Successful login</td></tr>
        </table>
      </div>
    </div>

    <div id="page-admin" class="page">
      <div class="card">
        <div class="card-title">&#x1F527; Admin Panel</div>
        <p style="color:#888;margin-bottom:20px;font-size:14px;">System settings, users and configuration.</p>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;">
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;">
            <div style="font-weight:600;margin-bottom:12px;">&#x1F464; User Management</div>
            <table class="table">
              <tr><th>Name</th><th>Email</th><th>Role</th></tr>
              <tr><td>Admin User</td><td>admin@regentic.com</td><td><span class="status paid">Admin</span></td></tr>
            </table>
            <button style="margin-top:12px;padding:8px 16px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;">+ Add User</button>
          </div>
          <div style="background:#f9f9f9;padding:20px;border-radius:8px;">
            <div style="font-weight:600;margin-bottom:12px;">&#x2699;&#xFE0F; System Settings</div>
            <div style="font-size:13px;color:#888;margin-bottom:8px;">Company Name</div>
            <input type="text" value="Regentic Systems" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;margin-bottom:12px;" />
            <div style="font-size:13px;color:#888;margin-bottom:8px;">Currency</div>
            <input type="text" value="ZAR (R)" style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;" />
            <button style="margin-top:12px;padding:8px 16px;background:#00d4ff;color:#000;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:13px;">Save Settings</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>
<script>
  const user = JSON.parse(localStorage.getItem('user') || '{"name":"Admin"}');
  document.getElementById('user-name').textContent = 'Welcome, ' + user.name;

  function showPage(page, navItem) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById('page-' + page).classList.add('active');
    if (navItem) navItem.classList.add('active');
    const titles = { dashboard:'Dashboard', inventory:'Inventory', billing:'Billing', invoices:'Invoices', accounting:'Accounting', workflows:'Workflows', ai:'AI Copilot', reports:'Reports', notifications:'Notifications', audit:'Audit Logs', admin:'Admin Panel' };
    document.getElementById('page-title').textContent = titles[page] || page;
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  function sendAI() {
    const input = document.getElementById('ai-input');
    const msg = input.value.trim();
    if (!msg) return;
    const messages = document.getElementById('chat-messages');
    messages.innerHTML += '<div style="color:white;font-size:13px;margin:12px 0;text-align:right;"><span style="background:#00d4ff20;padding:8px 12px;border-radius:8px;">'+msg+'</span></div>';
    messages.innerHTML += '<div style="color:#00d4ff;font-size:14px;margin-top:12px;">&#x1F916; Regentic AI</div><div style="color:#888;font-size:13px;margin-top:4px;">Connect your OpenAI API key in the Admin panel to enable full AI responses. Currently running in demo mode.</div>';
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  }

  document.getElementById('ai-input').addEventListener('keypress', e => { if (e.key === 'Enter') sendAI(); });
</script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/api/login' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          const token = generateToken();
          sessions[token] = user;
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ token, user: { id: user.id, email: user.email, name: user.name } }));
        } else {
          res.writeHead(401, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({ error: 'Invalid credentials' }));
        }
      } catch {
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ error: 'Bad request' }));
      }
    });
    return;
  }

  if (url === '/dashboard') {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(dashboardPage);
    return;
  }

  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(loginPage);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Regentic Systems ERP running on port ' + PORT);
});