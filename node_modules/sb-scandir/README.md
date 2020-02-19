# ScanDir

[![Greenkeeper badge](https://badges.greenkeeper.io/steelbrain/scandir.svg)](https://greenkeeper.io/)

`sb-scandir` is a node module that supports simple file scanning with some sugar features.

## Installation

```
npm install --save sb-scandir
```

## API

```js
export default function scandir(path: string, recursive: boolean, validate: ((file: string) => boolean)): Promise<{ files: Array<string>, directories: Array<string> }>
```

## Examples

```js
import Path from 'path'
import scandir from 'sb-scandir'

// Scan all files except the dot ones
scandir(__dirname).then(function(result) {
  console.log('files', result.files)
  console.log('directories', result.directories)
})

// Scan all top level files except dot ones
scandir(__dirname, false).then(function(files) {
  console.log('files', result.files)
  console.log('directories', result.directories)
})

// Scan all files even the dot ones
scandir(__dirname, true, function(path) {
  return true
}).then(function(files) {
  console.log('files', result.files)
  console.log('directories', result.directories)
})

// Scan all files except in .git and node_modules
scandir(__dirname, true, function(path) {
  const baseName = Path.basename(path)
  return baseName !== '.git' && baseName !== 'node_modules'
}).then(function(files) {
  console.log('files', result.files)
  console.log('directories', result.directories)
})
```

## License

This project is licensed under the terms of MIT License. See the LICENSE file for more info.
