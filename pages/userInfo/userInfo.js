const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
var app = getApp();
Page({

  
  data: {
    userlist:[]
  },
  onLoad: function (options) {
    this.getUserList()
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },

  onHide: function () {
    
  },

  onUnload: function () {
    
  },

  getUserList:function(){
    let that=this
    let buyerInfo
    util.request(api.GetUserList, { pageNum: 1, pageRow: 20 })
      .then(function (res) {
        buyerInfo = res.data.records.filter(function (element, index, array) {
          if (element.roleId == 3) {
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
  toUserInfo:function(e){
    console.log(e)
    let buyerInfo = this.data.userlist.filter(function (element, index, array) {
      if (element.id == e.currentTarget.dataset.userid) {
        return true;
      } else {
        return false;
      }
    })
    wx.navigateTo({
      url: '/pages/userDetail/userDetail?userDetail=' + JSON.stringify(buyerInfo),
    })
  }
})