// pages/enroll/enroll.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于控制按钮
    isFilled: false,

    colleges: ['计算机学院'],
    majors: ['计算机科学与技术', '软件工程', '信息安全', '网络工程'],
    directions: ['前端组', '后台组', '设计组', '图形组', '移动组', '数据挖掘组', '嵌入式组'],

    // 学生信息
    collegeIndex: 0,
    majorIndex: 0,
    directionIndex: 0,

    myName: '',
    myId: '',
    myGradePoint: '',
    myPhone: '',
    myQQ: '',
    mySituation: '',
    myIntroduction: '',
    // 用于控制css
    isNull: [false, false, false, false, false, false, false],
    isFocus: [false, false, false, false, false, false, false],
    // 字段是否合格
    isIdReady: true,
    isGradePointReady: true,
    isPhoneReady: true,
    isQQReady: true
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
  isNull(e) {
    // 检测输入是否为空
    var id = e.target.id;
    let focus = 'isFocus[' + id + ']';
    this.data.isFocus[id] = false;
    this.setData({
      [focus]: false
    })
    if (e.detail.value == '') {
      let key = 'isNull[' + id + ']';
      this.data.isNull[id] = true;
      this.setData({
        [key]: true
      })
      return true;
    } else {
      let key = `isNull[${id}]`;
      this.data.isNull[id] = false;
      this.setData({
        [key]: false
      })
      this.setBtn();
      return false;
    }


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
      [focus]: true
    })
  },
  // 检验学号是否符合规范
  validateId(e) {
    if (this.isNull(e)) return;
    let id = this.data.myId;
    if (/^3120|3220\d{6}$/.test(id)) {
      this.data.isIdReady = true;
      this.setData({
        isIdReady: true
      })
    } else {
      this.data.isIdReady = false;
      this.setData({
        isIdReady: false
      })
      // 重置状态
      this.data.isFilled = false;
      this.setData({
        'isFilled': false
      })
    }
  },
  // 检验绩点是否符合规范
  validateGP(e) {
    if (this.isNull(e)) return;
    let gp = this.data.myGradePoint;
    if (/^[0-5].\d{2}$/.test(gp)) {
      this.data.isGradePointReady = true;
      this.setData({
        isGradePointReady: true
      })
    } else {
      this.data.isGradePointReady = false;
      this.setData({
        isGradePointReady: false
      })
      // 重置状态
      this.data.isFilled = false;
      this.setData({
        'isFilled': false
      })
    }
  },
  // 检验电话是否符合规范
  validatePhone(e) {
    if (this.isNull(e)) return;
    let phone = this.data.myPhone;
    if (/^1[3|4|5|7|8|9]\d{9}$/.test(phone)) {
      this.data.isPhoneReady = true;
      this.setData({
        isPhoneReady: true
      })
    } else {
      this.data.isPhoneReady = false;
      this.setData({
        isPhoneReady: false
      })
      // 重置状态
      this.data.isFilled = false;
      this.setData({
        'isFilled': false
      })
    }
  },
  // 检验QQ是否符合规范
  validateQQ(e) {
    if (this.isNull(e)) return;
    let QQ = this.data.myQQ;
    if (/^[0-9]+$/.test(QQ)) {
      this.data.isQQReady = true;
      this.setData({
        isQQReady: true
      })

    } else {
      this.data.isQQReady = false;
      this.setData({
        isQQReady: false
      })
      // 重置状态
      this.data.isFilled = false;
      this.setData({
        'isFilled': false
      })
    }
  },
  // 提交表格表格
  submitForm() {
    if (this.data.isFilled) {
      let groupId = this.data.directionIndex;
      groupId++;

      let data = {
        name: this.data.myName,
        studentNum: this.data.myId,
        gradePoint: this.data.myGradePoint,
        academy: this.data.colleges[this.data.collegeIndex],
        openId: app.globalData.openId,
        majorClass: this.data.majors[this.data.majorIndex],
        phoneNum: this.data.myPhone,
        qq: this.data.myQQ,
        explaination: this.data.mySituation,
        selfEvaluation: this.data.myIntroduction,
        groupId: groupId,
      }
      wx.request({
        url: 'http://39.98.41.126:30007/recruit/signup',
        method: 'POST',
        data: data,
        success(res) {
          if (res.data.status) {
            wx.showModal({
              showCancel: false,
              title: '报名成功',
              content: '*若发现资料填写有误，\r\n请及时联系我们',
              confirmText: '返回主页',
              confirmColor: '#8366FC'
            })
          } else {
            wx.showModal({
              showCancel: false,
              title: '报名失败',
              content: '*服务器开小差了~，\r\n请联系管理员',
              confirmText: '返回填写',
              confirmColor: '#8366FC'
            })
          }

        }
      })
    }
  },
  checkForm() {
    let _this = this;
    if (this.data.isFilled) {
      wx.showModal({
        content: '确认提交报名表？',
        cancelText: '容我三思',
        cancelColor: '#B6B6B6',
        confirmText: '确认提交',
        confirmColor: '#8366FC',
        success: function (res) {
          if (res.confirm) {
            _this.submitForm();
          }
        }
      })
    }
  },
  back() {
    wx.navigateBack();
  },
  // 改变按钮状态
  setBtn() {
    // 重置状态
    this.data.isFilled = false;
    this.setData({
      'isFilled': false
    })
    if (this.data.isGradePointReady && this.data.isIdReady && this.data.myIntroduction && this.data.myName && this.data.isPhoneReady && this.data.isQQReady && this.data.mySituation) {
      // 检查所有是否为空
      for (let item of this.data.isNull) {
        if (item) return;
      }
      this.data.isFilled = true;
      this.setData({
        'isFilled': true
      })
    }
  }
})