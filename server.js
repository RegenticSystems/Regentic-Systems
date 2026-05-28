const http = require('http');
const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Regentic Systems ERP</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', sans-serif; background: #f0f2f5; display: flex; min-height: 100vh; }
  .sidebar { width: 240px; background: #0a0a0a; color: white; padding: 20px 0; position: fixed; height: 100vh; }
  .sidebar-logo { padding: 0 20px 20px; border-bottom: 1px solid #222; }
  .sidebar-logo h1 { font-size: 18px; color: #00d4ff; }
  .sidebar-logo p { font-size: 11px; color: #555; margin-top: 4px; }
  .sidebar-nav { padding: 20px 0; }
  .nav-item { padding: 12px 20px; cursor: pointer; font-size: 14px; color: #888; display: flex; align-items: center; gap: 10px; transition: all 0.2s; }
  .nav-item:hover, .nav-item.active { background: #00d4ff15; color: #00d4ff; border-left: 3px solid #00d4ff; }
  .main { margin-left: 240px; flex: 1; }
  .header { background: white; padding: 16px 30px; border-bottom: 1px solid #e0e0e0; display: flex; justify-content: space-between; align-items: center; }
  .header h2 { font-size: 20px; color: #1a1a1a; }
  .header-right { display: flex; align-items: center; gap: 12px; }
  .badge { background: #00d4ff15; color: #00d4ff; padding: 4px 12px; border-radius: 20px; font-size: 12px; border: 1px solid #00d4ff30; }
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
  .bar { flex: 1; background: linear-gradient(to top, #00d4ff, #0066ff); border-radius: 4px 4px 0 0; min-height: 10px; }
  .table { width: 100%; border-collapse: collapse; }
  .table th { text-align: left; font-size: 12px; color: #888; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
  .table td { padding: 10px 0; font-size: 13px; border-bottom: 1px solid #f9f9f9; }
  .status { padding: 3px 10px; border-radius: 20px; font-size: 11px; }
  .status.paid { background: #22c55e15; color: #22c55e; }
  .status.pending { background: #f59e0b15; color: #f59e0b; }
  .status.draft { background: #6b728015; color: #6b7280; }
  .modules-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .module-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); text-align: center; cursor: pointer; transition: all 0.2s; }
  .module-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
  .module-icon { font-size: 32px; margin-bottom: 10px; }
  .module-name { font-size: 14px; font-weight: 600; color: #1a1a1a; }
  .module-desc { font-size: 12px; color: #888; margin-top: 4px; }
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-logo">
    <h1>Regentic Systems</h1>
    <p>AI-Enhanced ERP</p>
  </div>
  <div class="sidebar-nav">
    <div class="nav-item active">&#x1F3E0; Dashboard</div>
    <div class="nav-item">&#x1F4E6; Inventory</div>
    <div class="nav-item">&#x1F4B3; Billing</div>
    <div class="nav-item">&#x1F4CB; Invoices</div>
    <div class="nav-item">&#x1F4CA; Accounting</div>
    <div class="nav-item">&#x2699;&#xFE0F; Workflows</div>
    <div class="nav-item">&#x1F916; AI Copilot</div>
    <div class="nav-item">&#x1F4C8; Reports</div>
    <div class="nav-item">&#x1F514; Notifications</div>
    <div class="nav-item">&#x1F6E1;&#xFE0F; Audit Logs</div>
    <div class="nav-item">&#x1F527; Admin</div>
  </div>
</div>
<div class="main">
  <div class="header">
    <h2>Dashboard</h2>
    <div class="header-right">
      <span class="badge">&#x1F7E2; System Online</span>
      <span style="font-size:13px;color:#888;">Welcome, Admin</span>
    </div>
  </div>
  <div class="content">
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-label">Total Revenue</div>
        <div class="kpi-value">R0</div>
        <div class="kpi-change">&#x2191; Getting started</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Active Users</div>
        <div class="kpi-value">1</div>
        <div class="kpi-change">&#x2191; You!</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Total Products</div>
        <div class="kpi-value">0</div>
        <div class="kpi-change">Add inventory to start</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Open Invoices</div>
        <div class="kpi-value">0</div>
        <div class="kpi-change">Create your first invoice</div>
      </div>
    </div>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">Revenue Overview</div>
        <div class="chart-bars">
          <div class="bar" style="height:20%"></div>
          <div class="bar" style="height:35%"></div>
          <div class="bar" style="height:25%"></div>
          <div class="bar" style="height:50%"></div>
          <div class="bar" style="height:40%"></div>
          <div class="bar" style="height:60%"></div>
          <div class="bar" style="height:45%"></div>
          <div class="bar" style="height:70%"></div>
          <div class="bar" style="height:55%"></div>
          <div class="bar" style="height:80%"></div>
          <div class="bar" style="height:65%"></div>
          <div class="bar" style="height:90%"></div>
        </div>
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:11px;color:#888;">
          <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
        </div>
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
        <div class="module-card"><div class="module-icon">&#x1F4E6;</div><div class="module-name">Inventory</div><div class="module-desc">Products, stock & warehouses</div></div>
        <div class="module-card"><div class="module-icon">&#x1F4B3;</div><div class="module-name">Billing</div><div class="module-desc">Subscriptions & payments</div></div>
        <div class="module-card"><div class="module-icon">&#x1F4CB;</div><div class="module-name">Invoices</div><div class="module-desc">Create & manage invoices</div></div>
        <div class="module-card"><div class="module-icon">&#x1F4CA;</div><div class="module-name">Accounting</div><div class="module-desc">Journal entries & ledger</div></div>
        <div class="module-card"><div class="module-icon">&#x1F916;</div><div class="module-name">AI Copilot</div><div class="module-desc">AI-powered business insights</div></div>
        <div class="module-card"><div class="module-icon">&#x1F4C8;</div><div class="module-name">Reports</div><div class="module-desc">Analytics & dashboards</div></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Regentic Systems ERP running on port ${PORT}`);
});