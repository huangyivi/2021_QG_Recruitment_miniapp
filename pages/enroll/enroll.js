// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    colleges: ['计算机学院', '外国语学院'],
    majors: ['信息安全', '网络工程'],
    directions: ['前端组', '后台组', '数据挖掘组', '嵌入式组', '移动组', '设计组', '图形组'],
    isFilled: false,

    collegeIndex: 0,
    majorIndex: 0,
    directionIndex: 0,

    myName: '',
    myId: '',
    myCollege: '计算机学院',
    myMajor: '信息安全',
    myGradePoint: '',
    myPhone: '',
    myQQ: '',
    mySituation: '',
    myDirection: '前端组',
    myIntroduction: '',

    isNull: [false, false, false, false, false, false, false],
    isFocus: [false, false, false, false, false, false, false],
    isReady: [false, false, false, false, false, false, false],
  },
  inputChange(e) {
    let _this = this;
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    let name = dataset.name;
    this.data[name] = value;
    this.setData({
      name: _this.data[name]
    });
  },
  collegeChange(e) {
    // 学院改变，专业跟着改变
    this.data.collegeIndex = e.detail.value;
    this.setData({
      collegeIndex: this.data.collegeIndex
    })
  },
  majorChange(e) {
    // 改变专业
    this.data.majorIndex = e.detail.value;
    this.setData({
      majorIndex: this.data.majorIndex
    })
  },
  directionChange(e) {
    // 改变方向
    this.data.directionIndex = e.detail.value;
    this.setData({
      directionIndex: this.data.directionIndex
    })
  },
  checkForm() {
    if (this.data.isFilled) {
      wx.showModal({
        content: '确认提交报名表？',
        cancelText: '容我三思',
        cancelColor: '#B6B6B6',
        confirmText: '确认提交',
        confirmColor: '#8366FC',
        success: function (res) {
          if (res.confirm) {
            wx.showModal({
              showCancel: false,
              title: '报名成功',
              content: '*若发现资料填写有误，\r\n请及时联系我们',
              confirmText: '返回主页',
              confirmColor: '#8366FC'
            })
          }
        }
      })
    }
  },
  isNull(e) {
    // 检测输入是否为空
    let id = e.target.id;
    let focus = 'isFocus[' + id + ']';
    this.data.isFocus[id] = false;
    this.setData({
      [focus] : false
    })
    if (e.detail.value == '') {
      let key = 'isNull[' + id + ']';
      this.data.isNull[id] = true;
      this.setData({
        [key]: true
      })
    } else {
      let key = 'isReady[' + id + ']';
      this.data.isReady[id] = true;
      this.setData({
        [key]: true
      })
    }
    for (let item of this.data.isReady) {
      if (!item) return;
    }
    this.data.isFilled = true;
    this.setData({
      'isFilled': true
    })
  },
  toNormal(e) {
    // 将选中框样式设置为选中态
    let id = e.target.id;
    let val = 'isNull[' + id + ']';
    this.data.isNull[id] = false;
    this.setData({
      [val]: false
    })

    let focus = 'isFocus[' + id + ']';
    this.data.isFocus[id] = true;
    this.setData({
      [focus] : true
    })
  }
})