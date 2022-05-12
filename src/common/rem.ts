/* eslint-disable prefer-const */

function setRem() {
  let baseSize = 100
  let basePc = baseSize / 1920
  let vW = window.innerWidth
  let vH = window.innerHeight
  let dueH = (vW * 1080) / 1920
  if (vH < dueH) {
    vW = (vH * 1920) / 1080
  }
  if (vW < 1300) {
    vW = 1300
  }
  let rem = vW * basePc
  document.documentElement.style.fontSize = rem + 'px'
}
setRem()
window.onresize = function () {
  setRem()
}
