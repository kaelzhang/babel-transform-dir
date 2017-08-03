const test = require('ava')
const transform = require('..')
const path = require('path')
const fs = require('fs-extra')

const fixture = (src) => {
  return path.join(__dirname, 'fixtures', src)
}

const expected = (src) => {
  return path.join(__dirname, 'expected', src)
}

function test_files (t) {
  return Promise.all([
    fs.readFile(fixture('lib/a.js')),
    fs.readFile(expected('lib/a.js'))
  ])
  .then(([a, b]) => {
    t.is(a.toString(), b.toString(), 'file content')
  })
}

test('basic', t => {
  return transform(fixture('src'), fixture('lib'), {
    babel: require(fixture('.babelrc.js')),
    onFile: (file) => {
      t.is(!!~['a.js'].indexOf(file), true, 'onFile')
    }
  })
  .then(() => {
    return test_files(t)
  })
})


test('default .babelrc', t => {
  return transform(fixture('src'), fixture('lib'))
  .then(() => {
    return test_files(t)
  })
})
