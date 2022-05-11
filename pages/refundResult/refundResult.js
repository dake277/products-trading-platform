var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refundList: [],
    finishrefund:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRefundList()
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
getRefundList(){
  let i,j
  util.request(api.ListALLRefund)
    .then((res) => {
      if (res.status == 1) {
        this.setData({
          refundList:res.data
        })
        // let oldrefundList = wx.getStorageInfoSync('refundList')
        // let finishrefund = wx.getStorageInfoSync('oldrefundList')
      }
    })
  
}

})