var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
Page({
  data: {
    status: false,

  },
  onLoad: function (options) {
    console.log(options)
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({

      'status': options.status
    })
  },
  onReady: function () {

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  // payOrder() {
  //   pay.payOrder(parseInt(this.data.orderId)).then(res => {
  //     this.setData({
  //       status: true
  //     });
  //   }).catch(res => {
  //     util.showErrorToast('支付失败');
  //   });
  // }
})
