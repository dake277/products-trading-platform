const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();
Page({
  data: {
    code: false,
    phone:' ',
    password:' ',
    currentIndex: 0,
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  getPassword:function(e){
    console.log(e)
    this.setData({
      password: e.detail.value
    })
  },
  navigateToConsumer: function (options) {
    wx.reLaunch({
      url: '/pages/selectpage/selectpage',
    })
  },
  setUserInfo: function () {
    let that = this;
    util.get(api.GetUserInfo, {}).then(function (res) {
      app.globalData.userInfo = res.data;
      wx.setStorageSync('userInfo', JSON.stringify(res.data));
      
    })
  },
  confirm: function (e) { 
    let that = this;
    if (e.detail.value.phone == '') {
      wx.showToast({
        title: '请填写手机号',
        icon: 'none'
      })
      return false;
    }
    if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(e.detail.value.phone))) {
      wx.showToast({
        title: '手机号填写有误',
        icon: 'none'
      })
      return false;
    }
    if (e.detail.value.password==''){
      wx.showToast({
        title: '请填写密码',
        icon: 'none'
      })
      return false;
    }
    
    util.post(api.UserLogin, { userName: e.detail.value.phone, passWord: e.detail.value.password }).then(function (res) {
      if (res.status === 200) {
        wx.setStorageSync('Cookie', 'JSESSIONID ='+res.data.session);
        app.globalData.cookie = 'JSESSIONID =' + res.data.session;
        util.get(api.GetUserInfo, {}).then(function (res) {
          app.globalData.userInfo = res.data;
          wx.setStorageSync('userInfo', JSON.stringify(res.data));
          console.log(app.globalData.userInfo)
          
          if (res.data.roleId==='3'){
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });
            setTimeout(() => {
              wx.reLaunch({
                 url: '/pages/index/index',
                
              })
            }, 500);
          } 
          if (res.data.roleId === '2'){
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });

            setTimeout(() => {
              wx.reLaunch({
                 url: '/pages/managerIndex/managerIndex',
                // url: '/pages/showEchart/showEchart',
              })
            }, 500);
          }
          
        })
     
      } else {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })

      }
    });
  },
 
  navigateToManager: function () {
    wx.showToast({
      title: '登录成功',
      icon:'none'
    })
    setTimeout(() => {
      wx.reLaunch({
      url: '/pages/managerIndex/managerIndex',
    }) 
    }, 1000);  
  },

  getPhone:function(e){
    // console.log(e)
    if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(e.detail.value.phone))){
      wx.showToast({
        title: '手机号填写有误',
        icon: 'none'
      })
    console.log(this.data.phone)
  }else{
      this.setData({
        phone: e.detail.value
      })
  }
  },  
  
  pagechange: function (e) {
    if ("touch" == e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }

  },

  titleClick: function (e) {
    console.log(e)
    let currentIndex =
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  signup:function(){
    wx.navigateTo({
      url: '/pages/signup/signup',
    })
  }
})