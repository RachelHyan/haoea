const fs = require('fs');

fs.mkdir('./test/test.js', (err) => {
    if (err) {
        console.log(err);
    }
});

fs.readdir('./fs', { withFileTypes: true }, (err, files) => {
    console.log(files);
})

// 递归读取文件夹中所有的文件
function readDirectory(path) {
    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        files.forEach((item) => {
            if (item.isDirectory()) { // 判断是否是文件夹
                // 文件夹下还有文件夹，进行递归
                readDirectory(`${path}/${item.name}`)
            } else {
                console.log('item是个文件', item.name);
            }
        })
    })
}

readDirectory('./fs')

fs.rename('./fs/file.txt', './fs/file2.txt', (err) => {
    if (err) {
        console.log(err);
    }
})