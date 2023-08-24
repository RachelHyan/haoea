// 引入 events 模块
const eventsEmitter = require('events');
// 创建 eventEmitter 对象
const emitter = new eventsEmitter();

// 绑定事件处理程序
emitter.on('test', (arg1, arg2) => {
    console.log('test事件触发了', arg1, arg2);
});
emitter.addListener('test2', (arg1, arg2) => {
    console.log('test2事件触发了', arg1, arg2);
});

// 触发事件
emitter.emit('test', '参数1', '参数2');
emitter.emit('test2', '参数1', '参数2');

// 移除事件
emitter.off('test', () => {
    console.log('test事件被移除了');
});
emitter.removeListener('test2', () => {
    console.log('test2事件被移除了');
});

// 获取所有监听事件的名称
console.log(emitter.eventNames());

// 获取指定事件的监听器数量
console.log(emitter.listenerCount('test2'));

// 获取指定事件的监听器
console.log(emitter.listeners('test2'));

// 获取监听器的最大数量
console.log(emitter.getMaxListeners());

// 监听一次
emitter.once('test3', () => {
    console.log('test3事件触发了');
});

// 将监听事件添加到监听器数组的开头
emitter.prependListener('test4', () => {
    console.log('test4事件触发了');
});

// 将监听事件添加到监听器数组的开头，只监听一次
emitter.prependOnceListener('test5', () => {
    console.log('test5事件触发了');
});

// 移除所有监听事件
emitter.removeAllListeners();