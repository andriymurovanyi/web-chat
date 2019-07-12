const Koa = require("koa");
const config = require("./config");

const Router = require("koa-router");
const serve = require("koa-static");
const hbs = require("koa-views-handlebars");

const app = new Koa();
const router = new Router();
const server = require("http").createServer(app.callback());
const io = require("socket.io")(server);

app.use(serve(__dirname + "/public"));
app.use(hbs(__dirname , {
  partialDirs: __dirname + '/views'
}));

router.get("/", async ctx => {
  await ctx.render("./views/index", {title: "WebChat"})
});

let users = [];
let connections = [];

io.on("connection", function (socket) {
  console.log("Connection successful!");
  connections.push(socket);

  socket.on("disconnect", function(data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log("Disconnected!");
  });

  socket.on("sendMessage", function (data) {
    io.sockets.emit("addMessage", {
      from: data.from,
      message: data.message,
      style: data.style
    });
  })
});

app
    .use(router.routes())
    .use(router.allowedMethods());

const port = config.app.port;

server.listen(port);