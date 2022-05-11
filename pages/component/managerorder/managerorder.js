var app = getApp();
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Component({

  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Order1'
    }
  },

  /* 组件的初始数据 */
  data: {
    tab: {
      list: [
        { id: '0', title: '全部' },
        { id: '1', title: '已完成' },
        { id: '2', title: '待发货' },
        
        
      ],
      expand: [
        { id: '3', title: '待付款' },
        { id: '4', title: '待评价' },
        { id: '5', title: '已完成' },
        { id: '6', title: '已关闭' },
        { id: '7', title: '待退款' },
        { id: '8', title: '已退款' }
      ],
      expandDefaultText: '其他状态',
      selectedId: '0',
      scroll: false,
      finishOrderList:[],
      TotalOrderList: [],
      nofinishOrderList:[],
      noPayOrderList: [],
      finaList:[],
      
    },
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      
      this.getTotalOrderList();
      console.log(this.data.TotalOrderList)
    },
    moved: function () {
      // this.handleTabChange();
      this.getTotalOrderList();
    },
    detached: function () {
      this.getTotalOrderList();
    },
  },

  /* 组件的方法列表 */
  methods: {
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
    handleTabChange:function(e){
      let that = this;
      that.setData({
        'tab.selectedId': e.currentTarget.dataset.itemId

      })
      
      if (that.data.tab.selectedId ==0){
        this.setData({
          finaList: that.data.TotalOrderList
        })
      }
      if (that.data.tab.selectedId == 1) {
        that.setData({
          finaList: that.data.finishOrderList
        })
      }
      if (that.data.tab.selectedId == 2) {
        this.setData({
          finaList: that.data.nofinishOrderList
        })
      }
      // if (that.data.tab.selectedId == 1) {
      //   this.setData({
      //     finaList: this.data.TotalOrderList
      //   })
      // }
      
      console.log(that.data.tab.selectedId)
      console.log(that.data.finaList)
      
    },
    getTotalOrderList: function (e) {
      let id = (app.globalData.userInfo.id).toString()
       let nofinishOrderList;
       let finishOrderList;
       let total;
      let noPayOrderList;
       let that=this
      util.request(api.BuyerOrderList, { id: id, is_address: '1' }, "POST").then((res)=>  {
            this.setData({
              finishOrderList:res.data
            })
        
          
      }).then((res) =>{
        util.request(api.BuyerOrderList, { id: id, is_address: '0' }, "POST").then((res) => {
          nofinishOrderList = res.data
          console.log(res.data)
          total = this.data.finishOrderList.concat(nofinishOrderList)
          noPayOrderList = this.data.finishOrderList.filter(function (element, index, array) {
            if (element.isDelete == 0) {
              return true;
            } else {
              return false;
            }
          });
          this.setData({
            TotalOrderList: total,
            nofinishOrderList: nofinishOrderList,
            //finishOrderList: finishOrderList,
            //noPayOrderList: noPayOrderList,
            finaList: total
          })
          console.log(this.data.TotalOrderList)
        })
      })
      
    },
    
    getDeleteOrderList: function (e){

    },
    navDetail:function(e) {
      console.log(e)
      console.log(this.data.finaList)
      let result=this.data.finaList[e.currentTarget.dataset.id]
        wx.navigateTo({
          url: '/pages/buyerOrderDetail/buyerOrderDetail?result='+JSON.stringify(result),
        })
    }


  }
  

})