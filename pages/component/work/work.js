//var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp();

Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
   
  },

  /* 组件的初始数据 */
  data: {
    saleCount:0,
    orderCount:0,
    goodsCount:0,
    noFinnishCount:0,
    UserListcount:0,
    orderList:[]
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      this.onLoad();
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    onLoad: function () {
      this.initSaleCount();
    },
    onReady: function () {
      // 页面渲染完成
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
    switchOrderTab:function(){
      this.triggerEvent('showOrder', {}, {})
    },
  initSaleCount:function(){
    let id = (app.globalData.userInfo.id).toString()
    util.request(api.BuyerOrderList, { id: id, is_address:'1' },"POST").then((res)=>{
      this.setData({
        orderList:res.data
      })
      
      this.getsaleCount();
      this.getorderCount();
      this.getgoodsCount();
      this.getUserListcount();
      //this.getnoFinnishCount();
    }).then((res)=>{
      util.request(api.BuyerOrderList, { id: id, is_address: '0' }, "POST").then((res) => {
        
        this.setData({
          noFinnishCount: (res.data).length
        })
        wx.setStorageSync('noFinnishCount', (res.data).length)
      })
    })
    
  },
  getsaleCount:function(){
    let saleCount = 0;
    this.data.orderList.forEach(function (v) {
      saleCount += v.total;
    });
    this.setData({
      saleCount: saleCount.toFixed(2)
    })
    wx.setStorageSync('saleCount', saleCount)
  },
    getUserListcount: function () {
      let that = this
      let buyerInfo
      util.request(api.GetUserList, { pageNum: 1, pageRow: 200 })
        .then(function (res) {
          buyerInfo = res.data.records.filter(function (element, index, array) {
            if (element.roleId == app.globalData.userInfo.id) {
              return true;
            } else {
              return false;
            }
          })
          that.setData({
            UserListcount: buyerInfo.length
          })
        })
    },
  getorderCount: function () {
    let orderCount = 0;
    orderCount = this.data.orderList.length;
    
    this.setData({
      orderCount: orderCount
    })
    wx.setStorageSync('orderCount', orderCount)
  },
  getgoodsCount: function () {
    let goodsCount = 0;
    this.data.orderList.forEach(function (v) {
      goodsCount += v.count;
    });
    this.setData({
      goodsCount: goodsCount
    })
  },

  },
})