var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {
    
    categoryList: [],
    
    currentIndex:1,
    //scrollLeft: 0,
    //scrollTop: 0,
    //goodsCount: 0,
    //scrollHeight: 0
  },
  onLoad: function (options) {
    this.getList(1);
  },
  
  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CatalogCurrent, { id: id })
      .then(function (res) {
        that.setData({
          currentCategory: res.data.currentCategory
        });
      });
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
  getList: function (id) {
    var that = this;
    util.request(api.ProductCategory, { pageNum: 1, pageRow: 50, categorize: id})
      .then(function (res) {
        that.setData({
          categoryList: res.data.records,
        });
        console.log(that.categoryList);
      });
  },
  switchCate: function (event) {
    var that = this;
    
    that.setData({
      currentIndex: event.currentTarget.dataset.id
    });
    
    this.getList(event.currentTarget.dataset.id);
  }
})