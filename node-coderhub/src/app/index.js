const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const registerRouters = require('../router')

// 1. 创建 app
const app = new Koa();

// 2. 配置中间件
// 使用bodyParser
app.use(bodyParser());
// 使用路由
registerRouters(app)

// 3. 导出 app
module.exports = app;