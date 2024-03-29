// pages/calling/calling.js
const {
  getDom
} = require("../../utils/util");
const app = getApp();
Page({
  data: {
    // 导师队列
    teacherQueue: [],
    // 导师队列情况（用于修改信息界面）
    queue: [],
    // 面试者队列
    interviewer: [],
    colors: ['#B6B6B6', '#FEB40B', '#FD6D5A', '#518CD8', '#6DC354'],
    // 组别
    direction: '',
    // 导师编号
    group: 0,
    // 是否已设置编号
    isGroupSetted: false,
    // 面试地点
    classroom: '',
    time: '',
    timeStamp: '',
    // 是否可以开始面试
    isStart: false,
    // 是否填写完毕信息
    isReady: false
  },
  onShow() {
    wx.showLoading({
      title: '正在获取信息',
    })
    this.getRoomInfo();
    this.getTeacherId();
    this.isStartInterview();
    this.getInterviewQueue();
    this.getTeacherQueue();

    // 链接socket
    this.handleSocket();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getInterviewQueue();
    this.getTeacherQueue();
  },
  // 跳转设置页面
  async toSetting() {
    this.data.isStart = true;
    this.setData({
      isStart: true
    })
    let dom = await getDom('.situation');
    let width = dom.width;
    this.animate(".situation", [{
        translateX: 0
      },
      {
        translateX: -width
      }
    ], 200)
    this.animate(".setting", [{
        translateX: 0
      },
      {
        translateX: -width
      }
    ], 200)
  },

  // 跳转到队列情况
  async toSituation() {
    let dom = await getDom('.situation');
    let width = dom.width;
    this.animate(".situation", [{
        translateX: -width
      },
      {
        translateX: 0
      },
    ], 200)
    this.animate(".setting", [{
        translateX: -width
      },
      {
        translateX: 0
      },
    ], 200)
    this.getRoomInfo();
    this.getTeacherId();
    this.isStartInterview();
    this.getInterviewQueue();
    this.getTeacherQueue();
  },

  // 获取房间信息
  getRoomInfo() {
    let _this = this;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/RoomInfo',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code = 1) {
          let data = res.data.data;
          _this.data.direction = data.group;
          _this.data.classroom = data.place;
          _this.data.timeStamp = data.time;
          _this.data.time = _this.formatTime(data.time);
          _this.data.queue = data.num;
          _this.setData({
            direction: data.group,
            classroom: data.place,
            timeStamp: data.time,
            time: _this.formatTime(data.time),
            queue: data.num
          })
        } else if (res.data.code = -1) {

          wx.showModal({
            title: "请先登录！",
            content: "*点击确定返回授权页面",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            },
            fail(res) {
              wx.hideLoading();
              wx.showModal({
                showCancel: false,
                title: '网络开小差了',
                content: '*请联系管理员反馈情况~'
              })
            }
          })
        } else {
          wx.showToast({
            title: '网络连接失败！',
            icon: 'error',
            duration: 2000
          })
        }

      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          showCancel: false,
          title: '网络开小差了',
          content: '*请联系管理员反馈情况~'
        })
      }
    })
  },
  // 获取导师编号
  getTeacherId() {
    let _this = this;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/getNum',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success(res) {
        if (res.data.code == 1) {
          let num = res.data.data.num;
          if (num != 0) {
            _this.data.isGroupSetted = true;
            _this.setData({
              isGroupSetted: true
            })
          }
          _this.data.group = num;
          _this.setData({
            group: num
          })
        } else if (res.data.code == -1) {
          wx.showModal({
            title: "请先登录！",
            content: "*点击确定返回授权页面",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          showCancel: false,
          title: '网络开小差了',
          content: '*请联系管理员反馈情况~'
        })
      }
    })
  },
  // 获取面试队列
  getInterviewQueue() {
    let _this = this;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/getQueue',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          let queue = res.data.data;
          _this.data.interviewer = queue;
          _this.setData({
            interviewer: queue
          })
        } else if (res.data.code == -1) {
          wx.showModal({
            title: "请先登录！",
            content: "*点击确定返回授权页面",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          showCancel: false,
          title: '获取面试队列失败，请重试',
          success(res) {
            wx.redirectTo({
              url: '../calling/calling',
            })
          }
        })
      }
    })
  },
  // 检查是否已经开始面试
  isStartInterview() {
    let _this = this;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/isStart',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success(res) {
        if (res.data.code == 1) {
          let data = res.data.data;
          if (data == 1) {
            _this.data.isStart = true;
            _this.setData({
              isStart: true
            })
          } else {
            _this.data.isStart = false;
            _this.setData({
              isStart: false
            })
          }
        } else if (res.data.code == -1) {
          wx.showModal({
            title: "请先登录！",
            content: "*点击确定返回授权页面",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          showCancel: false,
          title: '网络开小差了',
          content: '*请联系管理员反馈情况~'
        })
      }
    })
  },
  // 获取导师队列情况
  getTeacherQueue() {
    let _this = this;
    wx.request({
      url: app.globalData.domain + 'queue/tutor/current',
      header: {
        token: wx.getStorageSync('token')
      },
      method: 'POST',
      success(res) {
        wx.hideLoading();
        if (res.data.code == 1) {
          let data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].num === _this.data.group) {
              app.globalData.current = data[i].student;
              app.globalData.watchStudent = data[i].student;
            }
          }
          _this.data.teacherQueue = data;
          _this.setData({
            teacherQueue: data
          })
        } else if (res.data.code == -1) {
          wx.showModal({
            title: "请先登录！",
            content: "*点击确定返回授权页面",
            showCancel: false,
            success(res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../login/login',
                })
              }
            }
          })
        }
      },
      fail(res) {
        wx.hideLoading();
        wx.showModal({
          showCancel: false,
          title: '获取导师队列失败，请重试',
          success(res) {
            wx.redirectTo({
              url: '../calling/calling',
            })
          }
        })
      }
    })
  },



  // 改变小组序号
  changeGroup(e) {
    let group = e.currentTarget.dataset.group;
    this.data.group = group;
    this.setData({
      'group': [group]
    })
    this.isReady();
  },
  // 跳转到面试界面
  toRating() {
    wx.navigateTo({
      url: '../rating/rating',
    })
  },
  // 显示菜单
  showMenu(e) {
    let openId = e.currentTarget.dataset.openid;
    wx.showActionSheet({
      itemList: ['查看资料', '开始面试'],
      success(res) {
        if (res.tapIndex == 0) {
          wx.request({
            url: app.globalData.domain + 'queue/tutor/studentInfo/' + openId,
            header: {
              token: wx.getStorageSync('token')
            },
            method: "POST",
            success(res) {
              if (res.data.code == 1) {
                app.globalData.watchStudent = res.data.data;
                wx.navigateTo({
                  url: '../more/more',
                })
              } else if (res.data.code == -1) {
                wx.showModal({
                  title: "请先登录！",
                  content: "*点击确定返回授权页面",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../login/login',
                      })
                    }
                  }
                })
              }
            },
            fail(res) {
              wx.hideLoading();
              wx.showModal({
                showCancel: false,
                title: '网络开小差了',
                content: '*请联系管理员反馈情况~'
              })
            }
          })
        } else if (res.tapIndex == 1) {
          wx.request({
            url: app.globalData.domain + 'queue/tutor/callNumber/' + openId,
            header: {
              token: wx.getStorageSync('token')
            },
            method: "POST",
            success(res) {
              // console.log(res);
              if (res.data.code == 1) {
                wx.showModal({
                  showCancel: false,
                  content: res.data.msg,
                  success() {
                    app.globalData.current = res.data.data;
                    wx.navigateTo({
                      url: '../rating/rating',
                    })
                  }
                })

              } else if (res.data.code == -1) {
                wx.showModal({
                  title: "请先登录！",
                  content: "*点击确定返回授权页面",
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../login/login',
                      })
                    }
                  }
                })
              } else {
                wx.showModal({
                  showCancel: false,
                  title: '叫号失败',
                  content: res.data.msg
                })
              }
            },
            fail(res) {
              wx.hideLoading();
              wx.showModal({
                showCancel: false,
                title: '网络开小差了',
                content: '*请联系管理员反馈情况~'
              })
            }

          })

        }
      }
    })
  },
  // 绑定输入数据
  changeInput(e) {
    let dataset = e.currentTarget.dataset;
    let value = e.detail.value;
    let name = dataset.name;
    this.data[name] = value;
    this.setData({
      name: value
    });
    this.isReady();
  },
  // 检查信息是否填写完毕
  isReady() {
    if (this.data.group != 0 && this.data.classroom != '' && this.checkTime_()) {
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
  // 检查时间格式
  checkTime(e) {
    var time = e.detail.value;
    let rep = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))) (([1-9]{1})|([0-1][0-9])|([1-2][0-3])):([0-5][0-9])$/;
    if (rep.exec(time)) {
      time = this.formatTimeStamp(time);
      this.data.timeStamp = time;
      this.setData({
        timeStamp: time
      })
    } else {
      wx.showToast({
        title: '日期格式错误！个位数前面要加0哦',
        icon: 'loading',
        duration: 1000
      })
    }
  },
  // 检查日期格式2
  checkTime_() {
    let time = this.data.time;
    let rep = /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30))) (([1-9]{1})|([0-1][0-9])|([1-2][0-3])):([0-5][0-9])$/;
    if (rep.exec(time)) {
      time = this.formatTimeStamp(time.replace(/-/g, '/'));
      this.data.timeStamp = time;
      this.setData({
        timeStamp: time
      })
      return true;
    } else {
      return false;
    }
  },
  // 转换日期为时间戳
  formatTimeStamp(val) {
    return Date.parse(val);
  },
  // 给个位数加0
  add0(m) {
    return m < 10 ? '0' + m : m
  },
  // 转换时间戳为日期
  formatTime(val) {
    var time = new Date(val);
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
  },
  // 修改房间信息
  setRoom() {
    let _this = this;
    wx.showLoading({
      title: '正在修改',
    })
    if (this.data.isReady) {
      // 修改导师组序号
      if (!_this.data.isGroupSetted) {
        wx.request({
          url: app.globalData.domain + `queue/tutor/bind/${_this.data.group}`,
          header: {
            token: wx.getStorageSync('token')
          },
          method: 'POST',
          success(res) {
            if (res.data.code == 1) {
              wx.showToast({
                title: '修改成功！',
                duration: 1000
              })
              _this.getRoomInfo();
              _this.toSituation();
            } else if (res.data.code == -1) {
              wx.showModal({
                title: "请先登录！",
                content: "*点击确定返回授权页面",
                showCancel: false,
                success(res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '../login/login',
                    })
                  }
                }
              })
            } else {
              wx.showModal({
                content: '当前导师编号已被占用，请重新选择',
                showCancel: false
              })
            }
          },
          fail(res) {
            wx.hideLoading();
            wx.showModal({
              showCancel: false,
              title: '网络开小差了',
              content: '*请联系管理员反馈情况~'
            })
          }
        });
      }
      // 设置房间的教室和时间
      wx.request({
        url: app.globalData.domain + 'queue/tutor/setRoom',
        header: {
          token: wx.getStorageSync('token')
        },
        method: 'POST',
        data: {
          place: _this.data.classroom,
          signInTime: _this.data.timeStamp
        },
        success(res) {
          wx.hideLoading();
          if (res.data.code == 1) {
            let data = res.data.data;
            _this.data.direction = data.group;
            _this.data.classroom = data.place;
            _this.data.timeStamp = data.signInTime;
            _this.data.time = _this.formatTime(data.signInTime);
            _this.setData({
              direction: data.group,
              classroom: data.place,
              timeStamp: data.signInTime,
              time: _this.formatTime(data.signInTime),
            });
            wx.showToast({
              title: '修改成功！',
              duration: 1000
            })
            _this.getRoomInfo();
            _this.toSituation();
          } else if (res.data.code == -1) {
            wx.showModal({
              title: "请先登录！",
              content: "*点击确定返回授权页面",
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              }
            })
          }
        },
        fail(res) {
          wx.hideLoading();
          wx.showModal({
            showCancel: false,
            title: '网络开小差了',
            content: '*请联系管理员反馈情况~'
          })
        }
      });


    }



  },
  // 开始面试
  startInterview() {
    let _this = this;
    if (!this.data.isStart) {
      wx.request({
        url: app.globalData.domain + 'queue/tutor/start',
        method: 'POST',
        header: {
          token: wx.getStorageSync('token')
        },
        success(res) {
          if (res.data.code == 1) {
            _this.data.isStart = true;
            _this.setData({
              isStart: true
            })
          } else if (res.data.code == -1) {
            wx.showModal({
              title: "请先登录！",
              content: "*点击确定返回授权页面",
              showCancel: false,
              success(res) {
                if (res.confirm) {
                  wx.redirectTo({
                    url: '../login/login',
                  })
                }
              }
            })
          }
        },
        fail(res) {
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
  back() {
    wx.navigateBack();
  },

  // socket连接，用于监控队列状态、
  handleSocket() {
    let Socket = wx.connectSocket({
      url: app.globalData.socket + 'tutor/' + app.globalData.openId,
      success() {
        console.log('连接成功');
      },
      fail() {
        console.log('连接失败');
      }
    })

    Socket.onMessage(res => {
      // console.log('有新消息拉');
      let data = JSON.parse(res.data);
      // console.log(data);
      if (data.msgType == 1) {
        // 面试队伍更新
        this.getInterviewQueue();
      } else if (data.msgType == 2) {
        // 某导师的学生更新
        this.getTeacherQueue();
      }
    })
  }

})