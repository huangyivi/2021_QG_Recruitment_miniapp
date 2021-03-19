
Page({

  /**
   * 页面的初始数据
   */
  data: {
    honors: [
      "第九届中国软件杯全国一等奖",
      "2020年全国高校绿色计算创新大赛团体特等奖",
      "2020年全国高校绿色计算创新大赛团体一等奖",
      "2020年泛珠计算机作品赛一等奖",
      "第十二届“挑战杯”省级一等奖",
      "2020年全国大学生软件测试大赛总决赛特等奖",
      "2020年中国计算机设计大赛一等奖",
      "2020年美国数学建模竞赛F奖"
    ]
  },
  back(){
    wx.navigateBack();
  },  
  onShareAppMessage(){
    return {
      title: "QG AI Lab",
      desc: "小平科技创新团队",
      path: "/pages/login/login",
      imageUrl: "/static/images/QGStudio.png"
    }
  },
})