const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require("../config/error");
const { PUBLIC_KEY } = require('../config/secret')
const userService = require("../service/user.service");
const md5password = require("../utils/md5-password");
const jwt = require('jsonwebtoken')

const verifyLogin = async (ctx, next) => {
    // 1. 获取用户名和密码
    const { account, password } = ctx.request.body;

    // 2. 判断用户名和密码是否为空
    if (!account || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx)
    }

    // 3. 判断用户是否存在（用户不存在）
    const users = await userService.getUserByAccount(account)
    const user = users[0]
    if (!user) {
        return ctx.app.emit('error', NAME_IS_NOT_EXISTS, ctx)
    }

    // 4. 判断密码是否和数据库中的密码一致
    if (user.password !== md5password(password)) {
        return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
    }

    // 5. 将用户信息保存在 ctx
    ctx.user = user

    // 6. 返回结果
    await next();
}


const verifyAuth = async (ctx, next) => {
    // 1. 获取token
    const authorization = ctx.headers.authorization
    const token = authorization.replace('Bearer ','')

    // 2. 验证 token 是否有效
    try {
        // 2.1 获取 token 中的信息
        const result = jwt.verify(token, PUBLIC_KEY, {
            algorithms: ['RS256']
        })

        // 2.2 保存 token 信息
        ctx.user = result
        
        // 3. 执行下一个中间件
        await next()
    } catch (error) {
        console.log(error);
        ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
}

module.exports = {
    verifyLogin,
    verifyAuth
}