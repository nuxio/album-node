const Router = require("koa-router");
const UserService = require("./services/user");

const router = new Router();

router.get("/", ctx => {
  ctx.body = "Hello world!";
});

router.post("/register", async ctx => {
  const { name, password } = ctx.request.body;
  const res = await UserService.createUser(name, password);
  if (typeof res === "string") {
    ctx.body = {
      code: -1,
      data: null,
      msg: res
    };
  } else {
    ctx.body = {
      code: 0,
      data: res,
      msg: ""
    };
  }
});

router.post("/login", async ctx => {
  const { name, password } = ctx.request.body;
  const res = await UserService.login(name, password);
  ctx.body = res;
});

module.exports = router;
