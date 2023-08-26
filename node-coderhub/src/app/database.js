const mysql = require('mysql2')

// 1. 创建连接池
const connectionPool = mysql.createPool({
    host: '127.0.0.1', 
    port: 3306,
    database: 'coderhub',
    user: 'root',
    password: 'zzhy.49927',
    connectionLimit: 5,
})

// 2. 测试连接
connectionPool.getConnection((err, connection) => {
    // 1. 判断连接是否成功
    if (err) {
        console.log('连接失败', err);
        return;
    } 

    // 2. 尝试连接
    connection.connect((err) => {
        if (err) {
            console.log('和数据库交互失败', err);
            return;
        }
        console.log('连接成功~');
    })
})

// 3. 创建连接对象(异步的)
const connection = connectionPool.promise()
module.exports = connection