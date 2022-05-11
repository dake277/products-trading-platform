const ApiRootUrl = 'http://127.0.0.1:8081/graduation/';
const ApiSpringUrl = 'http://127.0.0.1:8081/graduation/';
//const ApiRootUrl = 'http://127.0.0.1:8360/api/';
module.exports = {
  IndexUrl: ApiRootUrl + 'index/index', //首页数据接口
  CatalogList: ApiRootUrl + 'catalog/index',  //分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + 'catalog/current',  //分类目录当前分类数据接口
  
  
  UserLogin: ApiRootUrl + 'login/auth', //账号密码登录
  GetUserInfo: ApiRootUrl + 'login/getInfo',//获取用户信息
  IndexList: ApiRootUrl +'product/list' ,//获取首页数据
  ProductDetail: ApiRootUrl +'product/findOne',//获取商品详情
  ProductCategory: ApiRootUrl + 'product/categorizeList',  //获得分类数据
  GetCartList: ApiRootUrl + 'order/userOrderList',//获取购物车数据
  ProductCartAdd: ApiRootUrl +'order/createOrder',//添加购物车
  UpdateUserInfo: ApiRootUrl +'user/update' ,//修改用户信息
  OrderPay: ApiRootUrl +'order/finishList', //付款
  CartProductDelect: ApiRootUrl +'order/deleteOrder',//购物车删除
  ListOrder: ApiRootUrl +'order/finishOrderList',//订单展示
  UpdateOrder: ApiRootUrl +'order/updateOrder',//订单更新
  AddCollect: ApiRootUrl +'collect/add', //添加收藏
  DeleteCollect: ApiRootUrl + 'collect/delete', //删除收藏
  ListCollect: ApiRootUrl + 'collect/list', //展示收藏
  ListCharts: ApiRootUrl +'charts/list',//销售展示
  ListChartsPie: ApiRootUrl +'charts/cake',//饼图展示
  BuyerOrderList: ApiRootUrl + 'order/address', //商户订单展示
  BuyerGoodsList: ApiRootUrl +'product/blist',//商户商品展示
  BuyerAddGoods: ApiRootUrl +'product/add',//商户新增商品
  FindGoodsByName: ApiRootUrl +'product/listByName',//名字搜索
  GetUserList: ApiRootUrl +'user/list',//获取用户列表
  FindById: ApiRootUrl +'user/findById',//根据ID查找
  UserSignUp: ApiRootUrl +'user/add',//用户注册
  UserLoginOut: ApiRootUrl +'login/logout',//退出登录
  GoodsRefund: ApiRootUrl +'refunds/addRefunds',//退款
  ListRefund: ApiRootUrl +'refunds/list',//退款展示
  AgreeRefund: ApiRootUrl +'refunds/refunds',//同意退款
  ListALLRefund: ApiRootUrl +'refunds/listA',//全部退款
  FinishOrder: ApiRootUrl +'order/finishaddress',//发货

  GoodsCount: ApiRootUrl + 'goods/count',  //统计商品总数
  GoodsList: ApiRootUrl + 'goods/list',  //获得商品列表
  GoodsCategory: ApiRootUrl + 'goods/category',  //获得分类数据
  GoodsDetail: ApiRootUrl + 'goods/detail',  //获得商品的详情

  

  
  CartList: ApiRootUrl + 'cart/index', //获取购物车的数据
  CartAdd: ApiRootUrl + 'cart/add', // 添加商品到购物车
  CartUpdate: ApiRootUrl + 'cart/update', // 更新购物车的商品
  CartDelete: ApiRootUrl + 'cart/delete', // 删除购物车的商品
  CartChecked: ApiRootUrl + 'cart/checked', // 选择或取消选择商品
  CartGoodsCount: ApiRootUrl + 'cart/goodscount', // 获取购物车商品件数
  CartCheckout: ApiRootUrl + 'cart/checkout', // 下单前信息确认

  OrderSubmit: ApiRootUrl + 'order/submit', // 提交订单
  PayPrepayId: ApiRootUrl + 'pay/prepay', //获取微信统一下单prepay_id

  CollectList: ApiRootUrl + 'collect/list',  //收藏列表
  CollectAddOrDelete: ApiRootUrl + 'collect/addordelete',  //添加或取消收藏

  
  

  SearchIndex: ApiRootUrl + 'search/index',  //搜索页面数据
  SearchResult: ApiRootUrl + 'search/result',  //搜索数据
  SearchHelper: ApiRootUrl + 'search/helper',  //搜索帮助
  SearchClearHistory: ApiRootUrl + 'search/clearhistory',  //搜索帮助

  AddressList: ApiRootUrl + 'address/list',  //收货地址列表
  AddressDetail: ApiRootUrl + 'address/detail',  //收货地址详情
  AddressSave: ApiRootUrl + 'address/save',  //保存收货地址
  AddressDelete: ApiRootUrl + 'address/delete',  //保存收货地址
  
};