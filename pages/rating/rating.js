// pages/rating/rating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus : false,
    isReady : false
  },
  changeFocus(){
    this.data.isFocus = !this.data.isFocus;
    this.setData({
      isFocus : this.data.isFocus
    })
  },
  changeStatus(){
    this.data.isReady = !this.data.isReady;
    this.setData({
      isReady : this.data.isReady
    })
  },
  toMore(){
    wx.navigateTo({
      url: '../more/more',
    })
  },
  back(){
    wx.navigateBack();
  }
})