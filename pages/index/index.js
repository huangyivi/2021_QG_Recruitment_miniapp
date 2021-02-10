// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   isChecked : 0,
   isOpen : false,
   isTutor : -1
  },
  onLoad(){
    let flag = app.globalData.character;
    this.data.isTutor = flag;
    this.setData({
      isTutor : flag
    });

  },
  toInterview(){
    wx.navigateTo({
      url: '../interview/interview'
    })
  },
  toCalling(){
    wx.navigateTo({
      url: '../calling/calling'
    })
  },
  alert(){
    wx.showModal({
      showCancel: false,
      title: '面试还未开始哦~',
      content: '先看看我们的团队介绍吧！'
    })
  }
})
