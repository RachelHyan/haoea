const commentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    // 1. 获取 body 中的数据
    const { momentId, content } = ctx.request.body;
    const { id } = ctx.user;

    // 2. 将评论插入到数据库中
    await commentService.create(content, momentId, id);

    ctx.body = {
      code: 200,
      message: "评论成功",
    };
  }

    async reply(ctx, next) {
        // 1. 获取参数
        const { momentId, content, commentId } = ctx.request.body;
        const { id } = ctx.user;

        // 2. 插入到数据库
        await commentService.reply(content, momentId, id, commentId);

        ctx.body = {
            code: 200,
            message: "回复成功"
        }
    }

    async remove(ctx, next) {
        // 1. 获取参数
        const { commentId } = ctx.params;

        // 2. 删除评论
        await commentService.remove(commentId);

        // 3. 返回结果
        ctx.body = {
            code: 200,
            message: "删除评论成功"
        }
    }

}

module.exports = new CommentController();
