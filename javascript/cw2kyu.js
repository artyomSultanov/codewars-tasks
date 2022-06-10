// https://www.codewars.com/kata/59f7a040a5b820c684000046
class List {
  #list
  constructor(list) {
    this.#list = list
  }
  static get empty () {
    return new List([])
  }
  static fromList(xs) {
    console.log('fromList\t', 'xs: ', xs)
    if (xs.length === 0) return List.empty
    return new List(xs.slice(0))
  }
  static repeat(x) {
    const repeatGen = function*() {
      while (true) {
        yield x
      }
    }
    return new List(repeatGen())
  }
  static iterate(fn, x) {
    const generator = function*() {
      while (true) {
        yield x
        x = fn(x)
      }
    }
    return new List(generator())
  }
  static cycle(xs) {
    const generator = function*() {
      let i = 0
      xs = xs.toList()
      while (true) {
        yield xs[i % xs.length]
        i++
      }
    }
    return new List(generator())
  }
  static replicate(n, x) {
    return this.repeat(x).take(n)
  }
  toList() {
    console.log('toList\t', '#list: ', this.#list)
    let result = []
    try {
      for (let v of this.#list) {
        result.push(v)
      }
      return result
    } catch (_) {
      return [this.#list]
    }
  }
  head() {
    console.log('head\t', '#list: ', this.#list)
    return this.#list[0]
  }
  tail() {
    console.log('tail\t', '#list: ', this.#list)
    return new List(this.#list.slice(1))
  }
  get(index) {
    console.log('get\t', '#list: ', this.#list, 'index: ', index)
    return this.#list[index]
  }
  take(index) {
    // console.log('take\t', '#list: ', this.#list, 'index: ', index)
    const takeGen = function* (generator) {
      let i = -1
      for (let v of generator) {
        i++
        if (i < index) {
          yield v
        } else {
          break
        }
      }
    }
    return new List(takeGen(this.#list))
  }
  drop(index) {
    console.log('drop\t', '#list: ', this.#list, 'index: ', index)
    if (index < 0) return new List(this.#list)
    return new List(this.#list.slice(index, this.#list.length))
  }
  length() {
    return this.#list.length
  }
  nil() {
    return (this.#list.length === 0)
  }
  cons(element) {
    console.log('cons\t', '#list: ', this.#list, 'element: ', element)
    return new List([element, ...this.#list])
  }
  append(list) {
    console.log('append\t', '#list: ', this.#list, 'list: ', list)
    return new List([...this.#list, ...list.toList()])
  }
  slice(startIndex = 0, endIndex = this.#list.length) {
    console.log('slice\t', '#list: ', this.#list, 'start: ', startIndex, 'end: ', endIndex)
    return new List(this.#list.slice(startIndex, endIndex))
  }
  map(fn) {
    console.log('map\t', '#list: ', this.#list)
    return new List(this.#list.map(fn))
  }
  filter(pred) {
    console.log('pred\t', '#list: ', this.#list)
    return new List(this.#list.filter(pred))
  }
  reverse() {
    console.log('reverse\t', '#list: ', this.#list)
    return new List(this.#list.reverse())
  }
  concat() {
    // !!! Функция должна быть ленивой !!!
    console.log('concat\t', '#list: ', this.#list)
    // return this.#list.reduce((prev, cur) => new List([...prev.toList(), ...cur.toList()]), List.empty)
    // let result = []
    // const flatten = list => {
    //   for (let el of list) {
    //     if (typeof el === 'object') flatten(el.toList())
    //     else result.push(el)
    //   }
    // }
    // flatten(this.#list)
    // console.log(result)
    // return new List(result)
  }
  concatMap(fn) {
    console.log('concatMap\t', '#list: ', this.#list)
    return this.#list.reduce((prev, cur) => new List([...prev.toList(), ...cur.map(fn).toList()]), List.empty)
  }
  zipWith(fn, xs) {
    console.log('zipWith\t', '#list: ', this.#list, 'xs: ', xs)
    let result = []
    const xsArray = xs.toList()
    this.#list.forEach((element, index) => {
      result = result.concat(fn(element, xsArray[index]))
    });
    return new List(result)
  }
  foldr(fn, x) {
    console.log('foldr\t', '#list: ', this.#list, 'x: ', x)
    let newList = []
    for (let v of this.#list) {
      newList.push(v)
    }
    for (let i = newList.length - 1; i > -1; i--) {
      x = fn(x, newList[i])
    }
    return new List(x)
  }
  foldl(fn, x) {
    // console.log('foldl\t', '#list: ', this.#list, 'x: ', x)
    const foldlGen = function* (generator) {
      for (let v of generator) {
        console.log(x)
        yield fn(x, v)
        x = fn(x, v)
      }
    }
    return new List(foldlGen(this.#list))
  }
  scanr(fn, x) {
    console.log('scanr\t', '#list: ', this.#list, 'x: ', x)
    let result = [x]
    for (let i = this.#list.length - 1; i > -1; i--) {
      result.unshift(fn(result[0], this.#list[i]))
    }
    return new List(result)
  }
  scanl(fn, x) {
    console.log('scanl\t', '#list: ', this.#list, 'x: ', x)
    let result = [x]
    for (let i = 0; i < this.#list.length; i++) {
      result.push(fn(result[i], this.#list[i]))
    }
    return new List(result)
  }
  elem(x) {
    console.log('elem\t', '#list: ', this.#list, 'x: ', x)
    return this.#list.includes(x)
  }
  elemIndex(x) {
    console.log('elemIndex\t', '#list: ', this.#list, 'x: ', x)
    for (let i = 0; i < this.#list.length; i++) {
      if (this.#list[i] === x) return i
    }
    return -1
  }
  find(fn) {
    console.log('find\t', '#list: ', this.#list)
    for (let i = 0; i < this.#list.length; i++) {
      if (fn(this.#list[i])) return this.#list[i]
    }
  }
  findIndex(fn) {
    for (let i = 0; i < this.#list.length; i++) {
      if (fn(this.#list[i])) return i
    }
  }
  any(fn) {
    console.log('any\t', '#list: ', this.#list)
    for (let i = 0; i < this.#list.length; i++) {
      if (fn(this.#list[i])) return true
    }
    return false
  }
  all(fn) {
    console.log('all\t', '#list: ', this.#list)
    for (let i = 0; i < this.#list.length; i++) {
      if (!fn(this.#list[i])) return false
    }
    return true
  }
  the() {
    console.log('the\t', '#list: ', this.#list)
    for (let i = 1; i < this.#list.length; i++) {
      if (this.#list[i - 1] !== this.#list[i]) return undefined
    }
    return this.#list[0]
  }
}
console.log(List.repeat(1).take(10).foldr(x => x + 1,0).toList())
// console.log(List.fromList([List.fromList([1,1]), List.repeat(2)]).concat().take(3).toList())
// console.log(List.fromList([1, 2, 3, 4]).drop(-1).toList())
// console.log(List.fromList([1,2,3]).findIndex( x => ! (x&1) ))
// console.log(List.replicate(10,3).toList())
// console.log(List.cycle(List.fromList([1,2,3])).take(10).toList())
// console.log(List.iterate(x => x + 1,0).take(10).toList())
// console.log(List.fromList([1,1,1]).the())
// console.log(List.empty.all(x => x))
// console.log(List.empty.any(x => x))
// console.log(List.fromList([1,3]).find( x => ! (x&1) ))
// console.log(List.fromList([1,2,3]).find( x => ! (x&1)))
// console.log(List.fromList([1,2,3]).elemIndex(3))
// console.log(List.fromList([1,2,3]).elem(2))
// console.log(List.fromList([1,2,3]).scanl((x, y) => x + y, 0).toList())
// console.log(List.fromList([1,2,3]).scanr((x, y) => x + y, 0).toList())
// console.log(List.empty.scanr((x, y) => x * y,1).toList())
// console.log(List.fromList([1,2,3]).foldl((x, y) => x + y, 0))
// console.log(List.fromList([1,2,3]).foldl(x => x + 1,0), List.fromList([1,2,3]).length())
// console.log(List.fromList([1,2,3]).foldl((x, z) => x++ ,0))
// console.log(List.empty.foldr( () => _|_ , Math.E))
// console.log(List.fromList([1,2,3]).foldr( (x,z) => z.cons(x) , List.empty ).toList())
// console.log(List.fromList([1,2,3]).zipWith( (x, y) => x * y, List.fromList([3,2,1]) ).toList())
// console.log(List.fromList([ List.fromList([1,2,3]), List.fromList([4, 5, 6])]).concatMap(x => x * 2).toList())
// console.log(List.empty.concat().toList())
// console.log(List.fromList([ List.fromList([1,2,3]), List.fromList([4, 5, 6]), List.fromList([7, 8, 9]) ]).concat().toList())
// console.log(List.fromList([1,2,3]).reverse().toList())
// console.log(List.fromList([1,2,3]).filter( x => Boolean(x&1) ).toList())
// console.log(List.fromList([1,2,3]).map( x => x*x ).toList())
// console.log(List.fromList([1,2,3]).slice(1).toList())
// console.log(List.empty.append(List.fromList([1,2,3])).toList())
// console.log(List.empty.append(List.empty).toList())
// console.log(List.fromList([1,2,3]).append(List.fromList([4,5,6])).toList())
// console.log(List.empty.cons(1).toList())
// console.log(List.fromList([1, 2, 3]).cons(0).toList())
// console.log(List.empty.nil())
// console.log(List.fromList([1, 2, 3]).length())
// console.log(List.fromList([1, 2, 3, 4]).drop(1).toList())
// console.log(List.fromList([1, 2, 3, 4]).take(2).toList())
// console.log(List.fromList([1, 2, 3]).get(0))
// console.log(List.fromList([1, 2, 3]).tail().toList())
// console.log(List.fromList([]).head())
// console.log(List.fromList([1, 2, 3]).head())
// console.log(List.fromList([1, 2, 3, null, null, null]).toList())
// console.log(List.fromList([]).toList())
// console.log(List.empty.toList())
// console.log(new List([1, 2, 3]))
