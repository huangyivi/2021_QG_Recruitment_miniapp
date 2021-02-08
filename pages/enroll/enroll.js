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
    directions: ['前端组','后台组','设计组','图形组','移动组','数据挖掘组','嵌入式组'],

    // 学生信息
    collegeIndex: 0,
    majorIndex: 0,
    directionIndex: 0,

    myName: '曾伟斌',
    myId: '3120222222',
    myGradePoint: '5.00',
    myPhone: '19924686023',
    myQQ: '843702140',
    mySituation: '无',
    myIntroduction: '无',
    // 用于控制css
    isNull: [false, false, false, false, false, false, false],
    isFocus: [false, false, false, false, false, false, false],
    
    // 字段是否合格
    isIdReady : true,
    isGradePointReady : true,
    isPhoneReady : true,
    isQQReady : true
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
  isNull(e) {
    // 检测输入是否为空
    let id = e.target.id;
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
    } else {
      let key = 'isNull[' + id + ']';
      this.data.isNull[id] = false;
      this.setData({
        [key]: false
      })
    }

    // 重置状态
    this.data.isFilled = false;
    this.setData({
      'isFilled': false
    })

    // 检验数字类是否正确
    if(!this.validateId() || !this.validateGP() || !this.validatePhone() || !this.validateQQ()) return ;

    // 检查所有是否为空
    for (let item of this.data.isNull) {
      if (item) return;
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
      [focus]: true
    })
  },
  // 检验学号是否符合规范
  validateId(){
    let id = this.data.myId;
    if(/^3120|3220\d{6}$/.test(id)){
      this.data.isIdReady = true;
      this.setData({
        isIdReady : true
      })
      return true;
    }else{
      this.data.isIdReady = false;
      this.setData({
        isIdReady : false
      })
      return false
    }
  },
  // 检验绩点是否符合规范
  validateGP(){
    let gp = this.data.myGradePoint;
    if(/^[0-5].\d{2}$/.test(gp)){
      this.data.isGradePointReady = true;
      this.setData({
        isGradePointReady : true
      })
      return true;
    }else{
      this.data.isGradePointReady = false;
      this.setData({
        isGradePointReady : false
      })
      return false
    }
  },
  // 检验电话是否符合规范
  validatePhone(){
    let phone = this.data.myPhone;
    if(/^1[3|4|5|7|8|9]\d{9}$/.test(phone)){
      this.data.isPhoneReady = true;
      this.setData({
        isPhoneReady : true
      })
      return true;
    }else{
      this.data.isPhoneReady = false;
      this.setData({
        isPhoneReady : false
      })
      return false
    }
  },
  // 检验QQ是否符合规范
  validateQQ(){
    let QQ = this.data.myQQ;
    if(/^[0-9]+$/.test(QQ)){
      this.data.isQQReady = true;
      this.setData({
        isQQReady : true
      })
      return true;
    }else{
      this.data.isQQReady = false;
      this.setData({
        isQQReady : false
      })
      return false
    }
  },
  // 提交表格表格
  submitForm(){
    if(this.data.isFilled){
      let data = {
        name : this.data.myName,
        studentNum : this.data.myId,
        gradePoint : this.data.myGradePoint,
        academy : this.data.colleges[this.data.collegeIndex],
        openId : app.globalData.openId,
        majorClass : this.data.majors[this.data.majorIndex],
        phoneNum : this.data.myPhone,
        qq : this.data.myQQ,
        explaination : this.data.mySituation,
        selfEvaluation : this.data.myIntroduction,
        groupId : this.data.directionIndex++,
      }

      console.log(data);
      wx.request({
        url: 'http://39.98.41.126:30007/recruit/signup',
        method : 'POST',
        data : data,
        success(res){
          console.log(res);
          wx.showModal({
            showCancel: false,
            title: '报名成功',
            content: '*若发现资料填写有误，\r\n请及时联系我们',
            confirmText: '返回主页',
            confirmColor: '#8366FC'
          })
        }
      })
    }
  }
})