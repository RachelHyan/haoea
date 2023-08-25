const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config/secret');

class LoginController {
    // 登录颁发令牌
    signIn(ctx, next) {
        // 1. 获取用户信息
        const { id, account } = ctx.user
        
        // 2. 颁发令牌 token
        const token = jwt.sign({ id, account }, PRIVATE_KEY, {
            expiresIn: 24 * 60 * 60,
            algorithm: 'RS256'
        })
        console.log(token);
        // 3. 返回用户消息
        ctx.body = { code: 200, data: { id, account, token } }
    }

    // 测试登录凭证有效性
    test(ctx, next) {
        ctx.body = '验证通过'
    }
}

module.exports = new LoginController()