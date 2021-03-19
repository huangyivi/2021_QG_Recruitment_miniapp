// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  back(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  },
  onShow(){
    // let animation = wx.createAnimation({
    //   delay: 0,
    //   duration: 1000,
    //   timingFunction: "ease"
    // })
    // this.animation = animation;

  }
})