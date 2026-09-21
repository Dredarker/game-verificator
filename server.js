const http = require("http");

const PORT = process.env.PORT || 3000;
const STORAGEAPI = process.env.storageAPI;
const AVALIABLEGAMES = ["cubic-buildPM"];

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.url === "/healthz") {
    res.writeHead(200, {"Content-Type": "text/plain"});
    return res.end("200 OK");
  } else {
    const url = new URL("https://localhost:3000"+req.url);
    const searchParams = Object.fromEntries(url.searchParams.entries())
    if (!AVALIABLEGAMES.includes(searchParams.game)) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      return res.end("Not found game");
    } else if (!searchParams.browserid) {
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      return res.end("Browser id is empty");
    }
    let keyverify = await getInStorage(searchParams.game+"-"+searchParams.browserid);

    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    return res.end(keyverify);
  }
});

server.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});

async function getInStorage(key) {
  let body = {apiKey: STORAGEAPI, key};
  let response = await fetch("https://ikelene.net/storage/get.php", {
    method: 'POST',
    body: JSON.stringify(body)
  });
  let json = await response.json();
  return json.data.value;
}
