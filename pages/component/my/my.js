const app = getApp();
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
      value: 'My'
    },
    
  },

  /* 组件的初始数据 */
  data: {
    userInfo:{}
  },

  /* 组件声明周期函数 */
  lifetimes: {
    attached: function () {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    },
    moved: function () {

    },
    detached: function () {

    },
  },

  /* 组件的方法列表 */
  methods: {
    onReady: function () {
      // 页面渲染完成
    },
    onShow: function () {
      // 页面显示
      let that=this;
      
      
      console.log(userInfo)
    },
    onHide: function () {
      // 页面隐藏
    },
    onUnload: function () {
      // 页面关闭
    },
    loginOut:function(){
      var that = this;
      wx.showModal({

        title: '',
        confirmColor: '#b4282d',
        content: '退出登录？',
        success: function (res) {

          console.log(res);
          if (res.confirm) {
            util.request(api.UserLoginOut);
            
            wx.reLaunch({
              url: '/pages/FirstIndex/FirstIndex',
            });

          }
        }
      })
    }

  }

})