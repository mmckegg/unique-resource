unique-resource
===

Get a short, unique key for a given file path based on the content of the file or its path.

Key is compatible with CSS classes and URLs. The file's basename is included in the key to make debugging easier (both in dev and production).

## API

```js
var getKey = require('unique-resource')
getKey('./styles/page.css', {root: __dirname}) // => "C4L8HPDX-page"
```

### getKey(path, options={})

Specify the `path` of the file to get a unique key for.

`options`: 
  - `root`: resolve relative paths based on this directory
  - `hashPath`: when `true`, don't read the content of the file, instead just hash the full resolved path.
  - `cache`: Defaults to `true`. Specify `false` to ignore previously cached file hashes, or pass in an object to use as a custom cache.

## License

MIT