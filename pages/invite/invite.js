var timeData = require('../../utils/time.js')
const AV = require('../../utils/leancloud-storage');
var app = getApp()
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
     console.log("当前时间为"+new Date().getTime())
   },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindconfirm: function() {
    // app.globalData.location = this.data.array[this.data.index]
    // app.globalData.time = this.data.time
    // app.globalData.date = this.data.date
    // console.log("确认发起 地点:%s 时间:%s 日期%s",app.globalData.location,app.globalData.time,app.globalData.date)
    // app.globalData.isHave = true
    return new AV.Query('Room')
    .find()
    .then(this.getRoomInfo)
    .catch(console.error);

     wx.navigateTo({
      url: '../index/index'
    })
  },
  getRoomInfo:function(roomInfo){
      console.log("房间信息")
      if(roomInfo.length==0)
      {
        console.log("无房间")
         var TodoFolder = AV.Object.extend('Room');
        // 新建对象
        var todoFolder = new TodoFolder();
        // 设置名称
        var currentUser = AV.User.current();
        todoFolder.set('ownerID',currentUser.get('username'));
        todoFolder.set('aLocation',this.data.array[this.data.index]);
        todoFolder.set('aTime',this.data.time);
        todoFolder.set('aDate',this.data.date);
        todoFolder.set('isOpen','yes');
        // 设置优先级
        todoFolder.save()
      }else{
         console.log("有房间")
         console.log(roomInfo[0].get('objectId'))
         var todo = AV.Object.createWithoutData('Room', roomInfo[0].get('objectId'));
        // 修改属性
        todo.set('aLocation',this.data.array[this.data.index]);
        todo.set('aTime',this.data.time);
        todo.set('aDate',this.data.date);
        todo.set('isOpen','yes');
        // // 设置优先级
        todo.save()
      }
      wx.navigateTo({
        url: '../index/index'
    })
  },
})


