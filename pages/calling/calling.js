// pages/calling/calling.js
const {
  getDom
} = require("../../utils/util")

Page({
  data: {
    group: 'g0',
    interviewer: [
      {
        id: '0001',
        name: '曾伟斌'
      },      
    ],
    colors: ['#B6B6B6','#FEB40B','#FD6D5A','#518CD8','#6DC354'],
    directions: ['前端组', '后台组', '数据挖掘组', '嵌入式组', '移动组', '设计组', '图形组'],
    directionIndex: 0,
    group: 0,
    classroom : '',
    time: '',
    // 是否可以开始面试
    isStart: true,
    // 是否填写完毕信息
    isReady: false
  },
  // 跳转设置页面
  async toSetting() {
    this.data.isStart = false;
    this.setData({
      isStart: false
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
  // 改变方向
  changeDirection(e) {
    this.data.directionIndex = e.detail.value;
    this.setData({
      directionIndex: this.data.directionIndex
    })
  },
  // 跳转到面试界面
  toRating() {
    wx.navigateTo({
      url: '../rating/rating',
    })
  },
  // 显示菜单
  showMenu(e){
    let idx = e.currentTarget.dataset.idx;
    console.log(idx);
    wx.showActionSheet({
      itemList: ['查看资料','开始面试'],
      success(res){
        if(res.tapIndex == 0){
          wx.navigateTo({
            url: '../more/more',
          })
        }else if(res.tapIndex == 1){
          wx.navigateTo({
            url: '../rating/rating',
          })
        }
      }
    })
  },
  // 绑定输入数据
  changeInput(e){
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
  isReady(){
    if(this.data.group != 0 && this.data.classroom != '' && this.data.time != ''){
      this.data.isReady = true;
      this.setData({
        isReady : true
      })
    }else{
      this.data.isReady = false;
      this.setData({
        isReady : false
      })
    }
  },
  changeQueue(){
    
  }
})