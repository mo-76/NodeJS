// when importing a bulit-in module, the node perfix is optional 
// the node protocol (node: Protocol) has many beneifis 
// 1. makes it perfectly clear that the important is a Node.js buitin module
// 2. makes the import identifer a vaild absolute url
// 3. avoid conflicts for future Node.js built-in modules
const path = require('node:path');

// path module
// path is built-in module that provides utillites to work with file and dictory paths

// Methods
//1. basename
// return the last portion of a path
console.log("basename: last portion of a path => " + path.basename(__filename)); // path.js
console.log("basename: last portion of a path => " + path.basename(__dirname)); // modules

//2. extname
// return the extention of the path
console.log("extname: extention of the path => " + path.extname(__filename)); // .js
console.log("extname: extention of the path => " + path.extname(__dirname)); // '' dont have dot char in path

//3. extname
// represent signifcant element of the path
console.log("parse: represent signifcant element of the path");
console.log(path.parse(__filename));
/*
  {
    root: 'e:\\',
    dir: 'e:\\programming\\NdoeJs\\modules',
    base: 'path.js',
    ext: '.js',
    name: 'path'
  }
*/
// you can access these properties indiviually using dot notion like do on any object
// console.log(path.parse(__filename).root);

//4. format
// return a path string given an object
console.log(path.format(path.parse(__filename))); // e:\programming\NdoeJs\modules\path.js
// you should get back the original path string which is double __filename
// me: same as __filename

//5. isAbsolute
// return wether a path absolute or not 
// absolute: start with root \
console.log(path.isAbsolute(__filename)); // true
console.log(path.isAbsolute("./data.json")); // false

//6. join
// join all given path segments together using the platform specific separator as a delimiter and then normalizes the resulting path 
// path.join accept one or more strings as argument 
console.log(path.join("folder1", "folder2", "index.html")); // folder1\folder2\index.html
console.log(path.join("\\folder1", "folder2", "index.html")); // \folder1\folder2\index.html
console.log(path.join("\\folder1", "\\folder2", "index.html")); // \folder1\folder2\index.html => normalizes the resulting path
console.log(path.join("\\folder1", "\\folder2", "..\\index.html")); // \folder1\index.html => we are saying from folder2 jump on folder up and then concatenate index.html
console.log(path.join(__dirname, 'data.json')); //e:\programming\NdoeJs\modules\data.json
console.log("-----------------------------------------");
//6. resolve
// resolve which results a sequence of paths or path segments into an (absolute path)

//if argument dont conatin a back slash as is the case with our first statement result will add an absoulte path to the current folder and join arguments
console.log(path.resolve("folder1", "folder2", "index.html")); // E:\programming\NdoeJs\folder1\folder2\index.html

// if you specify a back slath result will return the absolute path from the back slash 
console.log(path.resolve("\\folder1", "folder2", "index.html")); // E:\folder1\folder2\index.html

// if a back slash occurs later in the sequence result will consider the root and ignore the pervious path
console.log(path.resolve("\\folder1", "\\folder2", "index.html")); // E:\folder2\index.html

// where slash folder2 is root but we go up one folder and hence only index.html is logged
console.log(path.resolve("\\folder1", "\\folder2", "..\\index.html")); // E:\index.html

// __dirname is already an absolute path we see that with data.json returned by the result mehtod
console.log(path.resolve(__dirname, 'data.json')); // e:\programming\NdoeJs\modules\data.json






