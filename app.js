// app.js
App({
  globalData: {
    userInfo: null,
    domain: 'https://recruit.qgailab.com/queue_api/',
    socket: 'wss://recruit.qgailab.com/qgWebsocket/queue/',
    // 识别用户身份：1为导师，-1为学生
    character: null,
    code: null,
    current: {},
    watchStudent: {},
    openId: ""
  },
  onLaunch() {
    wx.showLoading({
      title: '检测登录状态',
    })
    // 登录
    wx.checkSession({
      success: (res) => {
        // 登录状态未过期
        wx.hideLoading();
        if(!wx.getStorageSync('token')){
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              wx.request({
                url: this.globalData.domain + 'api/wx/login',
                method: 'POST',
                data: {
                  code: res.code
                },
                success: function (res) {
                  if (res.data.code == 1) {
                    wx.setStorageSync('token', res.data.data.token);
                    // wx.getStorageSync('token') = res.data.data.token;
                    // _this.getOpenId();
                    // _this.isTutor();
                  } else {
                    wx.showModal({
                      showCancel: false,
                      title: 'code验证失败！',
                      content: "请联系管理员反馈一下情况~",
                    })
                  }
                },
                fail: function (res) {
                  wx.showModal({
                    title: "服务器开小差了",
                    content: "请联系管理员反馈一下情况~",
                    showCancel: false
                  })
                }
              })
            }
          })
        }
      },
      fail: res => {
        // 登录状态过期了
        wx.hideLoading();;
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            wx.request({
              url: this.globalData.domain + 'api/wx/login',
              method: 'POST',
              data: {
                code: res.code
              },
              success: function (res) {
                if (res.data.code == 1) {
                  wx.setStorageSync('token', res.data.data.token);
                  // wx.getStorageSync('token') = res.data.data.token;
                  // _this.getOpenId();
                  // _this.isTutor();
                } else {
                  wx.showModal({
                    showCancel: false,
                    title: 'code验证失败！',
                    content: "请联系管理员反馈一下情况~",
                  })
                }
              },
              fail: function (res) {
                wx.showModal({
                  title: "服务器开小差了",
                  content: "请联系管理员反馈一下情况~",
                  showCancel: false
                })
              }
            })
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })


  },

})