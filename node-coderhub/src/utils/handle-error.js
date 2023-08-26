const app = require("../app/index");
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS, NAME_IS_NOT_EXISTS, PASSWORD_IS_INCORRENT, UNAUTHORIZATION, UNPERMISSION } = require("../config/error");

app.on('error', (error, ctx) => {
    let code = 0
    let message = ''

    switch (error) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = 400
            message = '用户名或者密码不能为空~'
            break;
        case NAME_IS_ALREADY_EXISTS:
            code = 400
            message = '用户名已经存在~'
            break;
        case NAME_IS_NOT_EXISTS:
            code = 400
            message = '用户名不存在'
        case PASSWORD_IS_INCORRENT:
            code = 400
            message = '密码错误'
        case UNAUTHORIZATION:
            code = 401
            message = '无效的token'
        case UNPERMISSION:
            code = 401
            message = '您不具备操作的权限~'
    }

    ctx.body = {
        code,
        message
    }
})