// pages/enroll/enroll.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用于控制按钮
    isFilled: false,

    colleges: ['正在获取中'],
    majors: [['正在获取中']],
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
    myClass: '',
    // 用于控制css
    isNull: [false, false, false, false, false, false, false,false],
    isFocus: [false, false, false, false, false, false, false,false],
    // 字段是否合格
    isNameReady: true,
    isIdReady: true,
    isGradePointReady: true,
    isPhoneReady: true,
    isQQReady: true,
    isClassReady: true
  },
  onLoad(){
    let _this = this;
    console.log(app.globalData.openId);
    if (!app.globalData.openId || app.globalData.openId == null || app.globalData.openId == ''){
      wx.showModal({
        showCancel: false,
        title: '未登录',
        content: '*请先授权信息哦~',
        confirmText: '前往登录',
        confirmColor: '#8366FC',
        success(res){
          if(res.confirm){
            wx.redirectTo({
              url: '../login/login',
            })
          }
        }
      })
      return;
    }
    wx.request({
      url: 'https://recruit.qgailab.com/recruit/academy',
      method: 'GET',
      success(res){
        // console.log(res.data);
       _this.data.colleges = res.data.academy;
       _this.data.majors = res.data.major;
       _this.setData({
          colleges : res.data.academy,
          majors : res.data.major
        })
      }
    })
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
    this.data.majorIndex = 0;
    this.setData({
      collegeIndex: this.data.collegeIndex,
      majorIndex : 0
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
    if (id.length == 10) {
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
    if (/^[0-5]\.\d{2}$/.test(gp)) {
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
    if (phone.length == 11) {
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
  // 检验班级是否符合规范
  validateClass(e) {
    if (this.isNull(e)) return;
    let Class = this.data.myClass;
    // console.log(Class);
    if (/^[0-9]+$/.test(Class) && 0 < Class && Class < 50) {
      this.data.isClassReady = true;
      this.setData({
        isClassReady: true
      })

    } else {
      this.data.isClassReady = false;
      this.setData({
        isClassReady: false
      })
      // 重置状态
      this.data.isFilled = false;
      this.setData({
        'isFilled': false
      })
    }
  },
  // 检验姓名是否符合规范
  validateName(e) {
    if (this.isNull(e)) return;
    let Name = this.data.myName;
    // console.log(Name);
    if (Name.length < 21 && Name.length > 0) {
      this.data.isNameReady = true;
      this.setData({
        isNameReady: true
      })
    } else {
      this.data.isNameReady = false;
      this.setData({
        isNameReady: false
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
    wx.showLoading({
      title: '提交中',
    })
    if (!app.globalData.openId){
      wx.hideLoading();
      wx.showModal({
        showCancel: false,
        title: '未登录',
        content: '*请先授权信息哦~',
        confirmText: '前往登录',
        confirmColor: '#8366FC',
        success(res){
          if(res.confirm){
            wx.redirectTo({
              url: '../login/login',
            })
          }
        }
      })
      return;
    }
    if (this.data.isFilled) {
      let groupId = this.data.directionIndex;
      groupId++;

      let data = {
        name: this.data.myName,
        studentNum: this.data.myId,
        gradePoint: this.data.myGradePoint,
        academy: this.data.colleges[this.data.collegeIndex],
        openId: app.globalData.openId,
        majorClass: this.data.majors[this.data.collegeIndex][this.data.majorIndex] + this.data.myClass + '班',
        phoneNum: this.data.myPhone,
        qq: this.data.myQQ,
        explanation: this.data.mySituation,
        selfEvaluation: this.data.myIntroduction,
        groupId: groupId,
        group: this.data.directions[this.data.directionIndex]
      }
      wx.request({
        url: 'https://recruit.qgailab.com/recruit/signup',
        method: 'POST',
        data: data,
        success(res) {
          wx.hideLoading();
          if (res.data.status) {
            wx.showModal({
              showCancel: false,
              title: '报名成功',
              content: '*若发现资料填写有误，\r\n请及时联系我们',
              confirmText: '返回主页',
              confirmColor: '#8366FC',
              success(){
                wx.redirectTo({
                  url: '../index/index',
                })
              }
            })
          } else {
            // console.log(res);
            wx.showModal({
              showCancel: false,
              title: '报名失败',
              content: '*' + res.data.message,
              confirmText: '返回填写',
              confirmColor: '#8366FC'
            })
          }

        },
        fail(res){
          wx.hideLoading();
          wx.showModal({
            showCancel: false,
            title: '网络开小差了',
            content: '*请联系管理员反馈情况~'
          })
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