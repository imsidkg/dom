const http = require('http')
const url = require('url')
const fs = require('fs');
const { error } = require('console');
const myServer = http.createServer((req, res) => {
   const pathname = req.url;
   if(pathname === '/') {
      fs.appendFile('log.txt', "hahahahha" ,(error ,data) => {
         console.log(data)
         res.end('Home page and log created' )
      })
   }
})


myServer.listen(3000, () => console.log("Server Started"))