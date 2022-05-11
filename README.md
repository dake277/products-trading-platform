### 农产品交易平台（微信小程序端）
这是一个商品交易小程序，包括买家和卖家两种用户使用的版本，支持微信授权和手机号登录，服务端api基于SpringBoot+MySQL

### 买家功能列表
+ 首页
+ 分类首页、分类商品、新品首发、人气推荐商品页面
+ 商品详情页面，包含加入购物车、收藏商品
+ 搜索功能
+ 完整的购物流程，商品的加入、编辑、删除、批量选择，收货地址的选择，下单支付

### 买家功能列表
+ 商户工作台首页
+ 商户订单管理功能，包含查看、删除、发货
+ 商户数据可视化
+ 商品的管理，包括添加商品、下架商品


### 项目截图

[首页](https://github.com/dake277/products-trading-platform/blob/master/images/index.png)

![专题](http://upload-images.jianshu.io/upload_images/3985656-bd606aac3b5491c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

![分类](http://upload-images.jianshu.io/upload_images/3985656-fa9565158376d439.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

![商品列表](http://upload-images.jianshu.io/upload_images/3985656-788b7fd2c4a558d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

![商品详情](http://upload-images.jianshu.io/upload_images/3985656-99a6e0a57778d85f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

![购物车](http://upload-images.jianshu.io/upload_images/3985656-60ff2307d81f6bb2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)

![订单中心](http://upload-images.jianshu.io/upload_images/3985656-dff837e6b2ec87b3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/320)





### 项目结构
```
products-trading platform
├── README.md
├── app.js
├── app.json
├── app.wxss
├── config
│   └── api.js
├── ec-canvas
│   ├── ec-canvas.js
│   ├── ec-canvas.json
│   ├── ec-canvas.wxml
│   ├── ec-canvas.wxss
│   ├── echarts.js
│   └── wx-canvas.js
├── images
│   └── index.png
├── jsconfig.json
├── lib
│   └── wxParse
├── pages
│   ├── FirstIndex
│   ├── addGoodsResult
│   ├── addgoods
│   ├── auth
│   ├── buyerEdit
│   ├── buyerOrderDetail
│   ├── buyergoodsManager
│   ├── cart
│   ├── catalog
│   ├── category
│   ├── comment
│   ├── commentPost
│   ├── component
│   ├── goods
│   ├── index
│   ├── logs
│   ├── managerIndex
│   ├── managerRefund
│   ├── newGoods
│   ├── noFinishOrder
│   ├── pay
│   ├── payResult
│   ├── refundDetail
│   ├── refundResult
│   ├── search
│   ├── selectUser
│   ├── selectpage
│   ├── shopping
│   ├── showEchart
│   ├── signup
│   ├── ucenter
│   ├── userDetail
│   └── userInfo
├── project.config.json
├── services
│   └── user.js
├── sitemap.json
├── static
│   └── images
├── typings
│   └── wx.d.ts
├── utils
│   └── util.js
└── weui.wxss
```
