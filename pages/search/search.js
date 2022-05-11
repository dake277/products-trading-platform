var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp()
Page({
  data: {
    keywrod: '',
    searchStatus: false,
    goodsList: [],
    helpKeyword: [],
    historyKeyword: [],
    categoryFilter: false,
    currentSortType: 'default',
    currentSortOrder: '',
    filterCategory: [],
    defaultKeyword: {},
    hotKeyword: [],
    page: 1,
    size: 20,
    currentSortType: 'id',
    currentSortOrder: 'desc',
    categoryId: 0
  },
  //事件处理函数
  closeSearch: function () {
    wx.navigateBack()
  },
  clearKeyword: function () {
    this.setData({
      keyword: '',
      searchStatus: false
    });
  },
  onLoad: function () {

    
  },

  

  inputChange: function (e) {

    this.setData({
      keyword: e.detail.value,
      searchStatus: false
    });
    
  },
  getGoodsList: function () {
    let that = this;
    util.request(api.FindGoodsByName, { pageNum: 1, pageRow: 4, name: that.data.keyword },"GET").then(function (res) {
      if (res.status === 1) {
        that.setData({
          goodsList: res.data.records,
          searchStatus: true,
        });
      }
    });
    
  },
  // inputFocus: function () {
  //   this.setData({
  //     searchStatus: false,
  //     goodsList: []
  //   });

  //   if (this.data.keyword) {
  //     this.getHelpKeyword();
  //   }
  // },
  
  
  onKeywordTap: function (event) {

    this.getSearchResult(event.target.dataset.keyword);

  },
  
  onKeywordConfirm(event) {
    // this.setData({
    //   keyword:event.detail.value
    //   });
    this.getGoodsList()
  }
})