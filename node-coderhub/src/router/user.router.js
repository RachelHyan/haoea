const KoaRouter = require('@koa/router');
const { register, showAvatarImage } = require('../controller/user.controller');
const { verifyUser, handlePassword } = require('../middleware/user.middleware');

// 1. 创建路由对象
const userRouter = new KoaRouter({prefix: '/users'});

// 2. 定义路由中映射
// 2.1 用户注册接口
userRouter.post('/', verifyUser, handlePassword, register);

// 2.2 为用户提供头像展示
userRouter.get('/avatar/:userId', showAvatarImage)

module.exports = userRouter;