const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')
const babel_core = require('babel-core')
const { EventEmitter } = require('events')


module.exports = (src, dest, options) => {
  src = path.resolve(src)
  dest = path.resolve(dest)

  function t (file) {
    return transform(file, src, dest, options)
  }

  return globby('**/*.js', {
    cwd: src
  })
  .then((files) => {
    return Promise.all(files.map(t))
  })
}


async function transform (file, src, dest, {babel, onFile} = {}) {
  const filepath = path.join(src, file)
  const content = await fs.readFile(filepath)
  const destpath = path.join(dest, file)

  const {
    code
  } = babel
    ? babel_core.transform(content.toString(), babel)
    : babel_core.transform(content.toString())


  return fs.outputFile(destpath, code).then(() => {
    onFile && onFile(file)
  })
}
