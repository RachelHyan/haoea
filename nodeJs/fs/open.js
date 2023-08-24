const fs = require('fs');

// 获取文件描述符
fs.open('./fs/file.txt', (err, fd) => {
    if (err) {
        console.log(err);
        return;
    }

    fs.fstat(fd, (err, stats) => {
        if (err) return;
        console.log(stats);
        fs.close(fd, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
});


fs.stat('./fs/file.txt', (err, stats) => {
    if (err) return;
    console.log(stats);
});