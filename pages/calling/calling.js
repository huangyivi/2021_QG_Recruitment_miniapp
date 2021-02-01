// pages/calling/calling.js
const {
  getDom
} = require("../../utils/util")

Page({
  data: {
    bgc : 'g0',
    interviewer : [
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
      { id : '0001' , name : '曾伟斌'},
    ],
    isStart : true,
    colors : {
      g0 : '#B6B6B6',
      g2 : '#FEB40B', 
      g1 : '#FD6D5A',
      g3 : '#518CD8',
      g4 : '#6DC354'
    },
    directions : ['前端组', '后台组', '数据挖掘组', '嵌入式组', '移动组', '设计组', '图形组'],
    directionIndex : 0
  },
  async toSetting() {
    this.data.isStart = false;
    this.setData({
      isStart : false
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
  async toSituation() {
    this.data.isStart = true;
    this.setData({
      isStart : true
    })
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
  changeGroup(e){
    let color = e.target.id;
    this.data.bgc = color;
    this.setData({
      'bgc' : [color]
    })
  },
  changeDirection(e){
    this.data.directionIndex = e.detail.value;
    this.setData({
      directionIndex : this.data.directionIndex
    })
  },
  toRating(){
    wx.navigateTo({
      url: '../rating/rating',
    })
  }
})