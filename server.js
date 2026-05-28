const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Regentic Systems</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: Arial, sans-serif; 
            background: #0a0a0a; 
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
          }
          .container { text-align: center; padding: 40px; }
          h1 { font-size: 48px; color: #00d4ff; margin-bottom: 10px; }
          p { font-size: 18px; color: #888; margin-bottom: 30px; }
          .badge { 
            background: #00d4ff22; 
            border: 1px solid #00d4ff; 
            color: #00d4ff;
            padding: 8px 20px; 
            border-radius: 20px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Regentic Systems</h1>
          <p>AI-Enhanced Enterprise Resource Planning</p>
          <span class="badge">>&#x1F680; System Online</span>
        </div>
      </body>
    </html>
  `);
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Regentic Systems running on port ${PORT}`);
});