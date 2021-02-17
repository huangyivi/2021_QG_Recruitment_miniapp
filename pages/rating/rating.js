// pages/rating/rating.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: false,
    isReady: false,
    isCommented: false,
    grade: '',
    ps: '',
    student: {}
  },
  onLoad() {
    this.data.student = app.globalData.current;
    this.setData({
      student: app.globalData.current
    })
  },
  // 是否特别关注
  changeFocus() {
    this.data.isFocus = !this.data.isFocus;
    this.setData({
      isFocus: this.data.isFocus
    })
  },
  // 切换状态
  changeStatus() {
    this.data.isReady = !this.data.isReady;
    this.setData({
      isReady: this.data.isReady
    })
  },
  // 查看更多信息
  toMore() {
    wx.navigateTo({
      url: '../more/more',
    })
  },
  // 返回上一页
  back() {
    wx.navigateBack();
  },
  // 捕获输入
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
  // 叫号
  next() {
    if (this.data.isCommented) {
      wx.showLoading({
        title: '叫号中'
      })
      let _this = this;
      wx.request({
        url: app.globalData.domain + 'queue/tutor/callNumber',
        header: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        success(res) {
          if (res.data.code == 1) {
            app.globalData.current = res.data.data;
            _this.data.isCommented = false;
            _this.data.grade = '';
            _this.data.ps = '';
            _this.data.isFocus = false;
            _this.data.isReady = false;
            _this.data.student = res.data.data;
            _this.setData({
              isCommented: false,
              grade: '',
              ps: '',
              isFocus: false,
              isReady: false,
              student: res.data.data
            })

            wx.hideLoading();
          }else{
            wx.showModal({
              title : res.data.msg,
              showCancel : true
            })
            wx.hideLoading();
          }
        }
      })
    }
  },
  // 检查是否填好信息
  checkIsReady() {
    if (this.data.grade != '' && this.data.ps != '' && this.data.student != null) {
      this.data.isReady = true;
      this.setData({
        isReady: true
      })
    } else {
      this.data.isReady = false;
      this.setData({
        isReady: false
      })
    }
  },
  // 提交评价
  comment() {
    if (this.data.isReady) {
      wx.showLoading({
        title: '评价中'
      })
      let _this = this;
      wx.request({
        url: app.globalData.domain + 'queue/tutor/comment',
        header: {
          token: wx.getStorageSync('token')
        },
        method: "POST",
        data: {
          score: _this.data.grade,
          mark: _this.data.ps,
          isNotice: _this.data.isFocus,
          openId: _this.data.student.openId
        },
        success(res) {
          // console.log(res);
          if (res.data.code == 1) {
            _this.data.isCommented = true;
            _this.setData({
              isCommented: true
            });
            wx.showModal({
              showCancel : false,
              title : "评价成功！"
            })
            wx.hideLoading();
          }
          else{
            wx.showModal({
              showCancel : false,
              title : "评价失败！"
            })
            wx.hideLoading()
          }
        }
      })
    }
  }
})