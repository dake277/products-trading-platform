const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

 
  data: {
    buyerInfo:[],
    addressDetail:'',
    Location:''
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
    let buyerInfo;
    let Location;
    let addressDetail;
    let that=this;
    util.request(api.GetUserList, { pageNum: 1, pageRow: 20})
      .then(function (res) {
        buyerInfo=  res.data.records.filter(function (element, index, array) {
          if (element.id == app.globalData.userInfo.id) {
            return true;
          } else {
            return false;
          }
      })
        console.log(buyerInfo)
        Location =(buyerInfo[0].address).trim().split(' ')[0]
        addressDetail = (buyerInfo[0].address).trim().split(' ')[1]
        that.setData({
          'buyerInfo': buyerInfo,
          Location: Location,
          addressDetail: addressDetail
        })

        console.log(that.data.buyerInfo)
      })
      
     
  },
  save: function (e) {
    let that = this;
    console.log(e.detail.value)
    if (e.detail.value.userName == '') {
      util.showErrorToast('请输入姓名');

      return false;
    }

    if (e.detail.value.email == '') {
      util.showErrorToast('请输入手机号码');
      return false;
    }

    util.request(api.UpdateUserInfo, {
      userName: e.detail.value.userName,
      passWord: app.globalData.userInfo.passWord,
      realName: e.detail.value.realName,
      roleId: app.globalData.userInfo.roleId,
      nickName: app.globalData.userInfo.nickName,
      address: this.data.Location + ' ' +e.detail.value.address,
      eMail: e.detail.value.email,
      id: app.globalData.userInfo.id,
    }, 'POST').then(function (res) {
      if (res.status === 1) {
        
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        });
        that.onLoad();
      }
    });
      console.log(e)
  },
  chooseLocation: function (e){
    let that=this
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          Location:res.address
        })
      },
    })
  }
})
