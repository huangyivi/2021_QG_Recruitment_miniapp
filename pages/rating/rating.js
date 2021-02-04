// pages/rating/rating.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    isReady: false,
    grade : '',
    ps : ''
  },
  changeFocus() {
    this.data.isFocus = !this.data.isFocus;
    this.setData({
      isFocus: this.data.isFocus
    })
  },
  changeStatus() {
    this.data.isReady = !this.data.isReady;
    this.setData({
      isReady: this.data.isReady
    })
  },
  toMore() {
    wx.navigateTo({
      url: '../more/more',
    })
  },
  back() {
    wx.navigateBack();
  },
  changeInput(e) {
    let _this = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    let name = dataset.name;
    this.data[name] = value;
    this.setData({
      name: _this.data[name]
    });
  },
  next(){
    this.data.isReady = !this.data.isReady;
    this.setData({
      isReady : this.data.isReady
    })
  }
})