// pages/login/login.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    console.log(this.data.userInfo);
  },
  onReady() {
    if (app.globalData.character != null) {
      if (app.globalData.character == 1) {
        wx.redirectTo({
          url: './pages/calling/calling'
        })
      } else {
        wx.redirectTo({
          url: './pages/interview/interview'
        })
      }
    }
  },
  login(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    
    if (app.globalData.character) {
      if (app.globalData.character == 1) {
        wx.redirectTo({
          url: '../calling/calling'
        })
      } else {
        wx.redirectTo({
          url: '../pages/interview/interview'
        })
      }
    } else {
      // 登录
      wx.request({
        url: app.globalData.domain + 'api/wx/login',
        method: 'POST',
        data: {
          // appId: 'wx931621df7e90d78f',
          code: app.globalData.code,
          // secret: '6bc320b953beff8d9636722dc8aee44d'
        },
        success: function (res) {
          console.log(res);
          if (res.data.code == 1) {
            app.globalData.token = res.data.data.token;
            wx.request({
              url: app.globalData.domain + 'queue/isTutor',
              header: {
                'token': app.globalData.token
              },
              method: 'POST',
              success: function (res) {
                if (res.data.code == 1) {
                  app.globalData.character = res.data.data;
                  if (res.data.data == 1) {
                    wx.redirectTo({
                      url: '../calling/calling'
                    })
                  } else {
                    wx.redirectTo({
                      url: '../interview/interview'
                    })
                  }
                }
              }
            })
          }
        }
      })
    }
  }
})