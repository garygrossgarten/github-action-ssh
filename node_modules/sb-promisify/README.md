# Promisify

A node module to help you convert callback-style functions to promises

## Installation

```js
npm install --save sb-promisify
```

## API

```js
function promisifyAll(object, throwError = true): Object
function promisify(callback, throwError = true): Function

export default promisify
export { promisify, promisifyAll }
```

## Example Usage

```js
import fs from 'fs'
import promisify from 'sb-promisify'

const readFile = promisify(fs.readFile)

readFile('/etc/passwd', 'utf8').then(function(contents) {
  console.log(contents)
}, function() {
  console.error('Unable to read file')
})
```
```js
import fs from 'fs'
import { promisifyAll } from 'sb-promisify'

const promisedFS = promisifyAll(fs)

promisedFS.readFileAsync('/etc/passwd', 'utf8').then(function(contents) {
  console.log(contents)
})
promisedFS.readFile('/etc/passwd', 'utf8', function(contents) {
  console.log(contents)
})
```

If you set throwError to false, here's how it would react

```js
'use babel'

import fs from 'fs'
import promisify from 'sb-promisify'

const access = promisify(fs.access, false)
const readFile = promisify(fs.readFile, false)

readFile('/etc/passwd').then(function(contents) {
  if (contents === false) {
    console.error('Unable to read file')
  } else {
    console.log(contents.toString('utf8'))
  }
})

access('/etc/passwd').then(function(access) {
  console.log('access', access) // true or false
})
```

## License
This module is licensed under the terms of MIT License. Check the LICENSE file for more info.
