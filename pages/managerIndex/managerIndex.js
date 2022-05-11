let app = getApp()

Page({
  data: {
    currentTab: 0,
    items: [
      {
        "iconPath": "/static/images/ic_menu_choice_nor.png",
        "selectedIconPath": "/static/images/ic_menu_choice_pressed.png",
        "text": "工作台"
      },
      {
        "iconPath": "/static/images/order1.png",
        "selectedIconPath": "/static/images/order2.png",
        "text": "订单"
      },
      {
        "iconPath": "/static/images/ic_menu_me_nor.png",
        "selectedIconPath": "/static/images/ic_menu_me_pressed.png",
        "text": "店铺"
      }
    ]
  },
  swichNav: function (e) {
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  showOrder:function(){
    this.setData({
      currentTab:1
    })
    console.log(11)
  },
  onLoad: function (option) {
    console.log(app.globalData.userInfo)
  },
  onShow:function(){
    wx.hideHomeButton();
  }
})
