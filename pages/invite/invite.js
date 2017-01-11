var timeData = require('../../utils/time.js')
Page({
  data: {
    array: ['龙阳路尅踢维','赤坂亭', '法式铁板骚', '彩泥云南', '匆匆那年'],
    index: 0,
    // date: '2017-01-01',
    // time: '17:01'
    date :timeData.getTime(new Date())[0],
    time :timeData.getTime(new Date())[1]
  },
  onLoad: function (data) {
   },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  }
})


