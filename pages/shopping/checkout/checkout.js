var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');


var app = getApp();

Page({
  data: {
    checkedGoodsList: [],
    checkedInfo: {},
    innerTrans: [
      {

        'name': '申通',
        'id': '1'

      },
      {

        'name': '韵达',
        'id': '2'

      },
      {

        'name': 'EMS',
        'id': '3'

      },
      {

        'name': '顺丰',
        'id': '4'

      },
      {

        'name': '圆通',
        'id': '5'

      },
    ],
    currentValue: '',
    transportation:0,
    SliderPaneldisplay: 'false',
    goodsTotalPrice: 0.00, //商品总价
    
    
  },
  onLoad: function (options) {

    // 页面初始化 options为页面跳转所带来的参数

    var decode=decodeURIComponent(options.checkedGoods)
    
    this.setData({
      'checkedGoodsList': JSON.parse(decode)
    })
     this.setgoodsTotalPrice();
    console.log(this.data.checkedGoodsList)

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    wx.showLoading({
      title: '加载中...',
    })
    this.getCheckoutInfo();
    console.log('show')

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  getCheckoutInfo: function () {
      this.setData({
        checkedInfo: app.globalData.userInfo
      })
    console.log(app.globalData.userInfo)
      wx.hideLoading();
    
  },
  setgoodsTotalPrice:function(){
    var goodsTotalPrice=this.data.goodsTotalPrice;
    var checkedGoodsList=this.data.checkedGoodsList;
    var i;
    for ( i in checkedGoodsList){
      goodsTotalPrice += checkedGoodsList[i].total;
    }
    this.setData({
      goodsTotalPrice: goodsTotalPrice.toFixed(2)
    })
    console.log(this.data.goodsTotalPrice)
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/shopping/address/address',
    })
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/shopping/addressAdd/addressAdd',
    })
  },
 
  submitOrder: function () {
    var checkedGoodsList=this.data.checkedGoodsList
    var i = 0;
    if (this.data.transportation===0){
      wx.showToast({
        title: '请选择快递',
        image: '/static/images/icon_error.png'
      })
      return false
    }
    for (i; i < checkedGoodsList.length; i++) {
      util.request(api.UpdateOrder, {
        id: checkedGoodsList[i].id,
        count: checkedGoodsList[i].count,
        transportation: this.data.transportation
      }, 'POST').then(function (res) {
        if (res.status === 1) {

        }
      });
    }

    for (i in checkedGoodsList){
      
      util.request(api.OrderPay, { id: checkedGoodsList[i].id }, 'POST').then(res => {
        if (res.status == 0) {
          util.showErrorToast('库存不足');
          return false
        }
      });
     }
     wx.redirectTo({
      url: '/pages/payResult/payResult?status=true'
    });
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
      'transportation': e.detail.value,
      'currentValue': this.data.innerTrans[e.detail.value - 1].name,
      SliderPaneldisplay: 'false'

    })
    console.log(e)
  },
})