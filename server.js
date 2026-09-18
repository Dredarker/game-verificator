const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.url === "/") {
    const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
    const body = [...url.searchParams.entries()]
      .map(([key, value]) => `${key}=${value}`)
      .join("\n");

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end(body);
  }
  if (req.url === "/healthz") {res.writeHead(200, {"Content-Type": "text/plain"}); return res.end("200 OK");}
  res.writeHead(404); res.end();
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
