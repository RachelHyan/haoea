const momentService = require('../service/moment.service');

class MomentController {
   async create(ctx, next) {
        // 1. 获取动态内容
        const { content } = ctx.request.body;

        // 2. 动态由谁发布(token -> id)
        const { id } = ctx.user;

        // 3. 将动态插入到数据库
        const result = await momentService.create(content, id);

        ctx.body = {
            code: 200,
            message: '创建动态成功',
            data: result
        }
    }

    async list(ctx, next) {
        // 0. 获取数据(offset/size)
        const { offset, size } = ctx.query;

        // 1. 从数据库中查询所有的动态
        const result = await momentService.queryList(offset, size);

        // 2. 返回数据
        ctx.body = {
            code: 200,
            message: '查询动态列表成功',
            data: result
        }
    }

    async detail(ctx, next) {
        // 1. 获取动态的 id
        const { momentId } = ctx.params;

        // 2. 根据 id 查询数据
        const result = await momentService.getMomentById(momentId);

        // 3. 返回数据
        ctx.body = {
            code: 200,
            message: '查询动态详情成功',
            data: result[0]
        }
    }

    async update(ctx, next) {
        // 1. 获取修改动态的id
        const { momentId } = ctx.params;

        // 2. 获取修改的内容
        const { content } = ctx.request.body;

        // 3. 修改内容
        const result = await momentService.update(content, momentId);

        // 4. 返回数据
        ctx.body = {
            code: 200,
            message: '修改动态成功',
            data: result[0]
        }
    }

    async remove(ctx, next) {
        // 1. 获取要删除的动态 id
        const { momentId } = ctx.params;

        // 2. 删除动态
        const result = await momentService.remove(momentId);

        // 3. 返回数据
        ctx.body = {
            code: 200,
            message: '删除动态成功',
            data: result
        }
    }
}

module.exports = new MomentController()