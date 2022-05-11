// pages/ucenter/refund/refund.js
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    innerCategories: [
      {

        'name': '不想要了/拍错了',
        'id': '1'

      },
      {

        'name': '缺货',
        'id': '2'

      },
      {

        'name': '未按约定时间发货',
        'id': '3'

      },
      {

        'name': '协商一致退款',
        'id': '4'

      },
      {

        'name': '其他',
        'id': '5'

      }
    ],
    refundGood:{},
    reason:'',
    detail:'',
    currentValue: '',
    SliderPaneldisplay: 'false',
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

  SliderPanelclose: function () {
    this.setData({
      SliderPaneldisplay: 'false'
    })
  }, 
  radio: function (e) {

    this.setData({
      
      'currentValue': this.data.innerCategories[e.detail.value - 1].name,
      SliderPaneldisplay: 'false'

    })
    console.log(this.data.reason)
  },
  showInner: function () {
    this.setData({
      SliderPaneldisplay: 'true'
    })
  },
  inputDetail: function (e) {
    let detail = e.detail.value
    if (typeof detail !== 'undefined'){
      this.setData({
        'detail': e.detail.value
      })
    }
    
  },
  submitInfo: function (e) {
    let that=this
    let orderId = that.data.refundGood.id
    let sellerId = that.data.refundGood.sellersId
    let detail = that.data.detail
    let currentValue=that.data.currentValue
    util.request(api.GoodsRefund, { orderId: orderId.toString(), sellerId: sellerId.toString(), text: detail + currentValue}, 'POST')
  .then((res) => {
    if(res.status==1){
      wx.showToast({
        title: '退款申请已发送',
      })
      
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
        wx.navigateTo({
          url: '/pages/refundResult/refundResult',
        })
      }, 1000);  
    }
  }).then((res)=>{
    util.request(api.ListALLRefund).then(function (res) {
      if (res.status === 1) {
        console.log(res.data);
        // that.setData({
        //   refundList: res.data
        // })
        // wx.setStorageSync('refundList', refundList)
      }
    })
  })
},
})