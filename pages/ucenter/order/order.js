var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();
Page({
  data:{
    orderList: [],
    refundList:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

    this.getOrderList();
  },
  getOrderList(){
    let that = this;
    let orderList;
    let refundList;
    let i,j;
    util.request(api.ListOrder, { pageNum: 1, pageRow: 100, userId: app.globalData.userInfo.id}).then(function (res)   {
      if (res.status === 1) {
        that.setData({
          orderList: res.data.records
        })
        
      }
    }).then(function (res){
      util.request(api.ListALLRefund).then(function (res) {
        if (res.status === 1) {
          console.log(res.data);
          that.setData({
            refundList: res.data
          })

        }
        console.log(that.data.refundList.length);
        let neworderList = that.data.orderList
        for (i = 0; i < that.data.refundList.length; i++) {
          for (j = 0; j < that.data.orderList.length; j++) {
            if (that.data.refundList[i].id == that.data.orderList[j].id) {
              neworderList.splice(j, 1)
            }
          }
        }
        console.log(neworderList);
        that.setData({
          orderList: neworderList
        })
      })
      })
    
    // console.log(this.data.refundList.length);
    // for (i = 0; i < refundList.length;i++){
    //   for (j = 0; j< orderList.length; j++){
    //     if (refundList[i].id == orderList[j].id){
    //       orderList.splice(j,1)
    //     }
    //   }
    // }
    // console.log(orderList);
    //     this.setData({
    //       orderList: orderList
    //     })
    
  },
  navRefund(e){
    let orderList = this.data.orderList;
    wx.redirectTo({
      url: '/pages/ucenter/refund/refund?refundGood=' + encodeURIComponent(JSON.stringify(orderList[e.currentTarget.dataset.orderIndex])),
    })
    console.log(e)
    console.log(this.data.orderList[e.currentTarget.dataset.orderIndex]);
  },
  navDetail(e){
    let result = this.data.orderList[e.currentTarget.dataset.id]
    wx.navigateTo({
      url: '/pages/ucenter/orderDetail/orderDetail?result=' + encodeURIComponent(JSON.stringify(result)),
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})