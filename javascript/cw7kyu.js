// https://www.codewars.com/kata/5412509bd436bd33920011bc
function maskify(cc) {
  return cc.length < 4 
  ? cc
  : '#'.repeat(cc.length - 4) + cc.slice(-4, cc.length) 
}
// console.log(maskify("helloworld"))
