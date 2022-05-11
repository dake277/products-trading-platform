const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');
import * as echarts from '../../ec-canvas/echarts';
const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  util.request(api.ListCharts).then((res) => {
  var option = {
    
    legend: {
      data: ['蔬菜类', '水果类', '肉类', '水产品', '交易总额'],
      top: '1rpx',
      // left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    grid: {
      containLabel: true,
      left: '5rpx',
      top: '28%',
      padding: ['5rpx']
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: res.data.yearAndMonth,
      // show: false
    },
    yAxis: {
      name: '元/¥',
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }

    },
    series: [
      {
        name: '蔬菜类',
        type: 'line',
        data: res.data.vegetablesTotalCount
      },
      {
        name: '水果类',
        type: 'line',
        data: res.data.fruitTotalCount
      },
      {
        name: '肉类',
        type: 'line',
        data: res.data.meatTotalCount
      },
      {
        name: '水产品',
        type: 'line',
        data: res.data.aquaticTotalCount
      },
      {
        name: '交易总额',
        type: 'line',
        data: res.data.monthTotalCount
      }
    ]
  };
  chart.setOption(option);
  })
  return chart;
}


function initChart1(canvas, width, height) {
  const chart1 = echarts.init(canvas, null, {
    width: width,
    height: height,

  });
  canvas.setChart(chart1);

  var option = {
    title: {
      text: '分类数据统计',
      left: 'center'
    },
    legend: {
      data: ['蔬菜类', '水果类', '肉类', '水产品'],
      top: '14%',
      buttom:'10%',
      left: 'center',
      // backgroundColor: 'red',
      z: 100
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} ({d}%)'
    },
    series: [
      {
        type: 'pie',
        radius: '55%',
        center: ['45%', '55%'],
        selectedMode: 'single',
        data: [
          {
            value: 11042,
            name: '蔬菜类'
          },
          { value: 1773, name: '水果类' },
          { value: 22212, name: '肉类' },
          { value: 13433, name: '水产品' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  chart1.setOption(option);
  return chart1;
}


Page({
  data: {
    ec: {
      onInit: initChart
    },
    ec1: {
      onInit: initChart1
      
    },
    nextorderList:[],
    currentIndex: 0,
    totalorderCount:0,
    saleCount:0,
    Monthsale:0
  },
  onLoad: function (options) {
    //this.getPieOptions();
   
    this.init()
    //this.getMouthcount()
    
    console.log(app.globalData.userInfo)
  },
  onReady: function () {
    
  },
  onShow: function () {
    
  },
  onHide: function () {
    
  },
  onUnload: function () {
    
  },
  
  getPieOptions: function () {

    util.request(api.ListChartsPie).then( (res)=> {

      chart2.setOption = ({
        title: {
          text: '分类数据统计',
          left: 'center'
        },
        legend: {
          data: ['蔬菜类', '水果类', '肉类', '水产品'],
          top: '1rpx',
           left: 'center',
          // backgroundColor: 'red',
          z: 100
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)'
        },
        series: [
          {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
              {
                value: this.data.vegetablesTotal,
                name: '蔬菜类'
              },
              { value: this.data.fruitTotal, name: '水果类' },
              { value: this.data.meatTotal, name: '肉类' },
              { value: this.data.aquaticTotal, name: '水产品' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    })

  },
  // pagechange: function (e) {
  //   if ("touch" == e.detail.source) {
  //     let currentPageIndex = this.data.currentIndex
  //     currentPageIndex = (currentPageIndex + 1) % 2
  //     this.setData({
  //       currentIndex: currentPageIndex
  //     })
  //   }
  // },
  titleClick: function (e) {
    console.log(e)
    let currentIndex =
      this.setData({
        currentIndex: e.currentTarget.dataset.idx
      })
    console.log(this.data.currentIndex)
  },
  getTotalOrder:function(e){
    let id = (app.globalData.userInfo.id).toString()
    util.request(api.BuyerOrderList, { id: id, is_address: '0' }, "POST").then((res) => {
      this.setData({
        nextorderList: res.data
      })
      var nowDate = new Date();
      var day = nowDate.getDate();
      var mouth = nowDate.getMonth();
      var year = nowDate.getFullYear();
      var newDate = new Date(year, mouth, 1)
      var nextorderList = this.data.nextorderList
      var Monthsale=0;

    //   for (var i = 0; i < nextorderList.length; i++) {
    //     var tempDate = new Date((nextorderList[i].createTime).trim().split(' ')[0]) 
    //     if (newDate.getTime() < tempDate.getTime()) {
    //        Monthsale += nextorderList[i].total
    //     }
    //  }
    //   this.setData({
    //     Monthsale: Monthsale
    //   })

      this.data.nextorderList.forEach(function (v) {
      var tempDate = new Date((v.createTime).trim().split(' ')[0])
        if (newDate.getTime() < tempDate.getTime()) {
          Monthsale  += v.total
       }
     })
      
      this.setData({
         Monthsale: Monthsale
       })
      console.log(newDate)

    })
  },
  
  getorderCount: function () {
    //this.getTotalOrder();
    let firstorderCount = wx.getStorageSync('orderCount')
    let nextorderCount = wx.getStorageSync('noFinnishCount')
    // nextorderCount = this.data.nextorderList.length;

    this.setData({
      totalorderCount: nextorderCount + firstorderCount
    })
    console.log(firstorderCount)
    console.log(nextorderCount)
  },
  init: function () {
    this.setData({
      saleCount: (wx.getStorageSync('saleCount')).toFixed(2)
    })
    this.getorderCount()
    this.getTotalOrder();
  }
});