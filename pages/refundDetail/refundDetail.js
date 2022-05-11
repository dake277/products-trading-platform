var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refundGood:{},
    AgreeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var decode = decodeURIComponent(options.refundGood)
    this.setData({
      'refundGood': JSON.parse(decode)
    })
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

  submitRefund(){
    let refundGoodId = this.data.refundGood.refundsId
    let AgreeList = this.data.AgreeList
    util.request(api.AgreeRefund, { id: refundGoodId.toString() }, 'POST').then((res) => {
      if (res.status == 1) {
        wx.showToast({
          title: '退款成功',
        })
        wx.navigateBack({
          delta: 1
        })
        AgreeList.push(refundGoodId)
        wx.setStorageSync('AgreeList', AgreeList)
      }
    })
  }
  
})