//app.js
const AV = require('./utils/leancloud-storage');
const { User } = require('./utils/leancloud-storage');
var coolsite360 = require('./coolsite/index.js');
AV.init({
  appId: '4yEc57LAVe0Clkzk8Gktwxvd-gzGzoHsz',
  appKey: 'OEPkIVzmkBiuxBz20eQhO1TV',
});

App({
  coolsite360: coolsite360,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
      // user.set(this.globalData.userInfo).save()
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          //获取用户信息
          //------old
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
          //--old end
        }
      })
    }
  },
  globalData:{
    serveruser:null,
    userInfo:null,
    isHave:false,
    location:'测试地点',
    time:'11',
    date:'11',
  }
})