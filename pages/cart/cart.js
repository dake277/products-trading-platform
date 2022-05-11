var util = require('../../utils/util.js');
var api = require('../../config/api.js');

var app = getApp();

Page({
  data: {
    cartGoods: [],
  
    deleteCartGoods:[],
    // cartGoodsItem:{ },
    
    cartTotal: 0,
    checkedGoodsCount:0,
    checkedGoodsPrice:0,
    isEditCart: false,
    checkedAllStatus: false,
    editCartList: []
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  
    
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示
    this.getCartList();
    
    
    console.log(this.data.cartGoods.length);
    console.log(this.data.cartTotal);
    
  },
  onHide: function () {
    // 页面隐藏
    this.setData({
      isEditCart: false
    })
    
    console.log('yinchang')
  },
  onUnload: function () {
    // 页面关闭

  },
  jsontext: function (){
    var cartItem = JSON.parse(app.globalData.userInfo)
    console.log(cartItem)
  },

  

  getCartList: function () {
    let that = this;
  util.request(api.GetCartList, { pageNum: 1, pageRow: 50, userId: app.globalData.userInfo.id}).then(function (res) {
      if (res.status === 1) {
        console.log(res.data);
        
        var cartItem={ };
        var goods=[];
        //var cartItem =JSON.parseJSON(res.data.records[i])
        for ( var i=0; i< res.data.records.length;i++)
        {
          
          cartItem = res.data.records[i]
          cartItem.isChecked=false;
          goods[i] = cartItem;
          //console.log(JSON.stringify(res.data.records[i]))
          //cartGoods.push(cartGoodsItem);
        }
        that.setData({
          cartGoods: goods,
          checkedGoodsCount:0,
          checkedGoodsPrice:0
          //deleteCartGoods: goods
        })
        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      }
     
      console.log(that.data.cartTotal);
      console.log(that.data.cartGoods);
      console.log('getcartgoods')
      
      // that.setData({
      //   checkedAllStatus: that.isCheckedAll()
      // });
    });
  },
  
  isCheckedAll: function () {
    //判断购物车商品已全选
    return this.data.cartGoods.every(function (element, index, array) {
      if (element.isChecked == true) {
        return true;
      } else {
        return false;
      }
    });
  },
  isCheckedItem:function(event){
    if (!this.data.isEditCart) {
      let itemIndex = event.target.dataset.itemIndex;

      this.data.cartGoods[itemIndex].isChecked = this.data.cartGoods[itemIndex].isChecked ? false: true;
      var cartGoods = this.data.cartGoods
      this.setData({
        cartGoods: cartGoods
      })
      this.setData({
        checkedAllStatus: this.isCheckedAll()
      });
      this.getCheckedGoodsCount()
      this.getCheckedGoodsPrice()
      console.log('cartGoods' + JSON.stringify(this.data.cartGoods));
      console.log('deleteCartGoods:' + JSON.stringify(this.data.deleteCartGoods));
      
    }
    if(this.data.isEditCart){
      //编辑状态
      let itemIndex = event.target.dataset.itemIndex;
      
      //console.log('deleteCartGoods:'+deleteCartGoods)
      this.data.deleteCartGoods[itemIndex].isChecked = this.data.deleteCartGoods[itemIndex].isChecked ? false : true;
      var deleteCartGoods = this.data.deleteCartGoods
      this.setData({
        deleteCartGoods: deleteCartGoods,
       
      });
      this.getCheckedGoodsCount()
      this.getCheckedGoodsPrice()
      console.log('deleteCartGoods:'+JSON.stringify(this.data.deleteCartGoods));
      console.log('AfterCartGoods:' + JSON.stringify(this.data.cartGoods));
    }
  },
  

  getCheckedGoodsCount: function(){
    if(!this.data.isEditCart){
      let checkedGoodsCount = 0;
      this.data.cartGoods.forEach(function (v) {
        if (v.isChecked === true) {
          checkedGoodsCount += v.count;
        }
      });
      this.setData({
        checkedGoodsCount: checkedGoodsCount
      })
    }else{
      //编辑状态
      let checkedGoodsCount = 0;
      this.data.deleteCartGoods.forEach(function (v) {
        if (v.isChecked === true) {
          checkedGoodsCount += v.count;
        }
      });
      this.setData({
        checkedGoodsCount: checkedGoodsCount
      })
    }
    
  },
  getCartTotal:function(){
    let cartTotal = 0;
    this.data.cartGoods.forEach(function (v) {
      cartTotal += v.count;

    });
    this.setData({
      cartTotal: cartTotal
    })
    wx.setStorageSync('cartTotal', cartTotal)
  },
  getCheckedGoodsPrice:function(){
    if(!this.data.isEditCart){
      let checkedGoodsPrice = 0;
      this.data.cartGoods.forEach(function (v) {
        if (v.isChecked === true) {
          checkedGoodsPrice += v.total;
        }
      })
      console.log(checkedGoodsPrice)
      this.setData({
        checkedGoodsPrice: checkedGoodsPrice.toFixed(2)
      })
    }else{
      let checkedGoodsPrice = 0;
      this.data.deleteCartGoods.forEach(function (v) {
        if (v.isChecked === true) {
          checkedGoodsPrice += v.total;
        }
      })
      console.log(checkedGoodsPrice)
      this.setData({
        checkedGoodsPrice: checkedGoodsPrice
      })

    }
    
  },
  checkedAll: function () {
    if (!this.data.isEditCart){
      var i;
      var cartGoods = this.data.cartGoods;
      var checkedAllStatus = this.data.checkedAllStatus;
      if (checkedAllStatus === false) {
        for (i in cartGoods) {
          cartGoods[i].isChecked = true
        }
        this.setData({
          cartGoods: cartGoods,
          checkedAllStatus: true,
        });
        this.getCheckedGoodsCount()
        this.getCheckedGoodsPrice()
      } else {
        for (i in cartGoods) {
          cartGoods[i].isChecked = false
        }
        this.setData({
          cartGoods: cartGoods,
          checkedAllStatus: false,
        });
        this.getCheckedGoodsCount()
        this.getCheckedGoodsPrice()
      }
    }else{
      var i;
      let deleteCartGoods = this.data.deleteCartGoods
      
      var checkedAllStatus = this.data.checkedAllStatus;
      if (checkedAllStatus === false) {
        for (i in deleteCartGoods) {
          deleteCartGoods[i].isChecked = true
        }
        this.setData({
          deleteCartGoods: deleteCartGoods,
          checkedAllStatus: true,
        });
        this.getCheckedGoodsCount()
        this.getCheckedGoodsPrice()
      } else {
        for (i in deleteCartGoods) {
          deleteCartGoods[i].isChecked = false
        }
        this.setData({
          deleteCartGoods: deleteCartGoods,
          checkedAllStatus: false,
        });
        this.getCheckedGoodsCount()
        this.getCheckedGoodsPrice()
      }

    }
    
    },
  editCart: function () {
    var that = this;
    console.log(this.data.isEditCart)
    if (this.data.isEditCart) {
      //this.getCartList();
      
      this.setData({
        isEditCart: !this.data.isEditCart
      });
      this.checkedAll()
      this.getCheckedGoodsCount()
      this.getCheckedGoodsPrice()
      console.log('cartGoods' + JSON.stringify(this.data.cartGoods));
      console.log('未编辑')
      console.log(this.data.isEditCart)
    } else {
      //编辑状态
      this.setdeleteCartGoods()
      
      this.setData({
        //deleteCartGoods: cartGoods
         isEditCart: !this.data.isEditCart,
          checkedAllStatus: false
  
      })
      this.getCheckedGoodsCount()
      this.getCheckedGoodsPrice()
      console.log('编辑')
      console.log(this.data.isEditCart)
      
    }
  },
  setdeleteCartGoods: function () {
    
    this.setData({
      deleteCartGoods: this.data.cartGoods
    })
    let temDeleteCartGoods = JSON.stringify(this.data.deleteCartGoods)

    let deleteCartGoods = JSON.parse(temDeleteCartGoods);
    var i
    for(i=0;i<deleteCartGoods.length;i++){
      deleteCartGoods[i].isChecked=false;
    }
    this.setData({
      deleteCartGoods: deleteCartGoods
    })
    console.log('setdeleteCartGoods')
    console.log(this.data.cartGoods)
    console.log(this.data.deleteCartGoods)
  },
  
  // cutNumber: function (event) {

  //   let itemIndex = event.target.dataset.itemIndex;
  //   let cartItem = this.data.cartGoods[itemIndex];
  //   let number = (cartItem.number - 1 > 1) ? cartItem.number - 1 : 1;
  //   cartItem.number = number;
  //   this.setData({
  //     cartGoods: this.data.cartGoods
  //   });
  //   this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);
  // },
  // addNumber: function (event) {
  //   let itemIndex = event.target.dataset.itemIndex;
  //   let cartItem = this.data.cartGoods[itemIndex];
  //   let number = cartItem.number + 1;
  //   cartItem.number = number;
  //   this.setData({
  //     cartGoods: this.data.cartGoods
  //   });
  //   this.updateCart(cartItem.product_id, cartItem.goods_id, number, cartItem.id);

  // },
  checkoutOrder: function () {
    //获取已选择的商品
    let that = this;

    var checkedGoods = this.data.cartGoods.filter(function (element, index, array) {
      if (element.isChecked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (checkedGoods.length <= 0) {
      return false;
    }
    console.log(checkedGoods)

    wx.navigateTo({
      url: '../shopping/checkout/checkout?checkedGoods=' + encodeURIComponent(JSON.stringify(checkedGoods)),
    })
  },
  deleteCart: function () {
    //获取已选择的商品
    let that = this;

    let productIds = this.data.deleteCartGoods.filter(function (element, index, array) {
      if (element.isChecked == true) {
        return true;
      } else {
        return false;
      }
    });

    if (productIds.length <= 0) {
      return false;
    }
    let newproductIds = this.data.deleteCartGoods.filter(function (element, index, array) {
      if (element.isChecked == false) {
        return true;
      } else {
        return false;
      }
    });

    var i=0;
    for(i;i<productIds.length;i++){
      util.request(api.CartProductDelect, {
        id: productIds[i].id ,
        buyerId: app.globalData.userInfo.id
      }, 'POST').then(function (res) {
        if (res.status === 1) {
          

          that.setData({
            deleteCartGoods: newproductIds,
            cartGoods: newproductIds
          });
        }

        that.setData({
          checkedAllStatus: that.isCheckedAll()
        });
      });
    }
    
  }
})