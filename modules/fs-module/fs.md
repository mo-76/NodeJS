# fs module

`the file (fs) module allows you to work with the file system on your computer`

the fs module internally uses the buffer

we make use of built-in module we first to import it and to import a built-in module we use the require function

```javascript
// import fs module
const fs = require("node:fs");
```

once we have the module lodaded we can access the various properties and method exposed by fs module

- read contents of files

```javascript
// to this method we pass in the path to the file we want to read
const fileContents = fs.readFileSync("./file.txt"); // this is relative path

console.log(fileContents); // <Buffer 64 73 66 61 73>

// to view it in human readable format let's set a second argument utf-8 which is the encoding
const fileContents = fs.readFileSync("./file.txt", "utf-8");

console.log(fileContents); // Mohammed
```

the mehthod name is readFileSync here suffix sync is very important
this basically tells us the mehthod is a synchronous way of reading a file
in other word javascript engine will wait till the file content are read before moving on to the next line
now it might be okay to block the javascript main thread and read data if that is essential for code written further down the line

EX: reading configuration data from a file and using it further down the line

more often that not you don't want this synchronous behavior

if you have a lot of concurrent users and the file size is large they will be blocked for some time as javascript is single threaded and synchronous
the performance will really poor

in pervious topic we say
NodeJS is asynchronous, it has features to do tasks asynchronously without blocking the main thread
and for that reason anthor method exists on the fs object which is `readFile()` method

let's understand it's syntax

```javascript
// first Arg: file path
// second Arg: callback function which wil be invoked after the file content have been read
// the callback fun. receives two parameters (error, data)
// error that was identified when reading the file if there was any if there was no error on the other hand it is set to null and data is populated with the file contents
// this pattern of using callbacks were the first argument is the error is called error first callback

fs.readFile("./file.txt", (error, data) => {
  if (error) {
    console.log(error);
  } esle {
    console.log(data);
  }
});

// you can pass in utf-8 as the second argument which is our encoding

fs.readFile("./file.txt", "utf-8" ,(error, data) => {
  if (error) {
    console.log(error);
  } esle {
    console.log(data);
  }
});

```

if you write `console.log("last");` after `readFile()`, the last word appear before result of `readFile()`

when the file reading is complete node will then execute the callback functions

- write contents of files <br>
  we are going to use method which has both sync and async versions

let's start with synchronous

```javascript
// 1st agr. => path to the file
// 2nd agr. => is file contents
fs.writeFileSync("./greet.txt", "Hello world!");
```

let's now take a look at the async version

```js
// if the file does not exist a new file is created
//if the file exists the contents are overwritten

// 1st agr. => path to the file
// 2nd agr. => is file contents
// 3rd agr. => is our error first callback
fs.writeFile("./greet.txt", "Hello world!", (errosr) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File written");
  }
});

// by default write file overwrite the file contents

// however if you want to append to the existing content you can add an option as a third argument, it's an object where we set flag as append
fs.writeFile("./greet.txt", "Hello world!", { flag: "a" }, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("File written");
  }
});
```

---

# fs Promise Module

`there is a more recent promise based version of the same module`

```js
// step1: import module
const fs = require("node:fs/promises");

// step2: read a file using the read file method
fs.readFile("file.txt", "utf-8");

//to work with a promise based version of read file we can add then and catch blocks
fs.readFile("file.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// then() called when promise results successfully
// catch() called when promise rejects with an error to get access to the adder which we can log again to the console
```

to prove this is asynchronous let's add a few log statements

```js
console.log("first");

fs.readFile("file.txt", "utf-8")
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

console.log("second");
// the result is
// first
// second
// data from read file method
```

what node does is start the file read and set it aside which allows for further code to be executed

when the file reading is complete node will then execute then or catch blocks depending on whether the promise result or rejected because of this asynchronous approch your app will not freeze when multiple users interact with application

now the promise based FS module can also be used with async await as async await is just a syntactical wrapper over promises

```js
async function readFile() {
  try {
    const data = await fs.readFile("file.txt", "utf-8");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

readFile();
```

---

# Streams

`a stream is a sequence of data that is being moved from one point to anthor over time`

EX: a stream of data being transferred from one file to anthor within the same computer

- the idea is to work with data in chunks instead of waiting for the entire data to be avaiable at once

- if you're transferring file content from fileA to fileB, you don't wait for entire fileA content to be saved in temporary memory before moving it into fileB

- instead, the content is transferred in chunks over time which prevents unnecessary memroy usage

- stream is infact a built-in node module that inherits from the event emitter class

- other modules internally use streams for their functioning

`how the fs module uses streams to read and write data?`

### create a readable stream to read data in chunks from file.txt

```js
// to read data we use a readable stream made available using the create stream method on the fs module
// 1st arg: the file path as the first argument
// 2nd arg: option object
const readableStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
});
```

### create a writabel stream to write data in chunks from file.txt

```js
// arg: the file path
const writeableStream = fs.createWriteStream("./file.txt");
```

strems extends from the event emitter class and event emitter is a concept we have already had a look at, it allows us to add listeners to events

now the readable stream emits a data event to which we can listen

```js
// event name: data
// callback fun. exectued on the data event
// callback fun. is the listener which automatically receives a chunk of data

readableStream.on("data", (chunk) => {
  console.log(chunk);

  // write to file2.txt using the writable stream
  writeableStream.write(chunk);
});

// we run we can see our chunk is the entire file content file.txt is also written to file2.txt
```

now you might be wondering isn't the chunk, the entire file content of file.txt <br>
well yes it is and this is because the buffer that streams use has a default size of 64 kilobytes but our file content has a total of 18 character which is just 18 bytes so the chunk contains the entire 18 bytes

what we can do is add another opiton when reading data `highWaterMark: ` and we set it to 2

```js
// we now deal with data in chunks of 2 bytes
const readableStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

//after run
// He
// ll
// o
// Co
// de
// vo
// lu
// ti
// on

// you can see only two characterss are locked at a time which corresponds to each chunk

// the file though still contains the full test as expected -Hello Codevolution-
```

now we don't see the benefit here when working with a small file size but when you have large files that are megabytes in size streaming the data from one file to anthor will save you a lot of time and memory

the fs module is just one of the many modules that usese streams

anthor example is the HTTP module which we will learn about in the upcoming section

HTTP request is a readable stream and HTTP response is writable stream

### Types of streams

- _Readable streams_ from which data can be read
- _Writable streams_ to which we can write data
- _Duplex streams_ that are both Readable and Writable
- _Transform streams_ that can modify or transform the data as it is written and read <br>
  EX: reading from a file as readable stream <br>
  EX: Writing to a file as writable stream <br>
  EX: Sockets as a duplex stream <br>
  EX: File compression where you can write compressed data and read de-compressed data to and from a file as a transform stream <br>

---

# Pipes

node has a simpler and better to do the same and that is using pipes

in non-technical terms we understand what a pipe is
for example a pipe that connects a tank to a kitchen sink

the tank feeds water into the pipe which can be released through the tap in the sink

from a pipe point of view we are reading water from the tank and writing it to the sink <br> in nodeJS a pipe is very similar
it takes a readable stream and connects it to a writabel stream we use the pipe method on a readable stream to implement the functionality

```js
const fs = require("node:fs");

const readableStream = fs.createReadStream("./file.txt", {
  encoding: "utf-8",
  highWaterMark: 2,
});

const writeableStream = fs.createWriteStream("./file2.txt");

// readableStream.on("data", (chunk) => {
//   console.log(chunk);

//   writeableStream.write(chunk);
// })

// I can comment out the data event and instead write one line of code
readableStream.pipe(writeableStream);

// result
// we can see the same output as before
// Hello Codevolution in file2.txt
```

what is great about a pipe is that it returns the distination stream which enables chaining

however the condition is that the destination stream has to be readble duplex or transform stream

in our current example we have a writable stream so we can not chain by calling pipe

insead let's make use of another built-in module which is zlib

now this example might be slightly advanced at the moment but I want sure you are aware of the concept of chaining with the pipe method
