const http = require("http");

const PORT = process.env.PORT || 3000;
const STORAGEAPI = process.env.storageAPI;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.url === "/healthz") {res.writeHead(200, {"Content-Type": "text/plain"}); return res.end("200 OK");}
  else {
    const url = new URL(req.url, `https://${req.headers.host || "localhost"}`);
    console.log(url.searchParams);

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.end(body);
  }
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

function isGame(key, value, value2) {
  return key === "game" && value === value2
}

async function getInStorage(key) {
  fetch("https://ikelene.net/storage/get.php", {
    method: 'POST',
    body: {apiKey: STORAGEAPI, key}
  })
}
