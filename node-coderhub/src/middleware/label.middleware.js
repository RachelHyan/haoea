const labelService = require("../service/label.service");


/**
 * 
 * 传入labels时，不确定labels是否有name已经存在label表中
 * 所以需要将labels都保存在label中，获取labels的id
 * 将获取的数据传入下一个中间件
 */
const verifyLabelExists = async (ctx, next) => {
    // 1. 获取客户端传递的所有labels
    const { labels } = ctx.request.body;

    // 2. 判断所有的labels中的name是否已存在于label表中
    const newLabels = [];
    for (const name of labels) {
        const result = await labelService.queryLabelByName(name);
        const labelObj = { name }
        if (result) { // 获取对应的label的id
            labelObj.id = result.id; // => { name: 'xx', id: 'xx',}
        } else { // 插入name，获取插入后的id
            const insertResult = await labelService.create(name);
            labelObj.id = insertResult.insertId; // => { name: 'xx', id: 'xx',}
        }
        newLabels.push(labelObj)
    }

    // 3. 所有的labels都变成[{ name: 'xx', id: 'xx',},{ name: 'xx', id: 'xx',}]
    ctx.labels = newLabels

    await next();
}

module.exports = {
    verifyLabelExists
}