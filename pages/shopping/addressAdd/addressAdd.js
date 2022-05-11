var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data: {
    addressInfo: {},
   
    
    Location:'',
    addressDetail: ''
  },
  bindinputMobile(event) {
    let addressInfo = this.data.addressInfo;
    addressInfo.userName = event.detail.value;
    this.setData({
      addressInfo: addressInfo
    });
  },
  bindinputName(event) {
    let addressInfo = this.data.addressInfo;
    addressInfo.realName = event.detail.value;
    this.setData({
      addressInfo: addressInfo
    });
  },
  bindinputAddress (event){
    let addressDetail = event.detail.value;
    this.setData({
      addressDetail: addressDetail
    });
  },
  
  getAddressDetail() {
    this.setData({
      addressInfo: app.globalData.userInfo
    })
    this.getlocal();
  },

  getlocal(){
    var reg = /.+?(省|市|自治区|自治州|县|区)/g;
    var Location
    var addressDetail
    var address = this.data.addressInfo.address
    Location = address.trim().split(' ')[0]
    
      addressDetail =address.trim().split(' ')[1]
    if (typeof addressDetail === 'undefined'){
        addressDetail=''
    }
    this.setData({
      Location: Location,
      addressDetail: addressDetail
    })
  },

  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options)
    
      this.getAddressDetail();
    

    //this.getRegionList(1);

  },
  onReady: function () {

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
  
  cancelAddress(){
    wx.navigateBack({
      delta: 2
    })
  },
  saveAddress(){
    console.log(this.data.address)
    let addressInfo = this.data.addressInfo;

    // if (addressInfo.realName == '') {
    //   util.showErrorToast('请输入姓名');

    //   return false;
    // }

    // if (addressInfo.userName == '') {
    //   util.showErrorToast('请输入手机号码');
    //   return false;
    // }

    


    let that = this;
    util.request(api.UpdateUserInfo, { 
      userName: app.globalData.userInfo.userName,
      passWord: app.globalData.userInfo.passWord,
      realName: app.globalData.userInfo.realName,
      roleId: app.globalData.userInfo.roleId,
      nickName: app.globalData.userInfo.nickName,
      address: this.data.Location + ' ' + this.data.addressDetail,
      eMail: app.globalData.userInfo.email,
      id: app.globalData.userInfo.id,
    }, 'POST').then(function (res) {
      if (res.status === 1) { 
          util.post(api.FindById, { id:'4'}).then(function (res) {
           
            app.globalData.userInfo = res.data;
            console.log(app.globalData.userInfo)
            wx.showToast({
              title: '地址更改成功',
            })
            wx.navigateBack({
              delta:2
            })
          }) 
      }
      })
  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  }
})