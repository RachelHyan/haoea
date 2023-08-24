const fs = require('fs');

fs.writeFile('./fs/file.txt', 'Hello world', (err) => {
    if (err) {
        console.log(err);
    }
});