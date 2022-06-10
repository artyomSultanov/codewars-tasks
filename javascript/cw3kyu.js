'use strict'
// https://www.codewars.com/kata/53d40c1e2f13e331fc000c26
const mult2x2Mat = (A, B) => (
  [
    [A[0][0]*B[0][0] + A[0][1]*B[1][0], A[0][0]*B[0][1] + A[0][1]*B[1][1]], 
    [A[1][0]*B[0][0] + A[1][1]*B[1][0], A[1][0]*B[0][1] + A[1][1]*B[1][1]]
  ]
)
const findPowOf2 = n => {
  return n
    .toString(2)
    .split('')
    .reduce((acc, elem, index, arr) => elem === '1' ? acc.concat(2**(arr.length - 1 - index)) : acc,[])
}
const getMatPower = (M, p, memoPowers) => {
  if (p === 1) return M
  if (memoPowers.has(p)) return memoPowers.get(p)
  let tmp = getMatPower(M, ~~(p / 2), memoPowers)
  let res = mult2x2Mat(tmp, tmp)
  memoPowers.set(p, res)
  return res
}
function fib(n) {
  if (n === 0 || n === 1) return BigInt(n)
  const M = [[1n, 1n], [1n, 0n]]
  let first = 0n
  let second = 1n
  let temp = 0

  if (n > 0) {
    const memoPowers = new Map([[1, M]])
    const matPowers = findPowOf2(n).map((elem) => getMatPower(M, elem, memoPowers))
    let res = matPowers[0]
    for (let i = 1; i < matPowers.length; i++)
      res = mult2x2Mat(res, matPowers[i])
    return res[0][1]
  }

  // easy way for negative numbers
  for (let i = 0; i > n; i--) {
    temp = first
    first = second - first
    second = temp
  }
  return first
}
// console.log(fib(8), fib(-8));
// console.log(fib(20_000_000));
// console.log(fib(-10_000));

// https://www.codewars.com/kata/54cf7f926b85dcc4e2000d9d
function makeHuffmanTree(freqs) {
  let tree = {}
  while (freqs.length !== 1) {
    freqs = freqs.sort((a, b) => b[1] - a[1])
    let right = freqs.pop()
    let left = freqs.pop()
    let [rightName, rightFreq] = Array.isArray(right) ? [right[0], right[1]] : [right.value[0], right.value[1]]
    let [leftName, leftFreq] = Array.isArray(left) ? [left[0], left[1]] : [left.value[0], left.value[1]]
    tree = {value: [leftName + rightName, leftFreq + rightFreq], right, left}
    freqs.push(tree)
  }
  return tree
} 

// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  const freq = {}
  s.split('').forEach(el => freq[el] ? freq[el]++ : freq[el] = 1)
  return Object.entries(freq)
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs,s) {
  console.log(freqs, s)
  if (freqs.every( el => el[1] === 1)) return s
  if (freqs.length === 0 && s === '') return null
  if (freqs.lenght === 0 || !Array.isArray(freqs[0])) return null
  if (freqs.length < 2 && Array.isArray(freqs[0])) return null
  if (freqs.length < 2 && s === '') return ''
  const huffmanTree = Array.isArray(freqs[0]) ? makeHuffmanTree(freqs) : freqs
  let result = ''
  for (let i = 0; i < s.length; i++) {
    let dict = {}
    const makeCodeInTree = (sym, tree, code) => {
      if (sym in dict) return dict[sym]
      if (tree.value === sym) return code
      if (!Array.isArray(tree.left)) {
        code += '0'
        return makeCodeInTree(sym, tree.left, code)
      }
      if (tree.left['value'] === sym || tree.left[0] === sym) return code + '0'
      if (!Array.isArray(tree.right)) {
        code += '1'
        return makeCodeInTree(sym, tree.right, code)
      }
      if (tree.right['value'] === sym || tree.right[0] === sym) return code + '1'
    };
    let code = makeCodeInTree(s[i], huffmanTree, '')
    if (!(s[i] in dict)) dict[s[i]] = code
    result += code
  }
  return result
}

// console.log(encode(frequencies('aaaabcc'), 'aaaabcc'))

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs,bits) {
  console.log('in decode', freqs, bits)
  if (freqs.length === 0 && bits === '') return null
  if (freqs.length === 0) return null 
  if (freqs.length < 2 && Array.isArray(freqs[0])) return null
  if (freqs.length < 2 && bits === '') return ''
  const huffmanTree = Array.isArray(freqs[0]) ? makeHuffmanTree(freqs) : freqs[0]
  let result = ''
  for (let i = 0; i < bits.length; i++) {
    const makeStringInTree = (bit, tree) => {
      if (bit === '0' && Array.isArray(tree.left) && tree.left[0].length === 1) return tree.left[0]
      if (bit === '1' && Array.isArray(tree.right) && tree.right[0].length === 1) return tree.right[0]
      if (bit === '0' && !Array.isArray(tree.left)) return makeStringInTree(bits[++i], tree.left)
      if (bit === '1' && !Array.isArray(tree.right)) return makeStringInTree(bits[++i], tree.right)
    };
    let sym = makeStringInTree(bits[i], huffmanTree)
    result += sym
  }
  return result
}
// console.log(decode([{
//   value: [ '79Z_', 4 ],
//   right: { value: ['9Z_', 3], right: {value: ['Z_', 2], right: ['_', 1], left: ['Z', 1]}, left: ['9', 1] },
//   left: [ '7', 1 ]
// }], '110111100'));
// console.log(decode(frequencies('aaaabbbccd'), '0000101010110110111'))
