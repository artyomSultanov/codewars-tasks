// https://www.codewars.com/kata/513e08acc600c94f01000001
const toHex = d => {
  if (d > 255) d = 255
  if (d < 0) d = 0
  const hex = d.toString(16).toUpperCase()
  return hex.length < 2 
        ? '0' + hex 
        : hex
}
function rgb(r, g, b){
    return toHex(r) + toHex(g) + toHex(b)
}
// console.log(rgb(150, 5, 238))

// https://www.codewars.com/kata/52e1476c8147a7547a000811
function validate(password) {
  return (password.length > 6      &&
        /\d+/      .test(password) && 
        /[A-Z]+/   .test(password) && 
        /[a-z]+/   .test(password) && 
        !/\W+/     .test(password));
}
// console.log(validate('dj3855I'))

// https://www.codewars.com/kata/54a91a4883a7de5d7800009c
function incrementString (string) {
  const matchedStr = string.match(/([1-9])/g)
  if (string.at(-1) === '0') return string.slice(0, string.length - 1) + 1
  if (!matchedStr) return string + '1'
  const newMatchedStr = String(+matchedStr.join('') + 1)
  const withZero = string.match(/[0-9]/g).join('')
  return withZero[0] === '0'
    ? string.slice(0, -newMatchedStr.length) + newMatchedStr
    : string.slice(0, -matchedStr.join('').length) + newMatchedStr
}
// console.log(incrementString('foo00999'))


// https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39
const zero = (func) => !func ? 0 : func(0)
const one = (func) => !func ? 1 : func(1)
const two = (func) => !func ? 2 : func(2) 
const three = (func) => !func ? 3 : func(3)
const four = (func) => !func ? 4 : func(4)
const five = (func) => !func ? 5 : func(5)
const six = (func) => !func ? 6 : func(6)
const seven = (func) => !func ? 7 : func(7)
const eight = (func) => !func ? 8 : func(8)
const nine = (func) => !func ? 9 : func(9)

const plus = (arg) => (next) => next + arg
const minus = (arg) => (next) => next - arg
const times = (arg) => (next) => next * arg
const dividedBy = (arg) => (next) => Math.floor(next / arg)
// console.log(seven(times(five())))

// https://www.codewars.com/kata/530e15517bc88ac656000716
function rot13 (message) {
  return message
    .split('')
    .map((char) => {
      const caseChar = char === char.toUpperCase() ? 65 : 97
      return !~char.search(/[A-Za-z]/) ? char : String.fromCharCode(((char.charCodeAt(0) + 13) - caseChar) % 26 + caseChar)
    })
    .join('')
}
// console.log(rot13('Rest & piece'))

// https://www.codewars.com/kata/52774a314c2333f0a7000688
function validParentheses(parens) {
  let counter = 0
  for (const p of parens) {
    if (p === '(') counter++
    if (p === ')') counter--
    if (counter < 0) return false
  }
  return counter === 0 
}
// console.log(validParentheses(('())(()')))
// console.log(validParentheses(('()()')))

// https://www.codewars.com/kata/54521e9ec8e60bc4de000d6c
function maxSequence (arr) {
  let maxSum = Number.MIN_SAFE_INTEGER
  for (let i = arr.length; i > 0; i--) {
    arr.forEach((elem, index) => {
      const subSum = arr.slice(index, index + i).reduce((acc, el) => acc + el, 0)
      if (subSum > maxSum) maxSum = subSum
    })
  }
  return maxSum < 0 ? 0 : maxSum
}
// console.log(maxSequence([7, 4, 11, -11, 39, 36, 10, -6, 37, -10, -32, 44, -26, -34, 43, 43])) // 155