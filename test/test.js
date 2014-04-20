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
    'comment': '8M2L6G1W-comment',
    'another-comment': 'MZGAFVEB-comment',
    'object': '8ZHJSUQV-object',
    'page': 'C4L8HPDX-page',
    'same-as-comment': '8M2L6G1W-same-as-comment'
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
  t.ok(keys['comment'].slice(0, 8) !== keys['same-as-comment'].slice(0, 8), 'hash based on path')

  var expected = { 
    'comment': 'CNA3GYGM-comment',
    'another-comment': 'Z8SC6ILV-comment',
    'object': 'HOVZ2EPQ-object',
    'page': '017UHDUP-page',
    'same-as-comment': 'OOCGOLNY-same-as-comment'
  }

  t.deepEqual(keys, expected)
  t.end()
})