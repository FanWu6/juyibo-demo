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
    this.ref = wilddog.sync().ref("User")
    //这个地方使用野狗登录微信小程序的方法,可以获得微信返回的openId,用户名称等等信息,这些信息会存在野狗的控制台的身份人认证部分。
    wilddog.auth().signInWeapp().then(function(user){
    }).catch(function(err){
      console.log(err);
    })

//     this.ref.set({
//   "messageboard":{
//     "message1":{
        // "content" : "Wilddog, Cool!",
        // "presenter" : "Jack123"
//     }
//   }
// });


// this.ref.set({
//         "content" : "Wilddog, Cool!",
//         "presenter" : "Jack123"
// });

    this.ref.once('value', function(snapshot) {
          //  var val = snapshot.val().messageboard.message1.presenter;
          var val = snapshot.val();
           if(val != null) {
              console.log(val["IM&feather"].nickName)
              this.globalData.userServerObject = val
            }
      }, this)


//     this.ref.orderByChild("presenter").on("value", function(snapshot) {
  //  console.log(snapshot.key() + " was " + snapshot.val().presenter + " centimeters tall");
// });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (loginCode) {
          //获取用户信息
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
              //获取unionID
              var appid = 'wxf37280bc7a5216c2'; //填写微信小程序appid  
              var secret = 'e0511f03b16051dab47e6120fcaf6cb2'; //填写微信小程序secret 
              var js_code = loginCode.code;

              wx.request({  
              url:'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+js_code+'&grant_type=authorization_code',
              header: {  
                  'content-type': 'application/json'  
              },  
              success: function(res2) {  
                  // console.log('openID')
                  // console.log(res2.data.openid) //获取openid  
                  // var myref = wilddog.sync().ref("User"+res2.data.openid)//用openid做唯一key
                  var myref = wilddog.sync().ref("User/"+res.userInfo.nickName)
                  myref.set(
                    {
                      "nickName" : res.userInfo.nickName,
                      "avatarUrl " : res.userInfo.avatarUrl,
                      "openId" :res2.data.openid
                 });
              }  
          })
              //获取unionID end
            }
          })
        }
      })
    }
  },
  globalData:{
    userServerObject:null,
    userInfo:null,
    isHave:false,
    location:'测试地点',
    time:'11',
    date:'11'
  },
 getTodoRef: function() {
    return this.ref
  },
  getNodeRef: function(nodeName) {
    return this.ref(nodeName)
  }
})

