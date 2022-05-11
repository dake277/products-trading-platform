const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

 
  data: {
    SliderPaneldisplay: 'false',
    List:{
      '0':'',
      '2':'商户',
      '3':'用户'
    },
    currentValue:0,
    addressDetail:'',
    Location:''
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
  showInner: function () {
    this.setData({
      SliderPaneldisplay: 'true'
    })
  },
  SliderPanelclose: function () {
    this.setData({
      SliderPaneldisplay: 'false'
    })
  },
  radio: function (e) {

    this.setData({
      
      'currentValue': e.detail.value,
      SliderPaneldisplay: 'false'

    })
    console.log(e)
  },
  chooseLocation: function (e) {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          Location: res.address
        })
      },
    })
  },
  save:function (e){
    console.log(e)
    if (!(/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/.test(e.detail.value.userName))) {
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
    }else{
      if (e.detail.value.password != e.detail.value.password2){
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
        return false;
      }
    }
    if (e.detail.value.realName == '' || e.detail.value.email == '' || e.detail.value.nickName == '' ||this.data.Location == '' || this.data.currentValue==0) {
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none'
      })
      return false;
     }
    if (!(/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(e.detail.value.email))) {
      wx.showToast({
        title: '邮箱填写有误',
        icon: 'none'
      })
      return false;
    }

    util.request(api.UserSignUp, {
      userName: e.detail.value.userName,
      passWord: e.detail.value.password,
      realName: e.detail.value.realName,
      roleId: this.data.currentValue,
      nickName: app.globalData.userInfo.nickName,
      address: this.data.Location + ' ' + this.data.addressDetail,
      eMail: e.detail.value.email,
      
    }, 'POST').then((res)=>{
      if(res.status===1){
        wx.showToast({
          title: '注册成功',
        })
        wx.reLaunch({
          url: '/pages/FirstIndex/FirstIndex',
        })
      }
    })
  }
})