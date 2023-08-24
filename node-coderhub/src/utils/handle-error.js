const app = require("../app/index");
const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_ALREADY_EXISTS } = require("../config/error");

app.on('error', (error, ctx) => {
    let code = 0
    let message = ''

    switch (error) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = 400
            message = '用户名或者密码不能为空~'
            break;
        case NAME_IS_ALREADY_EXISTS:
            code = 409
            message = '用户名已经存在~'
            break;
    }

    ctx.body = {
        code,
        message
    }
})