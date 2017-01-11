//index.js
//获取应用实例
var app = getApp()
var flag = true;
Page({
  data: {
    motto: '聚一波APP DEMO',
    userInfo: {},
    color: "window",
    buttonText:"发起聚餐"
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
    app.getDataList.bindAsArray(this,'testdata')
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