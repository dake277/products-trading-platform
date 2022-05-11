const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
const app = getApp();

Page({

  data: {
    innerCategories:[
      {
        
        'name':'蔬菜',
        'id':'1'
        
      },
      {
        
        'name': '水果',
        'id':'2'
        
      },
      {
       
        'name': '畜牧',
        'id':'3'
        
      },
      {
        
        'name': '水产品',
        'id'  :'4'
        
      }
    ],
    inputInfo:{
        productName:'',
        count:'',
        price:'',
        depict:'',
        categorize:'',
        userId: (app.globalData.userInfo.id).toString(),
        url:''
    },
    SliderPaneldisplay:'false',
    // SliderPanelminHeight:0,
    // SliderPanelbackgroundColor: '#F8F8F8',
    currentValue:'',
    tempFilePaths:[]
  },


  onLoad: function (options) {
    
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
 
  showInner:function(){
    this.setData({
      SliderPaneldisplay:'true'
    })
  },
  SliderPanelclose: function () {
    this.setData({
      SliderPaneldisplay: 'false'
    })
  },
  radio: function (e) {
    
    this.setData({
      'inputInfo.categorize': e.detail.value,
        'currentValue': this.data.innerCategories[e.detail.value - 1].name,
      SliderPaneldisplay: 'false'
      
    })
    console.log(e)
  },
  inputproductName: function (e) {
    this.setData({
      'inputInfo.productName': e.detail.value, 
    })
  },
  inputDepict: function (e) {
    this.setData({
      'inputInfo.depict': e.detail.value,
    })
  },
  inputPrice: function (e) {
    this.setData({
      'inputInfo.price': (e.detail.value).toString(),
    })
  },
  inputCount: function (e) {
    this.setData({
      'inputInfo.count': (e.detail.value).toString(),
    })
  },

  submitInfo: function (e) {
    
    this.finalUploader().then((res)=>{
  
    
      return util.request(api.BuyerAddGoods, res, 'POST')
    }).then((res)=>{
        if(res.status==1){
          wx.navigateTo({
            url: '/pages/addGoodsResult/addGoodsResult?status=1',
          })
          
        }else{
          wx.navigateTo({
            url: '/pages/addGoodsResult/addGoodsResult?status=0',
          })
          
        }
      console.log(res)
    });
  },
  imageUploader: function () {
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        console.log('chooseImage success, temp path is: ', tempFilePaths[0])
        that.setData({
          tempFilePaths: tempFilePaths[0]
        })
               
      }
    })
  },
  finalUploader: function (){
    let that = this
    return new Promise(function (resolve, reject) {
    
    var tempFilePaths = that.data.tempFilePaths
    
    var myDate = new Date()
    var ossPath = 'seekings/' + myDate.getFullYear()
    var pathArr = tempFilePaths.split('.')
    //  随机生成文件名称
    var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000)
    var fileName = fileRandName + '.' + pathArr[3]
    // 要提交的key
    var fileKey = ossPath + '/' + fileName

    wx.uploadFile({
      url: 'https://graduate-image.oss-cn-hangzhou.aliyuncs.com',//上传的路径
      filePath: tempFilePaths,
      name: 'file',
      formData: {
        name: tempFilePaths,
        key: fileName,//上传图片的名字和路径（默认路径根目录，自定义目录：xxx/xxx.png）
        policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0xMC0yMFQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
        OSSAccessKeyId: "LTAI4G5ucZbaabHwNTJqdztm",
        success_action_status: "200",
        signature: "p/n4MUw7BhTGEOVsQfWe0ICm5d0=",
      },
      success: function (res) {
        console.log('chooseImage success, temp path is: ', tempFilePaths)
        wx.showToast({
          title: "上传成功",
          icon: 'success',
          duration: 1000
        })
        that.setData({
          'inputInfo.url': 'https://graduate-image.oss-cn-hangzhou.aliyuncs.com/' + fileName
        })
        let inputInfo = that.data.inputInfo
        console.log(inputInfo)
        resolve(inputInfo);
      },
      fail: function ({ errMsg }) {
        console.log('upladImage fail, errMsg is: ', errMsg)
        wx.showToast({
          title: "上传失败",
          duration: 1000
        })
        reject(false);
      },
    })
  })
  }
})