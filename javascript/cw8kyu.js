// https://www.codewars.com/kata/5583090cbe83f4fd8c000051
function digitize(n) {
  if (n == []) return [0]
  const arr = []
  while (n) {
    arr.push(n % 10)
    n = (n - n % 10) / 10
  }
  return arr
}
// console.log(digitize(12345));