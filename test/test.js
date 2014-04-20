var test = require('tape')
var getResourceKey = require('../')

test('hash based on content', function(t){
  var keys = {
    'comment': getResourceKey('./resources/comment.css', {root: __dirname}),
    'another-comment': getResourceKey('./resources/sub/comment.css', {root: __dirname}),
    'object': getResourceKey('./resources/object.css', {root: __dirname}),
    'page': getResourceKey('./resources/page.css', {root: __dirname}),
    'same-as-comment': getResourceKey('./resources/same-as-comment.css', {root: __dirname})
  }

  t.ok(keys['comment'] !== keys['another-comment'], 'keys should be unique')
  t.ok(keys['comment'].slice(0, 8) === keys['same-as-comment'].slice(0, 8), 'same content has same hash')

  var expected = { 
    'another-comment': 'MZGAFVEBZS-comment', 
    'comment': 'M2L6G1WQRT-comment', 
    'object': 'ZHJSUQVXYF-object', 
    'page': 'C4L8HPDXPJ-page', 
    'same-as-comment': 'M2L6G1WQRT-same-as-comment' 
  }

  t.deepEqual(keys, expected)
  t.end()
})

test('hash based on path', function(t){
  var keys = {
    'comment': getResourceKey('./resources/comment.css', {root: __dirname, hashPath: true}),
    'another-comment': getResourceKey('./resources/sub/comment.css', {root: __dirname, hashPath: true}),
    'object': getResourceKey('./resources/object.css', {root: __dirname, hashPath: true}),
    'page': getResourceKey('./resources/page.css', {root: __dirname, hashPath: true}),
    'same-as-comment': getResourceKey('./resources/same-as-comment.css', {root: __dirname, hashPath: true})
  }

  t.ok(keys['comment'] !== keys['another-comment'], 'keys should be unique')
  t.ok(keys['comment'].slice(0, 10) !== keys['same-as-comment'].slice(0, 10), 'hash based on path')

  var expected = { 
    'another-comment': 'Z8SC6ILVFO-comment', 
    'comment': 'CNA3GYGMWK-comment', 
    'object': 'HOVZ2EPQPR-object', 
    'page': 'UHDUPYCCK6-page', 
    'same-as-comment': 'OOCGOLNYVS-same-as-comment' }

  t.deepEqual(keys, expected)
  t.end()
})