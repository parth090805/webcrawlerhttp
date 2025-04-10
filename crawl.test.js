const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')
  
test('normalizeURL strip protocol', () => {
  const input = 'https://blog.bot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.bot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.bot.dev/path/'
  const actual = normalizeURL(input)
  const expected = 'blog.bot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://Blog.bot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.bot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
  const input = 'http://blog.bot.dev/path'
  const actual = normalizeURL(input)
  const expected = 'blog.bot.dev/path'
  expect(actual).toEqual(expected)
})

