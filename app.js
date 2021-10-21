const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const cors = require("koa-cors");
const { WebSocketServer } = require("ws");

const app = new Koa();
app.use(bodyParser());
app.use(cors());

app.listen(3000, () => {
  console.log("listening on port 3000");
});

const WebSocket = require("ws");
const wss = new WebSocket.Server({
  port: 3010,
});

/* 对客户端的连接事件进行监听 */
/* client 代表客户端的连接 socket 对象 */
wss.on("connection", (client) => {
  console.log("somebody successfully connected", client);
  /* 对客户端的连接对象进行 message 事件监听 */
  /* message 客户端发给服务端的数据 */
  client.on("message", (message) => {
    console.log("message from client", message);
    /* 服务端向该客户端发送数据 */
    client.send("hello");
  });
});
