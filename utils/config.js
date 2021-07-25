require('dotenv').config()

let PORT = process.env.PORT
let TYPICODE_URL = process.env.TYPICODE_URL

module.exports = {
  PORT,
  TYPICODE_URL,
}