const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, detail, update, remove, addLabels } = require('../controller/moment.controller');
const { verifyPermission } = require('../middleware/permission.middleware');
const { verifyLabelExists } = require('../middleware/label.middleware');

const momentRouter = new KoaRouter({prefix: '/moment'});

// 增：发表动态接口
momentRouter.post('/', verifyAuth, create);

// 查：获取动态列表，并返回该动态评论个数（需要建 comment 表）
momentRouter.get('/', list);

// 查：获取单个动态，并返回该动态评论详情以及评论者
momentRouter.get('/:momentId', verifyAuth , detail);

// 删：删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission , remove);

// 改：修改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission , update);

// 增：添加标签
/**
 * 1. 是否登录
 * 2. 是否有操作权限
 * 3. 验证 label 的 name 是否存在（该步骤支持自定义标签）
 *  - 存在：直接使用
 *  - 不存在：先添加到 label 表中
 * 4. 动态和label添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission , verifyLabelExists , addLabels)

module.exports = momentRouter;