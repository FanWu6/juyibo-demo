function getTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  
  var tArray = new Array()
  tArray[0] = [year, month, day].map(formatNumber).join('-')
  tArray[1] = [hour, minute].map(formatNumber).join(':')
//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return tArray
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  getTime: getTime
}
