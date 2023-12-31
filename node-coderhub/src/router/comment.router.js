const KoaRouter = require('@koa/router');
const { verifyAuth } = require('../middleware/login.middleware');
const { create, reply, remove, detail } = require('../controller/comment.controller');

const commentRouter = new KoaRouter({prefix: '/comment'});

// 增：新增评论
commentRouter.post('/', verifyAuth, create);

// 增：回复评论
commentRouter.post('/reply', verifyAuth, reply);

// 删：删除评论
commentRouter.delete('/:commentId', verifyAuth, remove);


module.exports = commentRouter;