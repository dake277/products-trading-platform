const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    avatar:'',
    
  },
  onLoad: function(options) {
    console.log("onLoad")
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function() {
    console.log("onReady")
    console.log(this.data.userInfo)
    console.log(app.globalData.userInfo)
  },
  onShow: function() {
    console.log("onShow")
    wx.hideHomeButton();
    this.setData({
      userInfo: app.globalData.userInfo,
      avatar:app.globalData.avatar
    });
    if (app.globalData.token !== '')
    {
      this.setData({
        showLoginExit: true
      });
    }
    
  },
  onHide: function() {
    // 页面隐藏
    console.log("onHide")
  },
  onUnload: function() {
    console.log("onUnload")
    // 页面关闭
  },



  onDialogBody () {
    // 阻止冒泡
  },

  onPhoneLogin:function(){

    let that=this;
    util.get(api.GetUserInfo,{ }).then(function (res){
      that.setData({
        userInfo: res.data,
      })
    })
  },
  // onWechatLogin(e) {
  //   if (e.detail.errMsg !== 'getUserInfo:ok') {
  //     if (e.detail.errMsg === 'getUserInfo:fail auth deny') {
  //       return false
  //     }
     
  //     wx.showToast({
  //       title: '登录失败',
  //     })
  //     return false
  //   }
  //   console.log(e)
  //   util.login().then((res) => {
  //     console.log(res);
  //     return util.request(api.AuthLoginByWeixin, {
  //       code: res,
  //       userInfo: e.detail
  //     }, 'POST');
  //   }).then((res) => {
  //     console.log(res);
  //     return util.login()
  //   }).then((res)=>{
  //     console.log(res);
  //     return util.request(api.AuthLoginByWeixin, {
  //       code: res,
  //       userInfo: e.detail
  //     }, 'POST');
  //   }).then((res) => {
  //     console.log(res)
      
  //     // 设置用户信息
  //     this.setData({
  //       userInfo: res.data.userInfo,
  //       showLoginDialog: false,
  //       showLoginExit :true
  //     });
  //     app.globalData.userInfo = res.data.userInfo;
  //     app.globalData.token = res.data.token;
  //     wx.setStorageSync('userInfo', JSON.stringify(res.data. userInfo));
  //     wx.setStorageSync('token', res.data.token);
      
  //   }).catch((err) => {
  //     console.log(err)
  //   })
    
  // },


  
  onOrderInfoClick: function(event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  


  
  exitLogin: function() {
    var that = this;
    wx.showModal({
      
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function(res) {
        
        console.log(res);
        if (res.confirm) {
          console.log('用户点击确定');
          
          util.request(api.UserLoginOut);
          
         
          wx.reLaunch({
            url: '/pages/FirstIndex/FirstIndex',
          });
         
        }
      }
    })

  }
})