// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colleges : ['计算机学院','外国语学院'],
    myCollege : '计算机学院',
    majors : ['信息安全','网络工程'],
    myMajor : '信息安全',
    directions : ['前端组','后台组','数据挖掘组','嵌入式组','移动组','设计组','图形组'],
    myDirection : '前端组',
    isFilled : true
  },
  changeReason:function(e){
    console.log(e.detail.value)
  }
})