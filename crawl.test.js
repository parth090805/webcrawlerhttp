const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
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

test('getURLsFromHTML absolute', () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href = "https://blog.boot.dev/path/">
      BOOT.dev Blog
      </a>
  </body>
</html>
`
const inputBaseUrl = "https://blog.boot.dev/path/"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href = "/path/">
      BOOT.dev Blog
      </a>
  </body>
</html>
`
  const inputBaseUrl = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML both', () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href = "https://blog.boot.dev/path1/">
      BOOT.dev Blog path One
      </a>
      <a href = "/path2/">
      Boot.dev Blog path Two
      </a>
  </body>
</html>
`
  const inputBaseUrl = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = ["https://blog.boot.dev/path1/","https://blog.boot.dev/path2/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
  const inputHTMLBody = `
<html>
  <body>
      <a href = "invalid">
      invalid URL
      </a>
  </body>
</html>
`
  const inputBaseUrl = "https://blog.boot.dev"
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseUrl)
  const expected = []
  expect(actual).toEqual(expected)
})
