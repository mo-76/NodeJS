// step1: import a http module
const http = require('node:http');

// step2: invoke the create server method on the module
// arg: callback fun.
// callback receives two arguments  request, response
const server = http.createServer((req, res) => {
  // on the response object we first invoke the right head method 
  // we specify an arg. which is the HTTP status code this will be 200 for successful response
  res.writeHead(200);

  //end the response with some text, invoke the end method on the response 
  res.end("Hello World!");

  // we have written code to respond to any incomming request
});

// HTTP module extends the event emitter class
// callback function is a request listener, whenever a request reaches the server this callback function is executed
// the request arg. contains information about the incoming request
// the second arg. is the server response and we use it to build the response that has to be sent back to the client
// node handle the incoming request and we have to write code to send back the response

// we must also inform our server to listen to any incoming request 
// we store the server created using the create server method in a constant
// arg. in listen is port number
server.listen(3000);
// port nubmer as a door number in an apartment with many houses 
// on a machine there can by many other servers but are NodeJS server runs on port 3000




