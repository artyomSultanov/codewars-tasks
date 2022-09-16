// https://www.codewars.com/kata/5412509bd436bd33920011bc
function maskify(cc) {
  return cc.length < 4
    ? cc
    : '#'.repeat(cc.length - 4) + cc.slice(-4, cc.length)
}
// console.log(maskify("helloworld"))

// https://www.codewars.com/kata/563b662a59afc2b5120000c6/train/javascript
function nbYear(p0, percent, aug, p) {
  let pn = p0
  let n = 0
  const fraction = percent / 100
  while (pn < p) {
    pn = pn + Math.floor(pn * fraction) + aug
    n++
  }
  return n
}

// console.log(nbYear(1500, 5, 100, 5000)) // 15
// console.log(nbYear(1500000, 2.5, 10000, 2000000)) // 10
