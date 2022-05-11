var app = getApp();
var WxParse = require('../../lib/wxParse/wxParse.js');
var util = require('../../utils/util.js');
var api = require('../../config/api.js');
Page({
  data: {
    id: 0,
    msg:'',
    goods: {},
    collectList: [],
    issueList: [],
    comment: [],
    productList: [],
    cartGoodsCount: 0,
    userHasCollect: 0,
    number: 1,
    checkedSpecText: '请选择规格数量',
    openAttr: false,
    noCollectImage: "/static/images/icon_collect.png",
    hasCollectImage: "/static/images/icon_collect_checked.png",
    collectBackImage: "/static/images/icon_collect.png"
  },
  getGoodsInfo: function () {
    let that = this;
    util.request(api.ProductDetail, { id: that.data.id },"POST").then(function (res) {
      
      if (res.status === 1) {
        console.log(res)
        that.setData({
          goods: res.data,
          
        });
      }
    });
  },
  getCollectList: function () {
    let that = this;

    util.get(api.ListCollect, { buyer_id: app.globalData.userInfo.id }).then(function (res) {
      if (res.status === 1) {
        that.setData({
          collectList: res.data,
          msg: "nihao",
        });
      }
      that.data.collectList.forEach(function (v) {
        if (v.id == that.data.id) {
          that.setData({
            'collectBackImage': that.data.hasCollectImage
          });
        }
      })
      console.log(that.data.collectList)
      console.log(that.data.msg)
    });

  },
  setCollectImage: function () {
    let that = this;
    let collectList = that.data.collectList
    console.log(that.data.collectList)
    
  },
  

  
  
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      id: options.id
      // id: 1181000
    });
    var that = this;
    this.getGoodsInfo();
    this.getcartGoodsCount();
    this.getCollectList();
    
  },
  getcartGoodsCount(){
    let that=this;
    var goodstotal = 0;
    util.request(api.GetCartList, { pageNum: 1, pageRow: 50, userId: app.globalData.userInfo.id }).then(function (res) {
      if (res.status === 1) {
        
        res.data.records.forEach(function (v) {
           
           goodstotal += v.count;
          })
        that.setData({
          cartGoodsCount: goodstotal
        })
        }
      })
    },
  
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    //this.setCollectImage();
    
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  switchAttrPop: function () {
    if (this.data.openAttr == false) {
      this.setData({
        openAttr: !this.data.openAttr
      });
    }
  },
  closeAttr: function () {
    this.setData({
      openAttr: false,
    });
  },
setNewCollect(){
  util.get(api.ListCollect, { buyer_id: app.globalData.userInfo.id }).then(function (res) {
            if (res.status === 1) {
              that.setData({
                collectList: res.data,
                msg: "nihao",
              });
            }
          })
}, 

  addCannelCollect: function () {
    let that = this;
    //添加或是取消收藏
    
    util.request(api.AddCollect, { productId: that.data.id, buyerId: app.globalData.userInfo.id }, "POST")
      .then((res)=> {
        
        if (res.status == 1) {
            this.setData({
              'collectBackImage': that.data.hasCollectImage
            });
          wx.showToast({
            title: '添加收藏成功',
          })
         } 
        if(res.status == 0) {
          
          util.get(api.ListCollect, { buyer_id: app.globalData.userInfo.id }).then((res)=> {
            var deleteCollect
            if (res.status === 1) {
              this.setData({
                collectList: res.data,
                msg: "nihao",
              });
                deleteCollect = this.data.collectList.filter(function (element, index, array) {
                if (element.id == that.data.id) {
                  return true;
                } else {
                  return false;
                }
              })
            }
            return deleteCollect
          }).then((res) => {
            return util.request(api.DeleteCollect, { id: res[0].collectId, buyerId: app.globalData.userInfo.id }, "POST")
          }).then((v) =>{
              if (v.status === 1) {
                this.setData({
                  'collectBackImage': that.data.noCollectImage
                });
                wx.showToast({
                  title: '删除收藏成功',
                })
              }
          })
          // console.log(that.data.collectList)
          // console.log(deleteCollect)
          
         
        }
      });
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/cart/cart',
    });
  },
  addToCart: function () {
    var that = this;
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    }else{
      

      //添加到购物车
    util.request(api.ProductCartAdd, { id: app.globalData.userInfo.id, count: this.data.number, transportation: 3,product_id: this.data.goods.id }, "POST")
        .then(function (res) {
          
          if (res.status == 1) {
            wx.showToast({
              title: '添加成功'
            });
            that.setData({
              openAttr: !that.data.openAttr,
              
            });
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }
          that.getcartGoodsCount();
        });
      
  }
    
  },
  NavToOrder: function () {
    var that = this;
    if (this.data.openAttr === false) {
      //打开规格选择窗口
      this.setData({
        openAttr: !this.data.openAttr
      });
    } else {


      //添加到购物车
      util.request(api.ProductCartAdd, { id: app.globalData.userInfo.id, count: this.data.number, transportation: 3, product_id: this.data.goods.id }, "POST")
        .then(function (res) {

          if (res.status == 1) {
            util.request(api.GetCartList, { pageNum: 1, pageRow: 50, userId: app.globalData.userInfo.id }).then(function (res) {
              //var checkedGoods = res.data.records[(res.data.records).length-1]
              var checkedGoods = (res.data.records).slice((res.data.records).length - 1)
              console.log(checkedGoods)
              wx.navigateTo({
                url: '../shopping/checkout/checkout?checkedGoods=' + encodeURIComponent(JSON.stringify(checkedGoods)),
                })
            })
            
            // wx.showToast({
            //   title: '添加成功'
            // });
            that.setData({
              openAttr: !that.data.openAttr,

            });
          } else {
            wx.showToast({
              image: '/static/images/icon_error.png',
              title: _res.errmsg,
              mask: true
            });
          }
          that.getcartGoodsCount();
        });

    }
  },

  
  cutNumber: function () {
    this.setData({
      number: (this.data.number - 1 > 1) ? this.data.number - 1 : 1
    });
  },
  addNumber: function () {
    this.setData({
      number: this.data.number + 1
    });
  }
})