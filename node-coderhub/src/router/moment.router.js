const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, detail, update, remove } = require('../controller/moment.controller');
const { verifyPermission } = require('../middleware/permission.middleware');

const momentRouter = new KoaRouter({prefix: '/moment'});

// 增：发表动态接口
momentRouter.post('/', verifyAuth, create);

// 查：获取动态列表
momentRouter.get('/', list);

// 查：获取单个动态
momentRouter.get('/:momentId', verifyAuth , detail);

// 删：删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission , remove);

// 改：修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission , update);

module.exports = momentRouter;