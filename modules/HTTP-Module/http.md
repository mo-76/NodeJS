<h1 align = "center" >
  HTTP Module
</h1>

## introduction

- _The web works through the client-server model, where clients request web pages and servers store and send those pages as responses._

- _The format for communication between clients and servers is called HTTP (Hypertext Transfer Protocol)._

- _Node.js can be used to create web servers, as it has access to networking functionality and can handle large volumes of requests._

- _The built-in HTTP module in Node.js allows for creation of web servers that can transfer data over HTTP._

## Creating a Node Server

- _import the HTTP module:_ `const http = require('http')`;

- _Invoke the `createServer()` method on the http module, passing in a callback function that receives the request and response objects as arguments._

- _Write code to handle the incoming request and send back the response using the response object._

- _Specify the port number the server should listen on by invoking the `listen()` method on the server object._

- _Optionally, specify a callback function for when the server starts to listen._

- _Run the server using `node <filename>` in the terminal._

```js
const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Additional note:

- _It's good practice to specify the content type of the response using the Content-Type header._

- _To log the request object to the console, add console.log(request); inside the callback function._

## JSON response

- _We learned how to respond with JSON data using the built-in HTTP module in Node.js_

- _We created a new object with two properties (first name and last name)_

- _We tried to send the object to the client using `res.end()`, but received an error that we can't send JavaScript objects as-is in a response._

- _We need to convert the object into the JSON format using `JSON.stringify()`_

- _We also need to specify to the browser that the content type is JSON using `res.setHeader('Content-Type', 'application/json')`_

- _After making these changes, we restart the server and refresh the browser to see the string representation of our object in JSON format._

- _To convert the string back into an object, we can use the built-in `JSON.parse()` method._

- _We've now written our first API endpoint that returns JSON data._

- _Content type set to `application/json` and `JSON.stringify()` are sufficient to send a JSON response back to the client._

- _We can now retrieve this data from our application using any server capable of making a request._

```js
const http = require("http");

const superhero = {
  firstName: "Bruce",
  lastName: "Wayne",
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(superhero));
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

### Details:

- _JSON stands for JavaScript Object Notation and is a lightweight data interchange format used for transmitting data between servers and web applications._

- _JSON.stringify() is a built-in method that converts a JavaScript object into a JSON string._

- _res.setHeader() is used to set the response header. In this case, we set the content type to application/json so that the browser knows to expect JSON data._

- _JSON.parse() is a built-in method that converts a JSON string back into a JavaScript object._

- _An API (Application Programming Interface) is a set of rules that allow applications to communicate with each other. In the context of web development, an API refers to a set of rules that allow web applications to communicate with each other over the internet._

## HTML Response

- _To send HTML as a response, we need to specify the content type as "text/html"._

- _We can write HTML code directly in our JavaScript file, but it's not recommended for larger projects._

- _Instead, we can define the HTML content in a separate file and send that file's contents as a response._

- _We can use the fs module to read the file contents of the HTML file, and then send it as a response._

- _We can use streams to send the file contents as a response, which is more performant for larger files._

### _Code:_

- _To send plain text response:_

```js
res.setHeader("Content-Type", "text/plain");
res.end("Hello World");
```

<br>

- _To send HTML response:_

```js
res.setHeader("Content-Type", "text/html");
res.end("<h1>Hello World</h1>");
```

<br>

- _To read HTML content from a file and send it as a response:_

```js
const fs = require("fs");

const html = fs.readFileSync("./index.html", "utf-8");

res.setHeader("Content-Type", "text/html");
res.end(html);
```

<br>

- _To send HTML content using streams:_

```js
const fs = require("fs");

const stream = fs.createReadStream("./index.html");

res.setHeader("Content-Type", "text/html");
stream.pipe(res);
```

### _Details:_

- When we send an HTML response, we need to specify the content type as "text/html". This tells the browser to treat the response as an HTML document and render it accordingly.

- While we can write HTML directly in our JavaScript file, it's not recommended for larger projects. Instead, we can define the HTML content in a separate file, which makes it easier to manage and modify the content.

- To read the contents of an HTML file, we can use the fs module in Node.js. We can use either the readFileSync or createReadStream method to read the file contents, depending on the size of the file and the performance requirements of our application.

- If we use readFileSync, the entire file contents are read at once and stored in a variable. If the file is large, this can consume a lot of memory and slow down our application. On the other hand, if we use createReadStream, the file contents are read in small chunks and sent to the response using a stream. This is more performant for larger files and doesn't consume as much memory.

- When we use streams to send the HTML content as a response, we create a read stream using the createReadStream method and then pipe it to the response object. This sends the contents of the file as a stream of data to the response object, which then sends it to the browser for rendering.

## HTML Template:

- _In the previous video, we learned how to respond with HTML by creating an HTML file, reading it with the `fs module`, and piping it as a response._

- _However, we may need to add dynamic values to the HTML in certain situations, such as displaying the logged-in user's name._

- _To inject dynamic values into an HTML template, we can use string replacement in JavaScript._

- _We can read the HTML file synchronously using the fs module, store it in a variable, and replace the dynamic values with constants or variables in our JavaScript code._

- _Finally, we can send the updated HTML as a response._

### _Code:_

```js
const name = "vishwas"; // declare a constant variable with the desired dynamic value

let html = fs.readFileSync("index.html", "utf8"); // read the HTML file synchronously and store it in a variable

html = html.replace(/{{name}}/g, name); // replace the dynamic value with the constant variable

res.writeHead(200, { "Content-Type": "text/html" }); // set the response header with the content type

res.write(html); // send the updated HTML as a response
```

`Explanation:`

- _First, we declare a constant variable named name and set its value to "vishwas"._

- _Then, we read the HTML file synchronously using the fs module and store its contents in a variable named html._

- _Next, we use the `replace()` method to replace all occurrences of {{name}} with the value of the name constant variable._

- _We then set the response header with the content type of `text/html`._

- _Finally, we send the updated HTML as a response using the `write()` method._

<br> <br>

> Note:

_While string replacement is a simple and effective way to inject dynamic values into an HTML template, it may not be the most efficient or secure method in all cases. There are other libraries and frameworks that offer more robust templating solutions, such as EJS, Handlebars, and Pug._

## HTTP Routing

- _The HTTP module allows us to route requests to different responses based on the requested URL._

- _The request.url property gives us the URL query string for the current request._

- _We can use if/else or switch statements to respond differently based on the requested URL._

- _Example code for routing requests:_

```js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");
  } else if (req.url === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { firstName: "Bruce", lastName: "Vain" };
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

- _The HTTP method (e.g. GET, POST, PUT, DELETE) can also be used to route requests._

- _In a real-world application, a web framework like Express is often used to handle routing and other functionality._

Code with added comments:

```js
const http = require("http");

const server = http.createServer((req, res) => {
  // Check requested URL and respond accordingly
  if (req.url === "/") {
    // Home page
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
  } else if (req.url === "/about") {
    // About page
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");
  } else if (req.url === "/api") {
    // JSON data
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = { firstName: "Bruce", lastName: "Vain" };
    res.end(JSON.stringify(data));
  } else {
    // Page not found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

## Web Framework

- Path Module: Provides utilities for working with file and directory paths.

` Code example: const path = require('path');`

- Callback pattern: A pattern for handling asynchronous operations in Node.js.

Code example:

```js
fs.readFile("/path/to/file", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

- Events Module: A module for working with events in Node.js.
  Code example

```
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

- Streams and Buffers: Concepts related to handling large amounts of data in Node.js.
  Code example (stream):

```js
const fs = require("fs");
const readStream = fs.createReadStream("file.txt");
readStream.on("data", (chunk) => {
  console.log(chunk);
});
```

- Code example (buffer): `const buf = Buffer.from('hello world', 'utf8');`

- Asynchronous JavaScript: Concepts related to handling asynchronous operations in JavaScript.
  Code example (Promise)

```js
function myFunction() {
  return new Promise((resolve, reject) => {
    // do some asynchronous operation
    if (operationSuccessful) {
      resolve("success");
    } else {
      reject("error");
    }
  });
}
```

- FS Module: A module for working with the file system in Node.js.

Code example: `const fs = require('fs');`

- HTTP Module: A module for creating servers and handling HTTP requests in Node.js.

Code example:

```js
const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello World!");
});
server.listen(3000);
```

### Additional details:

- _Web frameworks such as Express, Nest, Happy, COA, and Sails can make it easier to create more complex servers and handle requests in Node.js._

- _The upcoming series will focus on learning about Express, a popular Node.js framework._

- _In the next section, we will take a closer look at Node.js under the hood._
