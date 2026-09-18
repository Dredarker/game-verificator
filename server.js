const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "text/plain; charset=utf-8",
      "Allow": "GET",
    });
    return res.end("Method Not Allowed");
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const body = [...url.searchParams.entries()]
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});