const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const { create, list } = require('../controller/label.controller')

const labelRouter = new KoaRouter({prefix: '/label'});

// 增： 创建标签
labelRouter.post('/', verifyAuth, create);

// 查： 查询标签列表，随机返回
labelRouter.get('/', list)

module.exports = labelRouter;