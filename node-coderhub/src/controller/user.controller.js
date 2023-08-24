const UserService = require("../service/user.service");

class UserController {
  // 用户注册的方法
  async register(ctx, next) {
    // 1. 获取用户请求传递的参数
    const user = ctx.request.body;

    // 3. 将用户信息插入到数据库中
    const result = await UserService.create(user);

    // 4. 查看存储的结果，告知前端创建成功
    ctx.body = {
        message : '创建用户成功~',
        data : result
    }
  }
}

module.exports = new UserController();
