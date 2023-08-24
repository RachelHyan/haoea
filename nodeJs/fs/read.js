const fs = require('fs');

// 同步读取文件状态
try {
    const stats = fs.readFileSync('./fs/file.txt', 'utf8');
    console.log(stats);
} catch (error) {
    console.log(error);
}   

// 异步回调函数读取文件状态
fs.readFile('./fs/file.txt', 'utf8', (err, stats) => {
    if (err) {
        console.log(err);
    } else {
        console.log(stats);
    }
});

// 异步promise读取文件状态
fs.promises.readFile('./fs/file.txt', 'utf8').then(stats => {
    console.log(stats);
}).catch(err => {
    console.log(err);
});