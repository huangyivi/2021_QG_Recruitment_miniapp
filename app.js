// app.js
App({
  globalData: {
    userInfo: null,
    // domain: 'http://39.98.41.126:30002/',
    domain: 'https://recruit.qgailab.com/queue_api/',
    socket: 'wss://recruit.qgailab.com/qgWebsocket/queue/',
    // 识别用户身份：1为导师，-1为学生
    character: null,
    code: null,
    current: {},
    watchStudent: {},
    openId: null
  },
  onLaunch() {
    let _this = this;
    if(!wx.getStorageSync('token')){
      this.firstLogin();
    }else{
      // 本地缓存有token
      // 判断token是否过期
      let token = wx.getStorageSync('token');
      wx.request({
        url: _this.globalData.domain + 'api/wx/openId',
        header: {
          token : token
        },
        method : 'POST',
        success(res){
          if(res.data.code == 1){
            _this.globalData.openId = res.data.data;
          }else if(res.data.code = -1){
            _this.firstLogin();
          }
        }
      })
    }

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
  firstLogin(){
    wx.showLoading({
      title: '正在登录...',
    })
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
            wx.hideLoading();
            if (res.data.code == 1) {
              wx.setStorageSync('token', res.data.data.token);
            } else {
              wx.showModal({
                showCancel: false,
                title: 'code验证失败！',
                content: "请联系管理员反馈一下情况~",
              })
            }
          },
          fail: function (res) {
            wx.hideLoading();
            wx.showModal({
              title: "服务器开小差了",
              content: "请联系管理员反馈一下情况~",
              showCancel: false
            })
          }
        })
      }
    })
  },
    // 判断是否为导师
    isTutor(token){
      let _this = this;
      // console.log(token);
      wx.request({
        url: _this.globalData.domain + 'queue/isTutor',
        header: {
          'token': token
        },
        method: 'POST',
        success: function (res) {
          wx.stopPullDownRefresh();
          if (res.data.code == 1) {
            wx.hideLoading();
            _this.globalData.character = res.data.data;
            wx.redirectTo({
              url: '../index/index',
            })
          }else if(res.data.code == -1){
            _this.firstLogin();
          }else{
            wx.hideLoading();
            wx.showModal({
              showCancel: false,
              title: "登录失败！",
              content: '*请刷新后重试'
            })
          }
        }
      })
    },
    // 获取openid
    getOpenId(token){
      let _this = this;
      if(!this.globalData.openId){
        wx.request({
          url: _this.globalData.domain + 'api/wx/openId',
          header: {
            token : token
          },
          method : 'POST',
          success(res){
            if(res.data.code == 1){
              // console.log('openid:' + res.data.data);
              _this.globalData.openId = res.data.data;
            }else if(res.data.code == -1){
              _this.firstLogin();
            }
          }
        })
      }
      
    },

})