const fs = require('fs')

const readFile = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readFile(path, opts, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

const statFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.stat(path, (err) => {
      if (err) resolve(false)
      else resolve(true)
    })
  })

const mkDir = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.mkdir(path,{recursive: true}, (err) => {
      if (err) reject(err)
      else resolve()
    })
  })

module.exports = {
  readFile,
  writeFile,
  statFile,
  mkDir
}
