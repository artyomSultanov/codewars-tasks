// https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1
function snail(matrix) {
  if (!matrix.length || !matrix[0].length) return []
  const result = []

  while (matrix.length) {
    if (matrix[0].length === 1) {
      result.push(matrix[0].pop())
      break
    }
    result.push(...matrix.shift())
    result.push(...matrix.reduce((acc, arr) => acc.concat(arr.pop()), []))
    result.push(...matrix.pop().reverse())
    result.push(...matrix.reduce((acc, arr) => acc.concat(arr.shift()), []).reverse())
  }

  return result
}

// console.log(snail([[1, 2, 3], 
//                   [4, 5, 6],
//                   [7, 8, 9]]))
// console.log(snail([[1, 2], [3, 4]]));
// console.log(snail([[]]))
// console.log(snail([[1, 2, 3, 4, 5, 6], 
//                    [20, 21, 22, 23, 24, 7], 
//                    [19, 32, 33, 34, 25, 8],
//                    [18, 31, 36, 35, 26, 9], 
//                    [17, 30, 29, 28, 27, 10], 
//                    [16, 15, 14, 13, 12, 11]]))

// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5
function parseInt(string) {
  const firstNums = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen']
  const decimals = [,, 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
  const grading = new Map([['hundred', 2], ['thousand', 3], ['million', 6], ['billion', 9]])

  const str2num = (str) => {
    if (firstNums.includes(str))
      return firstNums.indexOf(str)
    if (decimals.includes(str))
      return decimals.indexOf(str) * 10
    if (str.includes('-'))
      return decimals.indexOf(str.split('-')[0]) * 10 + firstNums.indexOf(str.split('-')[1])
    return 0
  }
  let result = 0
  string
    .split(' ')
    .forEach((word, index, words) => {
      if (grading.has(word)) {
        const curGrading = grading.get(word) 
        
        let prevGrading
        let prevNum
        if (index > 1) {
          grading.has(words[index-1]) ? prevGrading = grading.get(words[index-1]) + 1 : prevNum = str2num(words[index-1])
          grading.has(words[index-2]) ? prevGrading = grading.get(words[index-2]) + 1 : prevNum = str2num(words[index-2])
        }
        
        result = prevGrading > curGrading
          ? result - prevNum + prevNum * (10 ** curGrading) 
          : result * (10 ** curGrading)
      } 
      decimals.includes(word)
        ? result = result * 100 + str2num(word)
        : result += str2num(word)
    })
  return result
}
// console.log(parseInt('nine hundred twenty-two thousand four hundred thirteen'))

// https://www.codewars.com/kata/5324945e2ece5e1f32000370
function sumStrings(a, b) {
  [a, b] = [a.split(''), b.split('')]
  let result = ''
  let temp = 0
  while(a.length || b.length || temp) {
    temp += (+a.pop() || 0) + (+b.pop() || 0)
    result = temp % 10 + result
    temp = temp >= 10
  }
  return result.replace(/^0+/, '')
}

// console.log(sumStrings('000999', '1'))
// console.log(sumStrings1('123', '1'))

// https://www.codewars.com/kata/52742f58faf5485cae000b9a
function formatDuration (secondsLeft) {
  if (secondsLeft === 0) return 'now' 
  const 
    minuteLimit = 60, 
    hourLimit = 3600, 
    dayLimit = 86400, 
    yearLimit = 31536000,
    year = Math.floor(secondsLeft / yearLimit) || '',
    day = Math.floor(secondsLeft % yearLimit / dayLimit) || '',
    hour = Math.floor(secondsLeft % yearLimit % dayLimit / hourLimit) || '',
    minute = Math.floor(secondsLeft % yearLimit % dayLimit % hourLimit / minuteLimit) || '',
    second = secondsLeft % minuteLimit || ''

  const times = { year, day, hour, minute, second }
  const res = Object.keys(times).reduce((acc, key) => times[key] ? acc.concat(`${times[key]} ${key}${times[key] === 1 ? '' : 's'}`) : acc, [])
  return res.length > 1 ? res.slice(0, -1).join(', ') + ' and ' + res.slice(-1) : res.join(', ')
}
// console.log(formatDuration(1))
// console.log(formatDuration(62))
// console.log(formatDuration(120))
// console.log(formatDuration(3600))
// console.log(formatDuration(20000))

// https://www.codewars.com/kata/52b7ed099cdc285c300001cd
// Need refactoring!!!
const takeCoveredIntervals = (interval, covered) => {
  let res = false
  if (interval[0] > covered[1] || interval[1] < covered[0]) res = false
  if (interval[0] <= covered[0] && interval[1] >= covered[1]) res = interval
  if (interval[0] >= covered[0] && interval[1] <= covered[1]) res = covered
  if (interval[0] <= covered[0] && interval[1] <= covered[1] && interval[1] >= covered[0]) res = [interval[0], covered[1]]
  if (interval[0] >= covered[0] && interval[1] >= covered[1] && interval[0] <= covered[1]) res = [covered[0], interval[1]]
  return res
}
function sumIntervals(intervals) {
  let coveredIntervals = [intervals[0]]
  let curIntervals = intervals
  let res = 0
  let isCovered = true
  while (isCovered) {
    isCovered = false
    for (let i = 1; i < curIntervals.length; i++) {
      let newCovered = false
      for (let j = 0; j < coveredIntervals.length; j++) {
        newCovered = takeCoveredIntervals(curIntervals[i], coveredIntervals[j])
        if (newCovered) {
          isCovered = true
          coveredIntervals[j] = newCovered
          break
        }
      }
      if (!newCovered) coveredIntervals.push(curIntervals[i])
    }
    curIntervals = coveredIntervals
    coveredIntervals = [coveredIntervals[0]]
  }
  for (let i = 0; i < curIntervals.length; i++) {
    res += curIntervals[i][1] - curIntervals[i][0]
  }
  return res
}
// console.log(sumIntervals([ [ 11, 15 ], [ 6, 10 ], [ 1, 2 ], [3, 8] ]))

// https://www.codewars.com/kata/52a382ee44408cea2500074c
function determinant(m) {
  const det3x3Mat = mat => {
    return mat[0][0] * mat[1][1] * mat[2][2] +
           mat[0][1] * mat[1][2] * mat[2][0] +
           mat[1][0] * mat[2][1] * mat[0][2] -
           mat[0][2] * mat[1][1] * mat[2][0] -
           mat[0][1] * mat[1][0] * mat[2][2] -
           mat[0][0] * mat[1][2] * mat[2][1]
  }
  const getMinor = (mat, x, y) => {
    let minor = []
    for (let i = 0; i < mat.length; i++) {
      if (i === x) continue
      let row = []
      for (let j = 0; j < mat[i].length; j++) {
        if (j === y) continue
        row.push(mat[i][j])
      }
      minor.push(row)
    }
    return minor
  }
  const calcDet = mat => {
    let res = 0
    if (mat.length === 1) return mat[0][0]
    if (mat.length === 2) return mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0]
    if (mat.length === 3) return det3x3Mat(mat)
    for (let i = 0; i < mat.length; i++) {
      res += mat[0][i] * (-1)**(i) * calcDet(getMinor(mat, 0, i))
    }
    return res
  }
  return calcDet(m)
}
// console.log(determinant([[-1, -4, 0, 0, -2], [0, 1, 1, 5, 4], [3, 1, 7, 1, 0], [0, 0, 2, 0, -3], [-1, 0, 4, 2, 2]]))

class myBigInt {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  plus() {
    let sumOneLengthStrings = (a, b) => {
      let res =''
      let keepInMind = 0
      for (let i = a.length - 1; i > -1; i--) {
        if ((+a[i] + +b[i] + keepInMind) >= 10) {
          res = ((+a[i] + +b[i] + keepInMind) % 10) + res
          keepInMind = 1
        } else {
          res = (+a[i] + +b[i] + keepInMind) + res
          keepInMind = 0
        }
      }
      return (keepInMind === 0) ? res : keepInMind + res
    }
    a = this.x
    b = this.y
    if (a === '') a = '0'
    if (b === '') b = '0'
    a = a.replace(/0*/, '')
    b = b.replace(/0*/, '')
    if (a.length === b.length) return sumOneLengthStrings(a, b)
    let head = ''
    sumOneLength = ''
    if (a.length > b.length) {
      head = a.slice(0, a.length - b.length)
      sumOneLength = sumOneLengthStrings(a.slice(a.length - b.length, a.length), b)
    } else {
      head = b.slice(0, b.length - a.length)
      sumOneLength = sumOneLengthStrings(a, b.slice(b.length - a.length, b.length))
    }
    if (head.length >= 2) {
      return head.slice(0, -2) + sumOneLengthStrings(head.slice(-2, head.length), '0' + sumOneLength[0]) + sumOneLength.slice(1, sumOneLength.length)
    } else {
      if ((head + sumOneLength).length > Math.max(a.length, b.length)) {
        return sumOneLengthStrings(head, sumOneLength[0]) + sumOneLength.slice(1, sumOneLength.length)  
      } else {
        return head + sumOneLength
      }
    }
  }
  multiply() {
    let a = this.x.split('')
    let b = this.y.split('')
  }
}
function factorial(n){
  let prodTree = (l, r) => {
    if (l > r) return 1n
    if (l === r) return BigInt(r)
    if (r - l === 1) return BigInt(r * l)
    let m = ((l + r) - (l + r) % 2) / 2
    return prodTree(l, m) * prodTree(m + 1, r)
  };
  if (n < 0) return 0n
  if (n === 0) return 1n
  if (n === 1 || n === 2) return BigInt(n)
  return prodTree(2, n)
}
// NOT COMPLETED
// console.log(factorial(10))

// https://www.codewars.com/kata/55983863da40caa2c900004e
function nextBigger(n){
  if (n < 10) return -1
  if (n < 100) {
    return (n % 10 > (n - n % 10) / 10) ? (n % 10) * 10 + ((n - n % 10) / 10) : -1
  }
  let lstNum = String(n).split('')
  let indNumToChange = null
  for (let i = lstNum.length - 1; i > 0; i--) {
    if (lstNum[i - 1] < lstNum[i]) {
      indNumToChange = i - 1 
      break
    }
  }
  let indsNumBigger = []
  for (let i = lstNum.length - 1; i > indNumToChange; i--) {
    if (lstNum[i] > lstNum[indNumToChange]) indsNumBigger.push(i)
  }
  let minNumInd = indsNumBigger[0]
  for (let i = 1; i < indsNumBigger.length; i++) {
    if (lstNum[minNumInd] > lstNum[indsNumBigger[i]]) minNumInd = indsNumBigger[i] 
  }
  return Number(lstNum.slice(0, indNumToChange).join('') + lstNum[minNumInd] + lstNum.filter((_, ind) => ind !== minNumInd && ind >= indNumToChange).sort().join('')) || -1
}
// console.log(nextBigger(999855331))

// https://www.codewars.com/kata/549ee8b47111a81214000941
function getRightMoves(x, y, field) {
  let result = []
  const isInTheField = (x, y) => x < 8 && x >= 0 && y < 8 && y >= 0
  if (isInTheField(x + 2, y + 1)) result.push(field[x + 2][y + 1])
  if (isInTheField(x - 2, y + 1)) result.push(field[x - 2][y + 1])
  if (isInTheField(x + 2, y - 1)) result.push(field[x + 2][y - 1])
  if (isInTheField(x - 2, y - 1)) result.push(field[x - 2][y - 1])
  if (isInTheField(x + 1, y + 2)) result.push(field[x + 1][y + 2])
  if (isInTheField(x - 1, y + 2)) result.push(field[x - 1][y + 2])
  if (isInTheField(x + 1, y - 2)) result.push(field[x + 1][y - 2])
  if (isInTheField(x - 1, y - 2)) result.push(field[x - 1][y - 2])
  return result
}
function findMovesOfHorse(start) {
  const field = makeChessField()
  const [x, y] = [field.findIndex(el => el.includes(start)), 
                field.filter(el => el.includes(start))[0].findIndex(el => el === start)]
  return getRightMoves(x, y, field)
}
function makeChessField() {
  const chessField = []
  for (let i = 8; i > 0; i--) {
    chessField.push([])
    for (let j = 1; j < 9; j++) {
      chessField[8 - i].push(String.fromCharCode(96 + j) + i)
    }
  }
  return chessField
}
function traverseBFS(queue, passed, finish) {
  if (queue.length === 0) return
  let [pos, wave] = queue.shift()
  if (pos === finish) return wave
  if (passed.includes(pos)) return traverseBFS(queue, passed, finish)
  wave++
  passed.push(pos)
  const nextMoves = findMovesOfHorse(pos).map(el => [el, wave])
  return traverseBFS([...queue, ...nextMoves], passed, finish)
}
function knight(start, finish) {
  // Ha-ha, it's not "knight", it's a horse :D
  const nextMoves = findMovesOfHorse(start).map(el => [el, 1])
  return traverseBFS(nextMoves, [], finish)
}
// console.log(knight('a3', 'g2'))

// https://www.codewars.com/kata/51b66044bce5799a7f000003
class RomanNumerals {
  static dict = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000]
  ]);
  static toRoman(notRomanNumber) {
    let romanNum = ''
    const getInRoman = num => {
      if (num === 0) return ''
      if (num < 4) return 'I'.repeat(num)
      let lastKey = 'I'
      
      for (const [key, value] of this.dict) {
        if (value === num) return key
        if (value > num) {
          for (const [k, v] of this.dict) {
            if (value - this.dict.get(lastKey) - v <= num - this.dict.get(lastKey) && value - this.dict.get(lastKey) - v > 0) {
              return getInRoman(value - num) + key
            }
          }
          return lastKey + getInRoman(num - this.dict.get(lastKey))  
        }
        lastKey = key
      }
      return lastKey.repeat(+String(num)[0])
    };
    let strNum = String(notRomanNumber)
    for (let i = 0; i < strNum.length; i++) {
      romanNum += getInRoman(strNum[i] + '0'.repeat(strNum.length - i - 1))
    }
    return romanNum
  }
  static fromRoman(str) {
    const getNumber = arr => {
      if (arr.length === 0) return 0
      if (arr.length === 1) return this.dict.get(arr[0])
      let result = 0
      let flag = true
      let last = arr[arr.length - 1]
      while (arr.length !== 0) {
        if (arr.length === 1) {
          if (this.dict.get(arr[0]) >= this.dict.get(last)) {
            result = result + this.dict.get(arr[0])
          } else {
            result = result - this.dict.get(arr[0])
          }
          break
        }
        last = arr.pop()
        for (const [key, value] of this.dict) {
          if (key === last) {
            result = (flag ? result + value : result - value)
            flag = this.dict.get(last) <= this.dict.get(arr[arr.length - 1])
          }
        }
      }
      return result
    };
    return getNumber(str.split(''))
  }
}
// console.log(RomanNumerals.fromRoman('XXI'))
// console.log(RomanNumerals.fromRoman('IV'))
// console.log(RomanNumerals.fromRoman('MCDLIII')) // 1453
// console.log(RomanNumerals.toRoman(962)) // CMLXII
// console.log(RomanNumerals.toRoman(1990)) // MCMXC
// console.log(RomanNumerals.toRoman(841)) // DCCCXLI