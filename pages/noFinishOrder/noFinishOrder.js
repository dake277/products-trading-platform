const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

 
  data: {
      orderList:[],
  },

  onLoad: function (options) {
    this.getOrdeList()
  },

 
  onReady: function () {

  },

  onShow: function () {

  },

  onHide: function () {

  },

  onUnload: function () {

  },

  getOrdeList(){
    let id = (app.globalData.userInfo.id).toString()
    
    let that = this
    util.request(api.BuyerOrderList, { id: id, is_address: '0' }, "POST").then((res) => {
      this.setData({
        orderList: res.data
      })

    })
  },
  fininshOrder(e){
    let orderList = this.data.orderList
    let id = orderList[e.currentTarget.dataset.orderIndex].id
    util.request(api.FinishOrder, { id: id}, "POST").then((res) => {
      if(res.status==1){
        wx.showToast({
          title: '修改成功',
          icon: 'none'
        });
        // setTimeout(() => {
        //   wx.reLaunch({
        //     url: '/pages/FirstIndex/FirstIndex',
        //   });
        // }, 1000);

      }
      this.onLoad();
    })
    
  }
})