var readFileSync = require('fs').readFileSync
var createHash = require('crypto').createHash
var getBaseName = require('path').basename
var getExt = require('path').extname
var resolve = require('path').resolve
var globalCache = {}

module.exports = function getResourceKey(path, options){
  options = options || {}

  var cache = globalCache
  if (options.cache instanceof Object){
    cache = options.cache
  } else if (options.cache === false){
    cache = {}
  }

  if (options.root){
    path = resolve(options.root, path)
  }


  if (options.hashPath){
    return getHash(path.toLowerCase()) + '-' + getName(path)
  } else {

    if (!cache[path]){
      cache[path] = getKey(path)
    }

    return cache[path]
  }
}

function getKey(path){
  var name = getName(path)
  try {
    var content = readFileSync(path)
    var hash = getHash(content)
    return hash + '-' + name
  } catch (ex) {
    return 'MISSING-' + name
  }
}

function getName(path){
  return getBaseName(path, getExt(path))
}

function getHash(content){
  // just using this to deternimistically create a "random" number.
  // combined with the original file name, and regidness of formats like css,
  // this should be unique enoygh.
  // but I'm sure there's a better hash method we could use
  return createHash('sha1').update(content).digest('base64').replace(/[^a-z0-9]/i, '').slice(0,8).toUpperCase()
}