const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projects: [
      {
        name : "基于出租车大数据的智慧城市区域吸引力研究",
        intro: "基于海量出租车大数据进行分析预测，以及吸引力研究。相关论文“AttractRank: District Attraction Ranking Analysis Based on Taxi Big Data”在IEEE Transactions on Industrial Informatics（IEEE TII）(中科院一区，JCR Q1，IF=9.112 )发表。共获得各类科技竞赛奖项11项，其中国际级3项、国家级4项、省级4项。同时也获国家级大创立项。",
        img: "/static/images/projects/czc.png"
      },
      {
        name : "基于机器学习与视觉的作业环境警报定位系统",
        intro: "作品基于图像处理、机器视觉和嵌入式Linux开发等技术实现了一款软硬件结合的系统；以减少安全隐患、检测工人安全状态、发送险情报警和定位事故人员位置为核心切入点，实现了一款安全有效的定位急救系统。本作品在多个学术竞赛中斩获佳绩，共获得两项国家级奖项，三项省级奖项，得到了专家评委的一致认可。",
        img: "/static/images/projects/xt.png"
      },
      {
        name : "智行通——盲人出行之眸",
        intro: "该项目由嵌入式组主导开发，分为智能避障设备终端和大数据守护平台，智能避障设备终端由避障拐杖和智能眼镜组成用于辅助盲人出行。手机app实现盲人定位导航及亲属对其远程监护。大数据守护平台收集盲人出行数据作热力图分析，针对盲人高频出行区域设置服务站点，为政府规划盲人设施提供决策支撑。该项目已和广州市盲人学校，盲人机构达成初步的合作意向，并与两家公司签订了合作意向书，已申请和获得专利成果 8 项、2019 年作为广东省 7 件科技作品之一参加全国大学生创新创业年会、获得第十二届“挑战杯”广东大学生创业大赛金奖、中国计算机设计大赛一等奖、泛珠三角计算机作品赛一等奖等奖项。",
        img: "/static/images/projects/zxt.png"
      },
      
    ]
  },
  toDetail(e){
    // console.log(app);
    app.globalData.detail = e.currentTarget.dataset.detail;
    wx.navigateTo({
      url: '../details/details',
    })
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