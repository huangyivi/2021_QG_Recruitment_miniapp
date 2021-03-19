// pages/about/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {}
  },

  
  onLoad: function () {
    this.data.detail = app.globalData.detail;
    this.setData({
      detail : app.globalData.detail
    })
  },
  back(){
    wx.navigateBack();
  },  
  preview(){
    let url = this.data.detail.img;
    wx.previewImage({
      current: url
    })
  },
  onShareAppMessage(){
    return {
      title: "QG AI Lab",
      desc: "小平科技创新团队",
      path: "/pages/login/login",
      imageUrl: "/static/images/QGStudio.png"
    }
  },
})