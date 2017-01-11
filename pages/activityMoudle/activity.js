var app = getApp()
Page({
    data: {
        userInfo: {},
        userImage:'',
        userName:'',
        joinInfo:''
    },

    joinBtn:function(){
    var that = this
    app.getUserInfo(function(e){
      //更新数据
      that.setData({
        userName:e.nickName,
        userImage:e.avatarUrl
      })
    })
  },

  onLoad: function (joinInfo) {
    console.log('Activity--onLoad%s',joinInfo)
    //调用应用实例的方法获取全局数据
    joinInfo = '地点:'+app.globalData.location+' '+'时间:'+app.globalData.time+' '+'日期:'+app.globalData.date
    console.log(joinInfo)
    this.setData({
      joinInfo
    })
  }
})