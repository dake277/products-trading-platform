const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();
Page({

  
  data: {
    result:{},
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
  },

  
  onLoad: function (options) {
    console.log(options)
    console.log(typeof options)
    this.setData({
      result: JSON.parse(options.result) 
    })
    console.log(this.data.result.id)
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  
})