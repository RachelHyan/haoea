const fs = require('fs')

const registerRouters = (app) => {
    // 1. 读取当前文件夹下的所有文件
    const files = fs.readdirSync(__dirname)

    // 2. 遍历所有的文件
    for (const file of files) {
        // 文件尾缀是否为 .router.js
        if (!file.endsWith('.router.js')) continue
        // 导入文件
        const router = require(`./${file}`)


        app.use(router.routes())
        app.use(router.allowedMethods())
    }
}

module.exports = registerRouters