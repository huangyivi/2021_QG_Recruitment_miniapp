// pages/interview/interview.js

import { formatDate } from '../../utils/util';

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //面试编号
    interviewNum: ['', '', '', ''],
    //状态 0 --- 还没开启签到 1 --- 可签到 2 --- 排队 3 --- 面试中 4-面试结束
    status: 0,
    //按钮的说明
    textInfo: '',
    //面试地点
    interviewAddress: '',
    //签到时间
    interviewTime: '',
    //面试导师
    interviewTeacher: '',

  },
      //前面排队的人
      FrontPeople: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置按钮的状态
    this.data.textInfo = this.getBtnStatus(0)
    this.setData({
      textInfo: this.getBtnStatus(0)
    })
  },

  onShow() {
    this.getInterInfo(); //获取面试信息
  },
  onPullDownRefresh(){
    this.getInterInfo(); //获取面试信息
  },
  //点击签到
  handleRecord() {
    let { status } = this.data;

    //可以点击签到的状态就发送请求
    if (status == 1) {
      //发送请求
      this.requestPOST({
        url: 'queue/stu/signIn'
      }).then(res => {
        // console.log(res);
        const { code, msg } = res.data;
        //签到不成功
        if (code == 0) {
          wx.showToast({
            title: msg,
            icon: 'none'
          })
          return false;
        }else if(code == -1){
          wx.showModal({
              title: "请先登录！",
              content: "*点击确定返回授权页面",
              showCancel: false,
              success(res){
                if(res.confirm){
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              }
            })
          return false;
        }
        //签到成功
        let num = this.dealCode(res.data.data.id);
        this.data.interviewAddress = res.data.data.place;
        this.data.interviewNum = num;
        this.FrontPeople = res.data.data.frontCount;
        this.setData({
          interviewAddress : res.data.data.place,
          interviewNum : num,
          FrontPeople : res.data.data.frontCount,
          status: ++status,
          textInfo: this.getBtnStatus(status),
        });
      }).catch(err => {
        // console.log(err);
      })
    } else if (status == 3) {
      //开始面试，祝她面试顺利
      this.setData({
        status: ++status,
        textInfo: this.getBtnStatus(status),
      });
    }

  },

  //获取面试信息
  getInterInfo() {
    this.requestPOST({
      url: 'queue/stu/info'
    }).then(res => {
      // console.log(res);
      wx.stopPullDownRefresh();
      //未报名
      if (res.data.code == 0) {
        wx.showToast({
          title: '您还未报名，请先报名',
          icon: 'none',
          mask: false
        });
        return;
      }else if(res.data.code == -1){
        wx.showModal({
              title: "请先登录！",
              content: "*点击确定返回授权页面",
              showCancel: false,
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

      //更新面试状态
      this.updateStatus(res.data.data);

      //如果不是面试结束的状态，就获取openid建立websocket连接
      if (this.data.status != 4) {
        //获取openId
        this.requestPOST({ url: 'api/wx/openId' }).then(res => {
          // console.log(res);
          if(res.data.code == -1){
            wx.showModal({
              title: "请先登录！",
              content: "*点击确定返回授权页面",
              showCancel: false,
              success(res){
                if(res.confirm){
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              }
            })
          }
          const openId = res.data.data;
          //建立socket连接
          this.handleSocket(openId);
        }).catch(err => {
          // console.log(err);
        });
      }

      //判断是否开启签到
      // this.ifOpenRecord(this.data.interviewTime);

    }).catch(err => {
      // console.log(err);
    })
  },

  //更新状态
  updateStatus(res) {
    let { time, id, place, status, frontCount, tutor } = res;
    //转换为对应的状态
    let mystatus = this.getTrueStatus(status);

    if (mystatus == 4) {
      //面试结束,弹出弹框
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
    }

    this.FrontPeople = frontCount; //前面排队人数
    this.data.status = mystatus;
    this.data.interviewNum = this.dealCode(id);
    this.data.interviewTeacher = tutor;
    this.data.interviewTime = formatDate(time);
    this.data.interviewAddress = place;
    let textInfo = this.getBtnStatus(mystatus);
    this.setData({
      status: mystatus,
      interviewAddress: place, //面试地点
      interviewNum: this.dealCode(id),  //编号
      interviewTeacher: tutor,  //面试导师
      interviewTime: formatDate(time), //签到时间
      textInfo,
    });
  },

  //处理编号
  dealCode(id) {
    if (!id) id = 0; //id为null的情况
    let arr = id.toString().split(''); //字符串转化为数组
    if (arr.length < 4) {
      for (let i = arr.length; i < 4; i++) {
        arr.splice(0, 0, 0); //不足四位头部补0
      }
    }
    return arr;
  },

  //处理websocket请求
  handleSocket(openId) {
    //建立websocket连接

    let Socket = wx.connectSocket({
      url: app.globalData.socket+ 'student/' + openId,
      success: () => {
        console.log('连接成功');
      }
    });

    Socket.onMessage((res)=>{
      if (res.msgType == 2) {
        //类型为2时，只更新前面排队人数
        const { frontCount } = JSON.parse(res.data);
        this.FrontPeople = frontCount;
        this.data.textInfo = this.getBtnStatus(2);
        this.setData({
          textInfo: this.getBtnStatus(2),
          FrontPeople : frontCount
        })

      } else {
        //类型为1时，更新状态
        // console.log(JSON.parse(res.data));
        this.updateStatus(JSON.parse(res.data));
      }
    })
  },

  //根据状态获取按钮相应的状态
  getBtnStatus(status) {
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
  },

  //得到前端设置的状态，为了设置按钮的样式
  getTrueStatus(status) {
    let nowStatus = 0;
    /* 
    后台设置的状态，学生面试状态
    -1：未开启签到
    0：开启签到但学生未签到
    1：学生签到
    2：学生正在面试
    3：面试结束
     */
    nowStatus = status + 1;
    return nowStatus;
  },

  //发送post请求
  requestPOST(params) {
    const {
      domain
    } = app.globalData;
    let mytoken = wx.getStorageSync('token');

    //展示加载中
    wx.showLoading({
      title: '加载中...',
      mask: true
    });

    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        header: {
          token : mytoken
        },
        url: domain + params.url,
        method: 'POST',
        success: (result) => {
          resolve(result);
        },
        fail: (err) => {
          reject(err);
        },
        complete: () => {
          //隐藏
          wx.hideLoading();
        }
      });
    })
  },
  back(){
    wx.navigateBack();
  }
})