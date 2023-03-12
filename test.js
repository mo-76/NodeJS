const fs = require("node:fs");
// import zlib module
const zlib = require('node:zlib');

// zlib module provides compression functionality implemented using gzip algorithm 

// on in simple terms zlib allows us to create zipped files if we can call it that 

// what is great about zlib is that has a built-in transform strem 

const gzip = zlib.createGzip();

// create readableStream
const readableStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 2
});

// return a transform stream 
readableStream.pipe(gzip).pipe(fs.WriteStream("./file2.txt.gz"));

// moving from a readable stream to a transform stream to a writable stream

// the result
// new file file2.txt.gz created 




