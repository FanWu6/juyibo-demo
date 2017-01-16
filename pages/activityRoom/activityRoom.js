
// 引入coolsite360交互配置设定
require('coolsite.config.js');
var app = getApp()
const AV = require('../../utils/leancloud-storage');

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "activityRoom",
  /**
   * 页面的初始数据
   */

  data: {
    joinInfo:{},
    serverU: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (joinInfo) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);

    return new AV.Query('Room')
    .find()
    .then(this.updateRoomInfo)
    .catch(console.error);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
    // this.loginAndFetchTodos(serverU)
    return new AV.Query('_User')
        .find()
        .then(this.setTodos)
        .catch(console.error);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  joinBtn:function(e){//加入
    var currentUser = AV.User.current();
    if (currentUser) {
      currentUser.set('isParty',1)
      currentUser.save().then(this.updateTodos)
    }
  },
  offBtn:function(){//请假
    var currentUser = AV.User.current();
    if (currentUser) {
      currentUser.set('isParty',2)
      currentUser.save().then(this.updateTodos)
    }
  },
  setTodos: function (serverU) {//设置serverU数组
          this.setData({
            serverU:serverU
          });
  },
  updateTodos: function (update) {//更新erverU数组
      console.log(this.data.serverU)
      var currentUser = AV.User.current();
      this.data.serverU.map(function(user){
            if(user.get('objectId')==currentUser.get('objectId'))
            {
              user.set('isParty',currentUser.get('isParty'))
            }
      })
      this.setTodos(this.data.serverU)
  },
  updateRoomInfo:function(roomInfo){
         console.log(roomInfo[0].get('objectId'))
        // 获取属性
        this.data.joinInfo.location = roomInfo[0].get('aLocation')
        this.data.joinInfo.time = roomInfo[0].get('aDate')+' '+roomInfo[0].get('aTime')
        this.data.joinInfo.des = '嗨起来啊'
        this.setData({
          joinInfo:this.data.joinInfo
        })

  },
  loginAndFetchTodos: function (serverU) {
        // var query = new AV.Query('_User');
        // var userArray = new Array()
        // query.find().then(function (serverArray) {
        //   serverArray.map(function(user) {
            // console.log(user.get('avatarUrl'))
            // console.log(user.get('nickName'))
            // var userinfo = new Array();
            // userinfo['avatarUrl'] = user.get('avatarUrl')
            // userinfo['nickName'] = user.get('nickName')
            // serverU.push(userinfo)
        //   });
        // }).then(serverU => {
        //   console.log("asdasd")
        //   console.log("serverU.."+serverU.length)
        //   this.data.serverU = serverU;
        // }, function (error) {
        //   // 异常处理
        //   console.log(error)
        // });
        // return new AV.Query('_User')
        // .find()
        // .then(this.setTodos)
        // .catch(console.error);
    },
  
})

