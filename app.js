//app.js
var wilddog = require('wilddog-weapp-all')
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
     var config = {
      syncURL: 'https://juyibo123.wilddogio.com/',
      authDomain: 'juyibo123.wilddog.com'
    }
    wilddog.initializeApp(config)
    wilddog.auth().signInWeapp().then(function(user){

    }).catch(function(err){

    })
    this.ref = wilddog.sync().ref("testdata").orderByPriority().limitToFirst(20)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    isHave:false,
    location:'测试地点',
    time:'11',
    date:'11'
  },
 getDataList: function() {
    return this.ref
  },
})

