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
  // onReady() {
  //   if (app.globalData.character != null) {
  //       wx.redirectTo({
  //         url: '/pages/index/index'
  //       })
  //   }
  // },
  login(e) {
    let _this = this;
    wx.showLoading({
      title: '正在授权'
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
    
      // 登录
      wx.request({
        url: app.globalData.domain + 'api/wx/login',
        method: 'POST',
        data: {
          code: app.globalData.code
        },
        success: function (res) {
          if (res.data.code == 1) {
            app.globalData.token = res.data.data.token;
            _this.getOpenId();
            _this.isTutor();
          }
        }
      })
  },
  // 判断是否为导师
  isTutor(){
    wx.request({
      url: app.globalData.domain + 'queue/isTutor',
      header: {
        'token': app.globalData.token
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code == 1) {
          wx.hideLoading();
          app.globalData.character = res.data.data;
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
  },
  // 获取openid
  getOpenId(){
    wx.request({
      url: app.globalData.domain + 'api/wx/openId',
      header: {
        token : app.globalData.token
      },
      method : 'POST',
      success(res){
        if(res.data.code == 1){
          app.globalData.openId = res.data.data;
        }
      }
    })
  },
  subscribe(){
        // 订阅消息
        wx.requestSubscribeMessage({
          tmplIds: ['MKHUGNsRQJvTzhCsXQssYd-GWF2ou-G1UFfE5VoRn18','BqEm1aEJndFyQ_J9NEmCGPVdbf7V1zPnr7N7WxlqWSY','h6I5OGl4i5VH03wCNi363IDXn3ioVooMQH_F-35ZDTg'],
          success(res){
            console.log(res);
          },
          fail(res){
            console.log(res);
          }
        })
  }

})