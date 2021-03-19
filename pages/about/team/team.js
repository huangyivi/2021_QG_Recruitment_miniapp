// pages/about1/about1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    touchY: '',
    moving: false,
    // 各小组对象
    groups: [{
        name: "/static/images/groups_name/frontend.png",
        introduction: "前端在网络开发中扮演与用户交互的角色，主要呈现方式为web页面或小程序。近年来，随着web技术的发展，前端领域已经告别了野蛮生长的时期，愈发表现出成熟和现代化，在整个技术行业中崭露头角。在这个万物互联的时代，所有事物需要被更加紧密地联系在一起，有联系就会有界面，有界面就离不开前端。期待与你携手共进，探索精彩的前端世界。",
        logo: "/static/images/groups_logo/frontend.png",
        keywords: ['前端开发', 'Web', '小程序']
      },
      {
        name: "/static/images/groups_name/backend.png",
        introduction: "后台是一个与信息和数据息息相关的方向，负责各类数据的处理与传输。无论是网页端、移动端还是嵌入式端，都需要后台技术的支持。QG工作室后台组以Java语言为主，Go语言为辅，致力于后台服务的开发，成功给工作室的多个项目提供了坚实的后台技术支持，为构建高可用、高并发、高性能的分布式架构系统而努力。",
        logo: "/static/images/groups_logo/backend.png",
        keywords: ['大数据', '分布式', '后台开发']
      },
      {
        name: "/static/images/groups_name/data.png",
        introduction: "数据挖掘组，是QG工作室最年轻的小组之一，主要研究方向为数据挖掘、机器学习、深度学习等人工智能领域。小组主要使用Python语言，结合Hadoop、Spark等主流大数据处理框架，进行数据科学的研究和实践。在团队老师的指导下，多次于数学建模、挑战杯等国家级比赛中获奖；成员还紧跟学术前沿，解决多项学术难题并发表高水平学术论文。",
        logo: "/static/images/groups_logo/data.png",
        keywords: ['人工智能', '机器学习', '深度学习']
      },
      {
        name: "/static/images/groups_name/android.png",
        introduction: "我们主攻方向为Android APP开发。我们致力于开发出满足需求的各种各样的APP，在许多挑战杯等比赛中为项目提供一个交互终端。开发中，我们能根据需要，灵活使用各种主流框架实现各种功能，包括界面显示，动画交互，数据库存取，网络请求等，同时也会在不影响用户体验的同时优化程序的效率，给用户带来更好的使用体验。",
        logo: "/static/images/groups_logo/android.png",
        keywords: ['Android', 'Java', 'Kotlin']
      },
      {
        name: "/static/images/groups_name/embed.png",
        introduction: "作为计算机学院历史最悠久、实力最强的嵌入式开发团队。小组内部有着丰富的开发资源及技术传承，主要研究方向为基于ARM+LINUX平台以及其他各类开发板的嵌入式软件开发。小组的学习之旅主要伴随着比赛，近年来获得过许多奖项，第十四届“挑战杯”全国大学生课外学术科技作品竞赛香港专项赛特等奖更是刷新了学校在挑战杯获奖层次的记录。",
        logo: "/static/images/groups_logo/embed.png",
        keywords: ['单片机', '智能系统', '科技竞赛']
      },
      {
        name: "/static/images/groups_name/graph.png",
        introduction: "图形渲染组（前身手游组）的研究方向为计算机图形学与AR/VR开发。小组以计算机图形实时渲染技术作为主要学习方向，使用DirectX 11用于理解底层图形渲染原理，使用Unity3D引擎用于开发AR/VR虚拟现实应用程序、仿真平台以及其他交互式媒体应用程序，同时我们组有研究游戏开发的相关图形渲染技术。",
        logo: "/static/images/groups_logo/graph.png",
        keywords: ['Unity', 'Unreal', 'AR/VR']
      },
      {
        name: "/static/images/groups_name/design.png",
        introduction: "设计组的主要研究方向是安卓App，小程序和网页界面设计以及交互，同时也着手于3D模型的设计制作。我们旨在培养成员的视觉设计能力与交互设计能力。在各大比赛中，设计组与其他小组协同合作，取得了许多优异成绩，其中智能打印机等产品已经斩获多个奖项。",
        logo: "/static/images/groups_logo/design.png",
        keywords: ['Photoshop', '交互设计', '3D建模']
      }
    ]
  },
  onShow() {
    this.data.currentIndex = 0;
    this.setData({
      currentIndex: 0
    })
    setInterval(() => {
      this.animate('.purple', [{
        translateY: 0
      }, {
        translateY: 10
      }, {
        translateY: 0
      }], 4000)
    }, 4000);
    this.StopMoving();
    let _this = this;
    setInterval(() => {
      this.animate('.group-keywords', [{
        translateY: 0
      }, {
        translateY: 10
      }, {
        translateY: 0
      }], 2000)

      // 下方文字摆动
      _this.animate('.scroll', [{
          translateY: 0
        },
        {
          translateY: -20
        },
        {
          translateY: 0
        }
      ], 1000)
    }, 2000);
    this.animate('.control-pane', [{
        opacity: 0,
        translateY: -50
      },
      {
        opacity: 1,
        translateY: 0
      },
    ], 500)
  },
  toHome() {
    wx.navigateBack()
  },
  toEnroll() {
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },
  Moving() {
    this.data.moving = true;
    this.setData({
      moving: true
    })
  },
  StartMoving() {
    this.data.moving = true;
    this.setData({
      moving: true
    })
    setTimeout(() => {
      this.StopMoving();
    }, 2500)
  },
  StopMoving() {
    this.data.moving = false;
    this.setData({
      moving: false
    })
  },
  stopMove() {
    return false;
  },
  // 切换页面
  touchStart(e) {
    this.setData({
      touchX: e.changedTouches[0].clientX,
      touchY: e.changedTouches[0].clientY
    })
  },
  touchEnd(e) {
    if (!this.data.moving) {
      let x = e.changedTouches[0].clientX;
      let y = e.changedTouches[0].clientY;
      let turn = '';
      let current = this.data.currentIndex;
      if (y - this.data.touchY > 50) { //下滑
        turn = "down";
        this.StartMoving();
      } else if (y - this.data.touchY < -50) { //上滑
        turn = "up";
        this.StartMoving();
      }

      if (turn == 'up') {
        if (current == 0) {
          // 重置状态
          this.animate('.group-items', [{
            opacity: 0,
          }], 0)
          this.animate('.group-logo', [{
            opacity: 0,
          }], 0)
          current++;
          this.data.currentIndex = current;
          this.setData({
            currentIndex: current
          })
          this.animate('.group-pane', [{
              opacity: 0,
              translateY: 100
            },
            {
              opacity: 1,
              translateY: 0
            },
          ], 1000, () => {
            this.animate('.group-items', [{
                opacity: 0,
                translateX: -100
              },
              {
                opacity: 1,
                translateX: 0
              },
            ], 500)
            this.animate('.group-logo', [{
                opacity: 0,
                translateX: 100,
              },
              {
                opacity: 1,
                translateX: 0,
                rotate: 15
              },
            ], 500)
          });
        } else if (current == 7) {
          current++;
          // 小组页面上浮
          this.animate('.group-items', [{
              opacity: 1,
              translateX: 0
            },
            {
              opacity: 0,
              translateX: -100
            },
          ], 500)
          this.animate('.group-logo', [{
              opacity: 1,
              translateX: 0,
              rotate: 15
            },
            {
              opacity: 0,
              translateX: 100,
            },
          ], 500, () => {
            this.data.currentIndex = current;
            this.setData({
              currentIndex: current
            })
            this.animate('.join-pane', [{
                opacity: 0,
                rotateY: 90
              },
              {
                opacity: 1,
                rotateY: 0
              }
            ], 2000)
          })
        } else if (current < 8) {
          current++;
          // 小组页面上浮
          this.animate('.group-items', [{
              opacity: 1,
              translateX: 0
            },
            {
              opacity: 0,
              translateX: -100
            },
          ], 500)
          this.animate('.group-logo', [{
              opacity: 1,
              translateX: 0,
              rotate: 15
            },
            {
              opacity: 0,
              translateX: 100,
            },
          ], 500);
          this.animate('.group-pane', [{
              opacity: 1,
              translateY: 0
            },
            {
              opacity: 0,
              translateY: -100
            },
          ], 500, () => {
            this.data.currentIndex = current;
            this.setData({
              currentIndex: current
            })
            this.animate('.group-pane', [{
                opacity: 0,
                translateY: 100
              },
              {
                opacity: 1,
                translateY: 0
              },
            ], 1000, () => {
              this.animate('.group-items', [{
                  opacity: 0,
                  translateX: -100
                },
                {
                  opacity: 1,
                  translateX: 0
                },
              ], 500)
              this.animate('.group-logo', [{
                  opacity: 0,
                  translateX: 100,
                },
                {
                  opacity: 1,
                  translateX: 0,
                  rotate: 15
                },
              ], 500)
            });
          })
        } else {
          this.StopMoving();
        }
      } else if (turn == 'down') {
        if (current == 8) {
          current--;
          this.animate('.join-pane', [{
              opacity: 1,
              rotateY: 0
            },
            {
              opacity: 0,
              rotateY: 90
            },
          ], 500, () => {
            this.data.currentIndex = current;
            this.setData({
              currentIndex: current
            })
            this.animate('.group-pane', [{
                opacity: 0,
                translateY: 100
              },
              {
                opacity: 1,
                translateY: 0
              },
            ], 1000, () => {
              this.animate('.group-items', [{
                  opacity: 0,
                  translateX: -100
                },
                {
                  opacity: 1,
                  translateX: 0
                },
              ], 500)
              this.animate('.group-logo', [{
                  opacity: 0,
                  translateX: 100,
                },
                {
                  opacity: 1,
                  translateX: 0,
                  rotate: 15
                },
              ], 500)
            });
          })

        } else if (current > 0) {
          current--;
          // 小组页面上浮
          this.animate('.group-items', [{
              opacity: 1,
              translateX: 0
            },
            {
              opacity: 0,
              translateX: -100
            },
          ], 500)
          this.animate('.group-logo', [{
              opacity: 1,
              translateX: 0,
              rotate: 15
            },
            {
              opacity: 0,
              translateX: 100,
            },
          ], 500);
          this.animate('.group-pane', [{
              opacity: 1,
              translateY: 0
            },
            {
              opacity: 0,
              translateY: 100
            },
          ], 500, () => {

            this.data.currentIndex = current;
            this.setData({
              currentIndex: current
            })

            this.animate('.group-pane', [{
                opacity: 0,
                translateY: -100
              },
              {
                opacity: 1,
                translateY: 0
              },
            ], 1000, () => {
              this.animate('.group-items', [{
                  opacity: 0,
                  translateX: -100
                },
                {
                  opacity: 1,
                  translateX: 0
                },
              ], 500)
              this.animate('.group-logo', [{
                  opacity: 0,
                  translateX: 100,
                },
                {
                  opacity: 1,
                  translateX: 0,
                  rotate: 15
                },
              ], 500)
            });
          })

        } else {
          this.StopMoving();
        }
      }
    }

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