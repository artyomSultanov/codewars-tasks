// https://www.codewars.com/kata/546f922b54af40e1e90001da
function alphabetPosition(text) {
  return text
    .replace(/\W|_|[0-9]/g, '')
    .replace(/([a-z]|[A-Z])/g, w => w.toLowerCase().charCodeAt(0) - 96 + ' ')
    .slice(0, -1)
}
// console.log(alphabetPosition("_The sunset sets at twelve o' clock."))

// https://www.codewars.com/kata/54b42f9314d9229fd6000d9c
function duplicateEncode(word){
  word = word.toLowerCase()
  return word.replace(/./g, w => word.indexOf(w) == word.lastIndexOf(w) ? '(' : ')')
}
// console.log(duplicateEncode("Success"))

// https://www.codewars.com/kata/54da5a58ea159efa38000836
function findOdd(A) {
  return A.find(elem => A.filter(e => elem === e).length % 2 === 1)
}
// console.log(findOdd([1, 2, 1, 2, 2]))

// https://www.codewars.com/kata/556deca17c58da83c00002db
const sum = arr => arr.reduce((prev, item) => prev + item)
function tribonacci(signature,n) {
  if (n === 0) return []
  for (let i = 0; i < n - 3; i++) {
    signature.push(sum(signature.slice(-3)))
  }
  return signature.slice(0, n)
}
// console.log(tribonacci([1, 1, 1], 7))

// https://www.codewars.com/kata/5208f99aee097e6552000148
function breakCamelCase(string) {
  return string
        .split('')
        .reduce((prev, elem) => elem === elem.toUpperCase() 
                              ? prev + ' ' + elem
                              : prev + elem)
}
// console.log(breakCamelCase("camelCase"))

// https://www.codewars.com/kata/5287e858c6b5a9678200083c
function narcissistic(value) {
  const digits = String(value).split('')
  let k = 0
  while (true) {
    const sum = digits.reduce((prev, item) => +prev + (+item)**k, 0)
    if (sum > value) return false
    if (sum === value) return true
    k++
  }
}
// console.log(narcissistic(371))

// https://www.codewars.com/kata/545cedaa9943f7fe7b000048
function isPangram(string){
  if (string.length < 26) return false
  let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  string
    .toUpperCase()
    .split('')
    .forEach(el => {
      if (alphabet.includes(el))
        alphabet = alphabet.replace(el, '')
    })
  return alphabet === ''
}
// console.log(isPangram('The quick brown fox jumps over the lazy dog'))

// https://www.codewars.com/kata/554ca54ffa7d91b236000023
function deleteNth(arr,n){
  return arr.reduce((prev, item) => prev.filter(e => e === item).length < n 
                          ? [...prev, item]
                          : prev, [])
}
// console.log(deleteNth([1, 2, 3, 1, 1, 4, 2, 3, 2], 2))

// https://www.codewars.com/kata/514b92a657cdc65150000006
function sumOfAllMultipliesFor2Nums(number){
  let result = 0
  for (let i = 1; i < number; i++) {
    if (i % 5 === 0 || i % 3 === 0)
      result += i
  }
  return result
}
// console.log(sumOfAllMultipliesFor2Nums(10))