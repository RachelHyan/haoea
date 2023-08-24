const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const userRouter = require('../router/user.router');

// 1. 创建 app
const app = new Koa();

// 2. 配置中间件
// 使用bodyParser
app.use(bodyParser());
// 使用路由
app.use(userRouter.routes());
app.use(userRouter.allowedMethods()); // 允许使用get、post等方法

// 3. 导出 app
module.exports = app;