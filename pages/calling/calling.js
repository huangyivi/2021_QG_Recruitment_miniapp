// pages/calling/calling.js
const {
  getDom
} = require("../../utils/util")

Page({
  data: {
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
    isStart : true
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
  }
})