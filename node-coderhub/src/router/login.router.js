const KoaRouter = require('@koa/router');
const { signIn, test } = require('../controller/login.controller');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware');

const loginRouter = new KoaRouter({prefix: '/login'});

// 登录
loginRouter.post('/', verifyLogin ,signIn)

// 验证登录凭证有效性
loginRouter.get('/test', verifyAuth , test)

module.exports = loginRouter;