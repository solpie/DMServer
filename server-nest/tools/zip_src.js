const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const dir = './src/';
const out = './dist-nest.zip';
const zip = archiver('zip');
const zipStream = fs.createWriteStream(out);
zip.pipe(zipStream);
const folder = path.join(process.cwd(), dir);

// 添加整个文件夹到压缩包
zip.directory(folder, false);

zip.finalize();
