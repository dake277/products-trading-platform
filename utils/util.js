var api = require('../config/api.js')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// function request(url, data = {}, method = "GET") {
//   return new Promise(function (resolve, reject) {
//     wx.request({
//       url: url,
//       data: data,
//       method: method,
//       header: {
//         'Content-Type': 'application/json',
//         'Cookie': wx.getStorageSync('Cookie')
//       },
//       success: function (res) {
//         console.log("success");
//         console.log(res);

//         if (res.statusCode == 200) {

//           if (res.data.errno == 401) {
//             //需要登录后才可以操作

//             let code = null;
//             return login().then((res) => {
//               code = res.code;
//               return getUserInfo();
//             }).then((userInfo) => {
//               //登录远程服务器
//               console.log(userInfo);
//               request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
//                 if (res.errno === 0) {
//                   //存储用户信息
//                   wx.setStorageSync('userInfo', res.data.userInfo);
//                   wx.setStorageSync('token', res.data.token);

//                   resolve(res);
//                 } else {
//                   reject(res);
//                 }
//               }).catch((err) => {
//                 reject(err);
//               });
//             }).catch((err) => {
//               reject(err);
//             })
//           } else {
//             resolve(res.data);
//           }
//         } else {
//           reject(res.errMsg);
//         }

//       },
//       fail: function (err) {
//         reject(err)
//         console.log("failed")
//       }
//     })
//   });
// }
function request(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'Cookie': wx.getStorageSync('Cookie')
      },
      success: function (res) {
        console.log("success");
        console.log(res);

        if (res.statusCode == 200) {
           resolve(res.data);
          
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}



function get(url, data = {}) {
  return request(url, data, 'GET')
}

function post(url, data = {}) {
  return request(url, data, 'POST')
}

function requestZh(url, data = {}, method = "GET") {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Cookie': wx.getStorageSync('Cookie')
      },
      scriptCharset: 'utf-8',
      success: function (res) {
        console.log("success");
        console.log(res);

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作

            let code = null;
            return login().then((res) => {
              code = res.code;
              return getUserInfo();
            }).then((userInfo) => {
              //登录远程服务器
              console.log(userInfo);
              request(api.AuthLoginByWeixin, { code: code, userInfo: userInfo }, 'POST').then(res => {
                if (res.errno === 0) {
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('token', res.data.token);

                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function (err) {
        reject(err)
        console.log("failed")
      }
    })
  });
}


function login() {
  return new Promise(function (resolve, reject) {
    
    wx.login({
        success: function (res) {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res);
          }
        },
        fail: function (err) {
          reject(err);
        }
      });
    
  });
}

function getUserInfo() {
  return new Promise(function (resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        if (res.detail.errMsg === 'getUserInfo:ok') {
          resolve(res);
        } else {
          reject(res)
        }
      },
      fail: function (err) {
        reject(err);
      }
    })
  });
}

// function redirect(url) {

//   if (false) {
//     wx.redirectTo({
//       url: '/pages/auth/login/login'
//     });
//     return false;
//   } else {
//     wx.redirectTo({
//       url: url
//     });
//   }
// }

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  formatTime,
  request,
  get,
  post,
 
  showErrorToast,
 
  login,
  getUserInfo,
  requestZh,
}


