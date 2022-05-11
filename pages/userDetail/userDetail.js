const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var app = getApp();
Page({


  data: {
    userDetail: {}
  },
  onLoad: function (options) {
    // this.getUserList()
    console.log(options.userDetail)
    this.setData({
      userDetail: JSON.parse(options.userDetail)
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  getUserList: function () {
    let that = this
    let buyerInfo
    util.request(api.GetUserList, { pageNum: 1, pageRow: 20 })
      .then(function (res) {
        buyerInfo = res.data.records.filter(function (element, index, array) {
          if (element.roleId == app.globalData.userInfo.id) {
            return true;
          } else {
            return false;
          }
        })
        that.setData({
          userlist: buyerInfo
        })
      })
  },
  toUserInfo: function () {
    wx.navigateTo({
      url: '/pages/userDetail/userDetail',
    })
  }
})