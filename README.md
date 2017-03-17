[![Build Status](https://travis-ci.org/kaelzhang/babel-transform-dir.svg?branch=master)](https://travis-ci.org/kaelzhang/babel-transform-dir)
<!-- optional appveyor tst
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/kaelzhang/babel-transform-dir?branch=master&svg=true)](https://ci.appveyor.com/project/kaelzhang/babel-transform-dir)
-->
<!-- optional npm version
[![NPM version](https://badge.fury.io/js/babel-transform-dir.svg)](http://badge.fury.io/js/babel-transform-dir)
-->
<!-- optional npm downloads
[![npm module downloads per month](http://img.shields.io/npm/dm/babel-transform-dir.svg)](https://www.npmjs.org/package/babel-transform-dir)
-->
<!-- optional dependency status
[![Dependency Status](https://david-dm.org/kaelzhang/babel-transform-dir.svg)](https://david-dm.org/kaelzhang/babel-transform-dir)
-->

# babel-transform-dir

Transforms javascript files within a directory by babel, and expose a Promise API.

## Install

```sh
$ npm install babel-transform-dir --save
```

## Usage

```
|-- lib/   # empty
|-- src/
|     |-- a.js
|     |-- b.js
|-- .babelrc
```

```js
const transform = require('babel-transform-dir')

// Transform all javascript files in `./src` and write the result to `./lib`
transform('./src', './lib')
.then(() => {
  console.log('done')
})

// Or explicitly specify babel config
readJson('./.babelrc')
.then((babel_config) => {
  return transform('./src', './lib', {
    babel: babel_config,
    // Invokes whenever a file is transformed and written.
    onFile: (file) => {
      console.log(`src/${file} -> lib/${file}`)
    }
  })
})
.then(() => {
  console.log('done')
})

// src/a.js -> lib/a.js
// src/b.js -> lib/b.js
// done
```

## License

MIT
