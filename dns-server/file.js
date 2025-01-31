const fs = require('fs')

// fs.writeFileSync("./test.txt"  ,"hey there")

// const result = fs.readFileSync("./contacts.txt" , "utf-8")
// console.log(result)


//  fs.appendFileSync('./test.txt' , new Date().getDate().toLocaleString())
// fs.cpSync("./test.txt" , "./copy.txt")

console.log(fs.statSync("./test.txt"))