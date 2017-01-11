//index.js
//获取应用实例
var app = getApp()
var flag = true;
Page({
  data: {
    motto: '聚一波APP DEMO',
    userInfo: {},
    color: "window"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // click:function(motto){
  //   console.log("点击哈哈");
  //     if(flag){
  //       // color = "window-red";
  //       motto = "呵呵"
  //       console.log("true");
  //       flag = false;
  //     }else{
  //       // color = "window";
  //       motto = "哈哈"
  //       console.log("false");
  //       flag = true;
  //     }
  //     this.setData({
  //       motto
  //     })
  // },
  primary:function(e){
    console.log("按钮");
    wx.navigateTo({
      url: '../invite/invite'
    })
  }
})