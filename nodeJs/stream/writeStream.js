const fs = require('fs');

const writeStream = fs.createWriteStream('./abc.txt', {
    flags: 'a', // a - 追加写入，w - 覆盖写入
    highWaterMark: 3 // 每次写入 3 个字节的数据
});

// 注册 drain 事件，当数据被消费时触发回调函数
writeStream.on('drain', () => {
    console.log('数据被消费了');
});

// 写入数据
writeStream.write('a');

// 注册 finish 事件，当数据写入完成时触发回调函数
writeStream.on('finish', () => {
    console.log('数据写入完成');
});

// 写入完成时, 需要手动去掉用close方法
writeStream.on('close', () => {
    console.log('写入流关闭');
});

// 将最后的内容写入到文件中, 并且关闭文件
writeStream.end('d');
writeStream.end();