const { default: axios } = require("axios");
var http = require("http"),
  httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({});
proxy.on("econnreset", (e) => {
  console.log(`We lost a connection`);
});

proxy.on("error", (e) => {
  console.log(`error!`, e);
});

const targets = [
  { host: "127.0.0.1", port: 4000 },
  { host: "127.0.0.1", port: 4001 },
];

const findAvailableTarget = async () => {
  for (const target of targets) {
    try {
      (await axios.get(`http://${target.host}:${target.port}`)).data;
    } catch (e) {
      continue;
    }
    return target;
  }
};

var server = http.createServer(function (req, res) {
  findAvailableTarget().then((target) => {
    // proxy req
    proxy.web(req, res, {
      target: target,
      ws: true,
    });
  });
});

// proxy websocket
server.on("upgrade", function (req, socket, head) {
  findAvailableTarget().then((target) => {
    proxy.ws(req, socket, head, {
      target: target,
      ws: true,
    });
  });
});
server.on("econnreset", (e) => {
  console.log(`server: We lost a connection`);
});

server.on("error", (e) => {
  console.log(`server: error!`, e);
});
server.listen(8001);
