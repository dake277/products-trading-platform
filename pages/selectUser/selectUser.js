

Page({
  data: {
    currentIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  navigateToConsumer: function (options){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  navigateToManager:function()
  {
    wx.reLaunch({
      url: '/pages/managerIndex/managerIndex',
    })
  },
  pagechange:function(e){
    if("touch"==e.detail.source){
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }

  },
  
  titleClick:function(e){
    console.log(e)
    let currentIndex=
      this.setData({
        currentIndex:e.currentTarget.dataset.idx
      })
  }
})