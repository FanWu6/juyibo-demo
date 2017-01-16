//index.js
//获取应用实例
var app = getApp()
// var config = app.globalData
const AV = require('../../utils/leancloud-storage');
const { User } = require('../../utils/leancloud-storage');
var flag = true;
Page({
  data: {
    motto: '聚一波APP DEMO',
    userInfo: {},
    color: "window",
    buttonText:"default:发起聚餐",
    // todos:[]
  },
  loginAndFetchTodos: function () {
    return AV.Promise.resolve(AV.User.current()).then(user =>
      user ? (user.isAuthenticated().then(authed => authed ? user : null)) : null
    ).then(user =>
      user ? user : AV.User.loginWithWeapp()
    ).then((user) => {
          //
          console.log("leancloud登陆成功")
          this.save()
    }).catch(error => console.error(error.message));
  },
  onReady: function() {
    console.log('page ready');
    this.loginAndFetchTodos();
  },
  onPullDownRefresh: function () {
    this.loginAndFetchTodos().then(wx.stopPullDownRefresh);
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
    // //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
    // if(app.globalData.isHave)
    // {
    //   buttonText="加入聚餐"
    //   console.log('地点:'+app.globalData.location+' '+'时间:'+app.globalData.time+' '+'日期:'+app.globalData.date+' '+'加入!')
    // }else{
    //   buttonText="发起聚餐"
    // }
    // this.setData({
    //   buttonText
    // })
    return new AV.Query('Room')
    .find()
    .then(this.updateMain)
    .catch(console.error);
    //--服务器数据测试
  },
  primary:function(e){
    console.log("按钮");
    // var gotourl
    // if(app.globalData.isHave)
    // {
    //   gotourl = '../activityMoudle/activity'
    // }else{
    //   gotourl = '../invite/invite'
    // }
    // gotourl= '../activityRoom/activityRoom'
    // wx.navigateTo({
    //   url: gotourl
    // })

    return new AV.Query('Room')
    .find()
    .then(this.getRoomInfo)
    .catch(console.error);
  },
  updateMain:function(roomInfo){
      console.log("房间信息")
      var gotourl
      if(roomInfo.length==0)
      {
        console.log("0")
        this.data.buttonText="发起聚餐"
      }else{
         console.log("1")
         this.data.buttonText="加入聚餐"
      }
      this.setData({
        buttonText:this.data.buttonText
      })
  },
  getRoomInfo:function(roomInfo){
      console.log("房间信息")
      var gotourl
      if(roomInfo.length==0)
      {
        console.log("无房间")
        this.data.buttonText="发起聚餐"
         gotourl = '../invite/invite'
      }else{
         console.log("有房间")
         this.data.buttonText="加入聚餐"
         console.log(roomInfo.length)
          // var TodoFolder = AV.Object.extend('Room');
          // // 新建对象
          // var todoFolder = new TodoFolder();
          // // 设置名称
          // var currentUser = AV.User.current();
          // todoFolder.set('ownerID',currentUser.get('username'));
          // // 设置优先级
          // todoFolder.save()
          //  gotourl = '../invite/invite'
           gotourl= '../activityRoom/activityRoom'
      }
      this.setData({
        buttonText:this.data.buttonText
      })
      wx.navigateTo({
        url: gotourl
    })
  },
  //
    save: function () {
    const user = User.current();

    wx.getUserInfo({
    success: ({userInfo}) => {
    // 更新当前用户的信息
    user.set(userInfo).save()
      }
      })
  }
  //
})