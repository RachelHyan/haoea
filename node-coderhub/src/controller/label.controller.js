const labelService = require('../service/label.service')

class LabelController {
   async create(ctx, next) {
        // 1. 获取标签名称
        const { name } = ctx.request.body;

        // 2. 插入数据库
        await labelService.create(name)

        ctx.body = {
            code: 200,
            message: "创建标签成功"
        }
    }

    async list(ctx, next) {
        // 1. 获取数据
        const { size } = ctx.query;

        // 1. 从数据库中查询所有的动态
        const result = await labelService.queryList(size);

        // 2. 返回数据
        ctx.body = {
            code: 200,
            message: '查询标签列表成功',
            data: result
        }
    }
}

module.exports = new LabelController()