const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("./router");

const app = new Koa();

app.use(bodyParser());

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get("X-Response-Time");
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// X-Response-Time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set("X-Response-Time", ms);
});

// response
app.use(router.routes());

app.listen(3000);

exports.app = app;
