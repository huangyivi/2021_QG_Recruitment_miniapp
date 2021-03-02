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
    this.autoLogin();
  },
  // 初始化登录
  autoLogin(){
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
    let that = this;
    // 判断是否已订阅消息
    wx.showLoading({
      title: '正在授权'
    })
    wx.getSetting({
      withSubscriptions: true,
      success(res){
        let itemSettings = res.subscriptionsSetting.itemSettings;
        wx.hideLoading();
        if(itemSettings){
          if(itemSettings['BqEm1aEJndFyQ_J9NEmCGPVdbf7V1zPnr7N7WxlqWSY'] === 'accept' && itemSettings['MKHUGNsRQJvTzhCsXQssYd-GWF2ou-G1UFfE5VoRn18'] === 'accept' && itemSettings['h6I5OGl4i5VH03wCNi363OH_izEyiJkjdLf4EfPJZds'] === 'accept'){
            let token = wx.getStorageSync('token')
            app.getOpenId(token);
            app.isTutor(token);
          }

        }
      }
    })
  },
  login(e) {

    wx.showLoading({
      title: '正在授权'
    })
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  subscribe(){
        // 订阅消息
        wx.requestSubscribeMessage({
          tmplIds: ['MKHUGNsRQJvTzhCsXQssYd-GWF2ou-G1UFfE5VoRn18','BqEm1aEJndFyQ_J9NEmCGPVdbf7V1zPnr7N7WxlqWSY','h6I5OGl4i5VH03wCNi363OH_izEyiJkjdLf4EfPJZds'],
          success(res){
            wx.hideLoading();
            let token = wx.getStorageSync('token')
            app.getOpenId(token);
            app.isTutor(token);
          },
          fail(res){
            wx.hideLoading();
          }
        })
  },
  onPullDownRefresh(){
    this.autoLogin();
  },
  justWatch(){
    wx.redirectTo({
      url: '../index/index',
    })
  }

})