// pages/interview/interview.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //面试编号
    interviewNum: ['', '', '', ''],
    //状态 0 --- 未签到 1 --- 已签到 2 --- 准备面试 3 --- 面试中 
    status: 0,
    //按钮的说明
    textInfo: '',
    //面试地点
    interviewAddress: '',
    //面试时间
    interviewTime: '7.1 13:00',
    //面试导师
    interviewTeacher: '',
  },
  //前面排队的人
  FrontPeople: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow() {
    const { status } = this.data;
    this.setData({
      textInfo: this.getStatus(status)
    });
  },

  //根据按钮的状态进行处理
  handleStatus() {
    let { interviewNum, interviewAddress, interviewTeacher } = this.data;
    let { status } = this.data;
    if (status == 0) {
      //还没开始签到
     wx.showToast({
       title: '时间未到',
       icon: 'none',
       mask: false,
     });
    //  return ;

    } else if (status == 1) {
       //点击签到

      //发送请求数据
      interviewNum = [2, 0, 2, 1];
      interviewTeacher = '后台组 1号面试官';
      interviewAddress = '教学七号楼 - 777';
      this.FrontPeople = 1;
      

    } else if (status == 2) {
      //排队中
      if (this.FrontPeople != 0) {
        wx.showToast({
          title: '前面还有人,请你继续等待哦^_^',
          icon: 'none',
          mask: true,
        });
        this.FrontPeople = 0;
        this.setData({
          textInfo: this.getStatus(status),
        });
        return;
      }

    } else if (status == 3) {
      //准备面试

    } else {
      //面试中
      wx.showModal({
        title: '面试结束',
        content: '请继续关注我们的后续动态和通知感谢您对QG工作室的支持',
        showCancel: false,
        cancelText: '取消',
        cancelColor: '#000000',
        confirmText: '返回主页',
        confirmColor: '#8366FC',
        success: (result) => {
          if (result.confirm) {
            wx.navigateBack({
              delta: 1
            });
          }
        },
      });
      return;
    }

    //准备进入未定义状态，需从头开始，改值
    if (status == 4) {
      status = -1;
    }
    this.setData({
      status: ++status,
      textInfo: this.getStatus(status),
      interviewAddress,
      interviewTeacher,
      interviewNum,
    });
  },

  //获取相应的状态
  getStatus(status) {
    /* 
    0 --- 还未开始签到
    1 --- 点击签到
    2 --- 前方还有人
    3 --- 开始面试
    4 --- 祝您面试顺利 
    */
    let str = '';
    switch (status) {
      case 0:
        str = '还未开始签到';
        break;
      case 1:
        str = '点击签到';
        break;
      case 2:
        str = `前方还有${this.FrontPeople}人`;
        break;
      case 3:
        str = '开始面试';
        break;
      case 4:
        str = '祝您面试顺利';
        break;
    }
    return str;
  }

})