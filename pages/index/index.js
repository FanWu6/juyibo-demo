//index.js
//获取应用实例
var app = getApp()
var config = app.globalData
var flag = true;
Page({
  data: {
    motto: '聚一波APP DEMO',
    userInfo: {},
    color: "window",
    buttonText:"发起聚餐",
    todos:[]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (buttonText) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    if(app.globalData.isHave)
    {
      buttonText="加入聚餐"
      console.log('地点:'+app.globalData.location+' '+'时间:'+app.globalData.time+' '+'日期:'+app.globalData.date+' '+'加入!')
    }else{
      buttonText="发起聚餐"
    }
    this.setData({
      buttonText
    })
    //--服务器数据测试
    console.log("测试++"+ config.userServerObject["IM&feather"].nickName)
  },
  primary:function(e){
    console.log("按钮");
    var gotourl
    if(app.globalData.isHave)
    {
      gotourl = '../activityMoudle/activity'
    }else{
      gotourl = '../invite/invite'
    }
    wx.navigateTo({
      url: gotourl
    })
  }
})