var util = require('../../utils/util.js');
var api = require('../../config/api.js');

Page({
  data: {

    categoryList: [],
    // vegetablesList:[],
    // fruitList:[],
    // meatList:[],
    // waterList:[],
    lastList:[],
    currentIndex: 1,
    topIndex:0
  },
  onLoad: function (options) {
    
  },
  
  initGoosList: function (id) {
    var that = this;
    util.request(api.BuyerGoodsList, { pageNum: 1, pageRow: 20, userId: id })
      .then(function (res) {
        that.setData({
          categoryList: res.data.records,
        });
        console.log(that.data.categoryList);
        that.getList(that.data.currentIndex);
      });
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.initGoosList(2);
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  
  switchCate: function (event) {
    var that = this;
    that.setData({
      currentIndex: event.currentTarget.dataset.id
    });

    this.getList(event.currentTarget.dataset.id);
  },
  titleClick: function (e) {
    console.log(e)
    let topIndex =
      this.setData({
        topIndex: e.currentTarget.dataset.idx
      })
     console.log(this.data.currentIndex)
    this.getList(this.data.currentIndex);
  },
  getList: function (id){
    let vegetablesList
    if(id==1){
       vegetablesList = this.data.categoryList.filter(function (element, index, array) {
        if (element.categorize == 1) {
          return true;
        } else {
          return false;
        }
       })
      if (this.data.topIndex==1){
        vegetablesList = vegetablesList.filter(function (element, index, array) {
          if (element.count == 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      if (this.data.topIndex == 0) {
        vegetablesList = vegetablesList.filter(function (element, index, array) {
          if (element.count != 0) {
            return true;
          } else {
            return false;
          }
        })
        if (this.data.topIndex==1){
        vegetablesList = vegetablesList.filter(function (element, index, array) {
          if (element.count == 0) {
            return true;
          } else {
            return false;
          }
        })
      }
        if (this.data.topIndex == 0) {
        vegetablesList = vegetablesList.filter(function (element, index, array) {
          if (element.count != 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      }
       this.setData({
         lastList: vegetablesList
       })
    }
    if (id == 2) {
      let fruitList
       fruitList = this.data.categoryList.filter(function (element, index, array) {
        if (element.categorize == 2) {
          return true;
        } else {
          return false;
        }
      })
      if (this.data.topIndex == 1) {
        fruitList = fruitList.filter(function (element, index, array) {
          if (element.count == 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      if (this.data.topIndex == 0) {
        fruitList = fruitList.filter(function (element, index, array) {
          if (element.count != 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      this.setData({
        lastList: fruitList
      })
    }
    if (id == 3) {
      let meatList
      meatList = this.data.categoryList.filter(function (element, index, array) {
        if (element.categorize == 3) {
          return true;
        } else {
          return false;
        }
      })
      if (this.data.topIndex == 1) {
        meatList = meatList.filter(function (element, index, array) {
          if (element.count == 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      if (this.data.topIndex == 0) {
        meatList = meatList.filter(function (element, index, array) {
          if (element.count != 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      this.setData({
        lastList: meatList
      })
    }
    if (id == 4) {
      let waterList
       waterList = this.data.categoryList.filter(function (element, index, array) {
        if (element.categorize == 4) {
          return true;
        } else {
          return false;
        }
      })
      if (this.data.topIndex == 1) {
        waterList = waterList.filter(function (element, index, array) {
          if (element.count == 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      if (this.data.topIndex == 0) {
        waterList = waterList.filter(function (element, index, array) {
          if (element.count != 0) {
            return true;
          } else {
            return false;
          }
        })
      }
      this.setData({
        lastList: waterList
      })
    }

  }
})