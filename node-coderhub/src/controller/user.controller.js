const { UPLOAD_PATH } = require("../config/path");
const fileService = require("../service/file.service");
const UserService = require("../service/user.service");
const fs = require('fs')

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

  async showAvatarImage(ctx, next) {
    // 1. 获取用户id
    const { userId } = ctx.params;

    // 2. 获取 userId 对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId); 

    // 3. 读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype;
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`);
  }
}

module.exports = new UserController();
