// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
   isChecked : 0,
   isOpen : true,
   isTutor : -1
  },
  onLoad(){
    let flag = app.globalData.character;
    this.data.isTutor = flag;
    this.setData({
      isTutor : flag
    });
    setInterval(()=>{
      this.animate(".about-us",[
        {translateY: 0},
        {translateY: -20},
        {translateY: 0},
      ],2000)
    },2000)
  },
  // onShow(){
  //   this.animate('.QGStudio',[{opacity: 0}],0);
  //   this.animate('.QG-intro',[{opacity: 0}],0);
  //   this.animate('.btn-container',[{opacity: 0}],0);
  //   this.animate('.QGStudio',[
  //     {opacity: 0,scale: [2,2],translateY: -50},
  //     {opacity: 1,scale: [1,1],translateY: 0}
  //   ],1000,()=>{
  //     this.animate('.QG-intro',[
  //       {opacity: 0,},
  //       {opacity: 1}
  //     ],1000,()=>{
  //       this.animate('.btn-container',[
  //         {opacity: 0,translateX: -100},
  //         {opacity: 1,translateX: 0}
  //       ],1000);
  //     })
  //   })
  // },
  toInterview(){
    wx.navigateTo({
      url: '../interview/interview'
    })
  },
  toCalling(){
    wx.navigateTo({
      url: '../calling/calling'
    })
  },
  alert(){
    wx.showModal({
      showCancel: false,
      title: '面试还未开始哦~',
      content: '先看看我们的团队介绍吧！'
    })
  }
})
