const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({


  data: {
    buyerInfo: [],
    addressDetail: '',
    Location: ''
  },
  onLoad: function (options) {
    
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
 
  submitPassword: function (e) {
    let that = this;
    console.log(e.detail.value)
    if (e.detail.value.phone == '') {
      util.showErrorToast('请输入手机号码');

      return false;
    }

    if (e.detail.value.password == '') {
      wx.showToast({
        title: '请填写密码',
        icon: 'none'
      })
      return false;
    } else {
      if (e.detail.value.password != e.detail.value.confirmpassword) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return false;
      }
    }

    util.request(api.UpdateUserInfo, {
      userName: app.globalData.userInfo.userName,
      passWord: e.detail.value.password,
      realName: e.detail.value.realName,
      roleId: app.globalData.userInfo.roleId,
      nickName: app.globalData.userInfo.nickName,
      address: app.globalData.userInfo.address,
      eMail: app.globalData.userInfo.email,
      id: app.globalData.userInfo.id,
    }, 'POST').then(function (res) {
      if (res.status === 1) {

        wx.showToast({
          title: '修改成功',
          icon: 'none'
        });
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/FirstIndex/FirstIndex',
          });
        }, 1000);
      }
    });
    console.log(e)
  },
  
})
