const { UNPERMISSION } = require("../config/error")
const permissionService = require("../service/permission.service")

const verifyPermission = async (ctx, next) => {
    // 1. 获取登录用户的 id 
    const { id } = ctx.user

    // 2. 获取资源的name/id
    const keyName = Object.keys(ctx.params)[0]
    const resouceId = ctx.params[keyName]
    const tableName = keyName.replace('Id', '')

    // 2. 查询 user 的 id 是否和 moment 的 user_id 相等
    const isPermission = await permissionService.checkResource(tableName, resouceId, id)

    // 3. 判断是否有权限
    if (!isPermission) {
        return ctx.app.emit('error', UNPERMISSION, ctx)
    }

    await next()
}

module.exports = {
    verifyPermission
}