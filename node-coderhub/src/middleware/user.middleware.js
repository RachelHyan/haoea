const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require('../config/error');
const UserService = require('../service/user.service');
const md5password = require('../utils/md5-password');

const verifyUser = async (ctx, next) => {
    // 1. 验证客户端传递过来的参数是否符合要求
    // 1.1 验证用户名和密码不能为空
    const { account, password } = ctx.request.body;
    if (!account || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    }

    // 1.2 验证用户名不能重复
    const users = await UserService.getUserByAccount(account);
    if (users.length) {
        return ctx.app.emit('error', NAME_IS_ALREADY_EXISTS, ctx);
    }

    // 2. 执行下一个中间件
    await next();
}

// 对密码进行加密
const handlePassword = async (ctx, next) => {
    // 1. 取出密码
    const { password } = ctx.request.body;

    // 2. 对密码进行加密
    ctx.request.body.password = md5password(password);

    // 3. 执行下一个中间件
    await next();
}

module.exports = {
    verifyUser,
    handlePassword
}