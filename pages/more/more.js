// pages/more/more.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student : {}
  },
  onLoad(){
    let _this = this;
    let openId = app.globalData.watchStudent.openId;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/studentInfo/' + openId,
      header : {
        token : app.globalData.token
      },
      method : 'POST',
      success(res){
        if(res.data.code == 1){
          let data = res.data.data;
          _this.data.student = data;
          _this.setData({
            student : data
          })
        }
      }
    })
  },
  back(){
    wx.navigateBack();
  }
})