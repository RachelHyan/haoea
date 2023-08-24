const fs = require('fs');
// 创建一个可读流，读取文件 ./abc.txt，从第 2 个字节的位置开始读取，读取到第 16 个字节的位置结束
// 每次读取 3 个字节的数据，这里的 highWaterMark 参数是可选的，默认值为 64 KB
const readStream = fs.createReadStream('./abc.txt', {
	start: 2,
	end: 16,
	highWaterMark: 3
});

// 注册 data 事件，当有数据可读取时触发回调函数
readStream.on('data', (data) => {
	// 暂停读取流，模拟异步操作
	readStream.pause(); // pause() 方法会暂停读取流，直到调用 resume() 方法时才会继续读取
	setTimeout(() => {
		// 恢复读取流
		readStream.resume(); // resume() 方法会恢复读取流
		// 输出读取的数据
		console.log(data.toString());
	}, 2000);
});



// 监听事件(除 data 外)
// 	readable: 当流有新数据可读时触发，不一定每次触发都有数据可读，因此需要循环读取
// 		readStream.on('readable', () => {
// 			let chunk;
// 			while ((chunk = readStream.read()) !== null) {
// 				console.log(`Received ${chunk.length} bytes of data.`);
// 			}
// 		});

// 	end: 当流已没有数据可读时触发，做读取后的操作 - 关闭文件、释放资源等
// 		readStream.on('end', () => {
// 			console.log('Finished reading file.');
// 		});

// 	error: 当流有错误时触发，处理错误 - 输出错误信息、关闭文件、释放资源等，不监听可能导致崩溃
// 		readStream.on('error', (err) => {
// 			console.error('An error occurred:', err);
// 		});

// 	close: 当流被关闭时触发，被关闭时发生错误会触发 error 而不是 close
// 		readStream.on('close', () => {
// 			console.log('Stream closed.');
// 		});
				
// 	pause: 调用 readStream.pause() 暂停可读流时触发
// 	resume: 调用 readStream.resume() 恢复可读流时触发