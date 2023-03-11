const http = require("http");
const fs = require("fs");
http.createServer()
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write(`
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <form action="/massege" method="post">
          <input type="text" name="massege" />
          <button type="submit">sumbits</button>
        </form>
      </body>
      </html>
    `);
    return res.end();
  }
  if (req.url === "/massege") {
    const buffer = [];
    req.on('data', (chunk) => {
      buffer.push(chunk);
    })
    req.on('end', () => {
      const paredBody = Buffer.concat(buffer).toString();
      fs.writeFileSync('massege.txt', paredBody.split("=")[1]);
      res.write(`
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <h1> sdf ${paredBody.split("=")[1]} </h1>
        <h1> ${paredBody.split("=")[1]} </h1>
        <p>mohammed</p>
      </body>
      </html>
        
      `);
      res.statusCode = 302;
      res.setHeader('location', '/');
      return res.end();
    })

  }

  res.end();
});
server.listen(300);



