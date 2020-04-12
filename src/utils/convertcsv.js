const fs = require('fs')
const parse = require('csv')
const Xlsx = require('xlsx')
const csv = require('fast-csv')
const file = []
const stream = fs.createReadStream('text.csv')

const streamCsv = csv.parseStream(stream)
//   stream.pipe(streamCsv)
 .on('error', data => console.log(data))
 .on('data', data => file.push(data) )
 .on('end', () => console.log('fim'))

 console.log(file)









// const cas = parse.parse()

// let book = Xlsx.readFile('controle-grh.xlsx')
// const first_sheet = book.SheetNames[0];

// console.log(book.SheetNames[0] )

// const worksheet = book.Sheets[first_sheet]

// console.log("Dois: " + worksheet['D1'].v )

// Xlsx.writeFile(first_sheet, 'out.xlsb');

// fs.createReadStream('./controle-grh.xlsx')
// 	.pipe(parse.parse())
// 	.on('data', (row) => {
// 		console.log(row)

// 	})
// 	.on('end', () => {
// 		console.log('tudo ok!')
// 	})


// fs.readFile(__dirname + '/sobrado.csv', (data) => {
// 	console.log(data)
// })
