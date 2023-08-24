const http = require('http');

// 创建一个 HTTP 服务器，requestListener 函数用于处理请求和响应
const server = http.createServer((request, response) => {
    // 处理请求，并向客户端返回内容
    response.end('Hello XiaoYu');
});

// 监听服务器的端口号，当服务器启动并开始监听端口时，触发回调函数
server.listen('8000', () => {
    console.log('8000端口启动成功')
})
