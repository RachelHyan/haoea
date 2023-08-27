const fileService = require("../service/file.service");
const userService = require("../service/user.service");
const { SERVER_HOST, SERVER_PORT } = require('../config/server');

class FileController {
   async create(ctx,next) {
    // 1. 获取信息
    const { filename, mimetype, size } = ctx.request.file;
    const { id } = ctx.user;

    // 2. 将图片信息和id结合存入数据库
    await fileService.create(filename, mimetype, size, id);

    // 3. 将头像的地址信息保存在 user 表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${id}`
    await userService.updateUserAvatar(avatarUrl, id);

    // 3. 返回结果
    ctx.body = {
        code: 200,
        message: '头像上传成功',
        data: avatarUrl
    }
}
}

module.exports = new FileController()