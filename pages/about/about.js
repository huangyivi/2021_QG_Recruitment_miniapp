// pages/about1/about1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    pageIndex: 0,
    touchY: '',
    moving: false,
    // 关于我们的4个页面
    about: [{
        header: "../../static/images/about/aboutUs.png",
        introduction: 'QG科技创新团队由团队负责人计算机学院副院长谢光强教授于2005年创建并任第一指导老师，团队在人工智能、嵌入式智能系统等多个方向上展开研究和多领域的融合创新应用，取得了丰硕的成果，被授予以邓小平同志命名的大学生“小平科技创新团队”称号。',
        btn: [
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NzhDRkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWJvb2stb3BlbiI+PHBhdGggZD0iTTIgM2g2YTQgNCAwIDAgMSA0IDR2MTRhMyAzIDAgMCAwLTMtM0gyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMiAzaC02YTQgNCAwIDAgMC00IDR2MTRhMyAzIDAgMCAxIDMtM2g3eiI+PC9wYXRoPjwvc3ZnPg==',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWF3YXJkIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9IjguMjEgMTMuODkgNyAyMyAxMiAyMCAxNyAyMyAxNS43OSAxMy44OCI+PC9wb2x5bGluZT48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXJzIj48cGF0aCBkPSJNMTcgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNMjMgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAzLjEzYTQgNCAwIDAgMSAwIDcuNzUiPjwvcGF0aD48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXJhZGlvIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT48cGF0aCBkPSJNMTYuMjQgNy43NmE2IDYgMCAwIDEgMCA4LjQ5bS04LjQ4LS4wMWE2IDYgMCAwIDEgMC04LjQ5bTExLjMxLTIuODJhMTAgMTAgMCAwIDEgMCAxNC4xNG0tMTQuMTQgMGExMCAxMCAwIDAgMSAwLTE0LjE0Ij48L3BhdGg+PC9zdmc+'
        ]
      },
      {
        header: "../../static/images/about/accomplishments.png",
        introduction: '团队成立至今，获得各类科技竞赛240余项，其中国家级奖项33项，省级奖项130项，承担大学生创新创业训练计划(国家级)、广东省大学生科技创新培育专项资金(重点)等各类科技项目50项，申请专利和软件著作权等成果40余项。',
        btn: [
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWJvb2stb3BlbiI+PHBhdGggZD0iTTIgM2g2YTQgNCAwIDAgMSA0IDR2MTRhMyAzIDAgMCAwLTMtM0gyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMiAzaC02YTQgNCAwIDAgMC00IDR2MTRhMyAzIDAgMCAxIDMtM2g3eiI+PC9wYXRoPjwvc3ZnPg==',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NzhDRkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWF3YXJkIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9IjguMjEgMTMuODkgNyAyMyAxMiAyMCAxNyAyMyAxNS43OSAxMy44OCI+PC9wb2x5bGluZT48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXJzIj48cGF0aCBkPSJNMTcgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNMjMgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAzLjEzYTQgNCAwIDAgMSAwIDcuNzUiPjwvcGF0aD48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXJhZGlvIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT48cGF0aCBkPSJNMTYuMjQgNy43NmE2IDYgMCAwIDEgMCA4LjQ5bS04LjQ4LS4wMWE2IDYgMCAwIDEgMC04LjQ5bTExLjMxLTIuODJhMTAgMTAgMCAwIDEgMCAxNC4xNG0tMTQuMTQgMGExMCAxMCAwIDAgMSAwLTE0LjE0Ij48L3BhdGg+PC9zdmc+'
        ]
      },
      {
        header: "../../static/images/about/development.png",
        introduction: '团队为大湾区建设培养和输送了大批品学兼优的高水平创新型人才200多名。团队大部分学生进入了华为、阿里巴巴、腾讯、京东、百度、字节跳动、网易游戏等知名        IT 公司工作，成为了核心技术骨干，获得用人单位的肯定和好评。另有不少毕业生或“推免”留校深造或到海内外高校继续攻读硕（博）士，或在毕业后进行了创业，获得了初步的成功。',
        btn: [
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWJvb2stb3BlbiI+PHBhdGggZD0iTTIgM2g2YTQgNCAwIDAgMSA0IDR2MTRhMyAzIDAgMCAwLTMtM0gyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMiAzaC02YTQgNCAwIDAgMC00IDR2MTRhMyAzIDAgMCAxIDMtM2g3eiI+PC9wYXRoPjwvc3ZnPg==',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWF3YXJkIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9IjguMjEgMTMuODkgNyAyMyAxMiAyMCAxNyAyMyAxNS43OSAxMy44OCI+PC9wb2x5bGluZT48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NzhDRkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXJzIj48cGF0aCBkPSJNMTcgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNMjMgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAzLjEzYTQgNCAwIDAgMSAwIDcuNzUiPjwvcGF0aD48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXJhZGlvIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT48cGF0aCBkPSJNMTYuMjQgNy43NmE2IDYgMCAwIDEgMCA4LjQ5bS04LjQ4LS4wMWE2IDYgMCAwIDEgMC04LjQ5bTExLjMxLTIuODJhMTAgMTAgMCAwIDEgMCAxNC4xNG0tMTQuMTQgMGExMCAxMCAwIDAgMSAwLTE0LjE0Ij48L3BhdGg+PC9zdmc+'
        ]
      },
      {
        header: "../../static/images/about/Influence.png",
        introduction: '所获成果受到了广东卫视、南方卫视、南方日报、新快报等主流媒体的好评和采访，并在《广东新闻联播》中头条播出，获得了良好的社会评价和赞誉。',
        btn: [
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWJvb2stb3BlbiI+PHBhdGggZD0iTTIgM2g2YTQgNCAwIDAgMSA0IDR2MTRhMyAzIDAgMCAwLTMtM0gyeiI+PC9wYXRoPjxwYXRoIGQ9Ik0yMiAzaC02YTQgNCAwIDAgMC00IDR2MTRhMyAzIDAgMCAxIDMtM2g3eiI+PC9wYXRoPjwvc3ZnPg==',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWF3YXJkIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjciPjwvY2lyY2xlPjxwb2x5bGluZSBwb2ludHM9IjguMjEgMTMuODkgNyAyMyAxMiAyMCAxNyAyMyAxNS43OSAxMy44OCI+PC9wb2x5bGluZT48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEQ1RUIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXJzIj48cGF0aCBkPSJNMTcgMjF2LTJhNCA0IDAgMCAwLTQtNEg1YTQgNCAwIDAgMC00IDR2MiI+PC9wYXRoPjxjaXJjbGUgY3g9IjkiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48cGF0aCBkPSJNMjMgMjF2LTJhNCA0IDAgMCAwLTMtMy44NyI+PC9wYXRoPjxwYXRoIGQ9Ik0xNiAzLjEzYTQgNCAwIDAgMSAwIDcuNzUiPjwvcGF0aD48L3N2Zz4=',
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5NzhDRkEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXJhZGlvIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIyIj48L2NpcmNsZT48cGF0aCBkPSJNMTYuMjQgNy43NmE2IDYgMCAwIDEgMCA4LjQ5bS04LjQ4LS4wMWE2IDYgMCAwIDEgMC04LjQ5bTExLjMxLTIuODJhMTAgMTAgMCAwIDEgMCAxNC4xNG0tMTQuMTQgMGExMCAxMCAwIDAgMSAwLTE0LjE0Ij48L3BhdGg+PC9zdmc+'
        ]
      }
    ],
    // 各小组对象
    groups: [{
        name: "../../static/images/groups_name/frontend.png",
        introduction: "前端在网络开发中扮演与用户交互的角色，主要呈现方式为web页面或小程序。近年来，随着web技术的发展，前端领域已经告别了野蛮生长的时期，愈发表现出成熟和现代化，在整个技术行业中崭露头角。在这个万物互联的时代，所有事物需要被更加紧密地联系在一起，有联系就会有界面，有界面就离不开前端。期待与你携手共进，探索精彩的前端世界。",
        logo: "../../static/images/groups_logo/frontend.png",
        keywords: ['前端开发', 'Web', '小程序']
      },
      {
        name: "../../static/images/groups_name/backend.png",
        introduction: "后台是一个与信息和数据息息相关的方向，负责各类数据的处理与传输。无论是网页端、移动端还是嵌入式端，都需要后台技术的支持。QG工作室后台组以Java语言为主，Go语言为辅，致力于后台服务的开发，成功给工作室的多个项目提供了坚实的后台技术支持，为构建高可用、高并发、高性能的分布式架构系统而努力。",
        logo: "../../static/images/groups_logo/backend.png",
        keywords: ['大数据', '分布式', '后台开发']
      },
      {
        name: "../../static/images/groups_name/data.png",
        introduction: "数据挖掘组，是QG工作室最年轻的小组之一，主要研究方向为数据挖掘、机器学习、深度学习等人工智能领域。小组主要使用Python语言，结合Hadoop、Spark等主流大数据处理框架，进行数据科学的研究和实践。在团队老师的指导下，多次于数学建模、挑战杯等国家级比赛中获奖；成员还紧跟学术前沿，解决多项学术难题并发表高水平学术论文。",
        logo: "../../static/images/groups_logo/data.png",
        keywords: ['人工智能', '机器学习', '深度学习']
      },
      {
        name: "../../static/images/groups_name/android.png",
        introduction: "我们主攻方向为Android APP开发。我们致力于开发出满足需求的各种各样的APP，在许多挑战杯等比赛中为项目提供一个交互终端。开发中，我们能根据需要，灵活使用各种主流框架实现各种功能，包括界面显示，动画交互，数据库存取，网络请求等，同时也会在不影响用户体验的同时优化程序的效率，给用户带来更好的使用体验。",
        logo: "../../static/images/groups_logo/android.png",
        keywords: ['Android', 'Java', 'Kotlin']
      },
      {
        name: "../../static/images/groups_name/embed.png",
        introduction: "作为计算机学院历史最悠久、实力最强的嵌入式开发团队。小组内部有着丰富的开发资源及技术传承，主要研究方向为基于ARM+LINUX平台以及其他各类开发板的嵌入式软件开发。小组的学习之旅主要伴随着比赛，近年来获得过许多奖项，第十四届“挑战杯”全国大学生课外学术科技作品竞赛香港专项赛特等奖更是刷新了学校在挑战杯获奖层次的记录。",
        logo: "../../static/images/groups_logo/embed.png",
        keywords: ['单片机', '智能系统', '科技竞赛']
      },
      {
        name: "../../static/images/groups_name/graph.png",
        introduction: "图形渲染组（前身手游组）的研究方向为计算机图形学与AR/VR开发。小组以计算机图形实时渲染技术作为主要学习方向，使用DirectX 11用于理解底层图形渲染原理，使用Unity3D引擎用于开发AR/VR虚拟现实应用程序、仿真平台以及其他交互式媒体应用程序，同时我们组有研究游戏开发的相关图形渲染技术。",
        logo: "../../static/images/groups_logo/graph.png",
        keywords: ['Unity', 'Unreal', 'AR/VR']
      },
      {
        name: "../../static/images/groups_name/design.png",
        introduction: "设计组的主要研究方向是安卓App，小程序和网页界面设计以及交互，同时也着手于3D模型的设计制作。我们旨在培养成员的视觉设计能力与交互设计能力。在各大比赛中，设计组与其他小组协同合作，取得了许多优异成绩，其中智能打印机等产品已经斩获多个奖项。",
        logo: "../../static/images/groups_logo/design.png",
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
  changePage(e) {
    this.animate('.pane-header', [{
      opacity: 0
    }], 0);
    this.animate('.pane-text', [{
      opacity: 0
    }], 0);
    this.animate('.control-pane', [{
        opacity: 1
      }, {
        opacity: 0,
        translateY: 10
      },
      {
        opacity: 1,
        translateY: 0
      }
    ], 500, () => {
      let page = e.currentTarget.dataset.page;
      this.data.pageIndex = page;
      this.setData({
        pageIndex: page
      })
      this.animate('.pane-header', [{
        opacity: 0
      }, {
        opacity: 1
      }], 500);
      this.animate('.pane-text', [{
        opacity: 0
      }, {
        opacity: 1
      }], 500);

    })

  },
  toHome() {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  toEnroll() {
    wx.navigateTo({
      url: '../enroll/enroll',
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
      } else if (x - this.data.touchX > 50) {
        turn = "right";
        this.StartMoving();
      } else if (x - this.data.touchX < -50) {
        turn = 'left';
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
      } else if (turn == 'right') {
        let page = this.data.pageIndex;
        if (page > 0) {
          page--;
          this.animate('.pane-header', [{
            opacity: 0
          }], 0);
          this.animate('.pane-text', [{
            opacity: 0
          }], 0);
          this.animate('.control-pane', [{
              opacity: 1
            }, {
              opacity: 0,
              translateY: 10
            },
            {
              opacity: 1,
              translateY: 0
            }
          ], 500, () => {
            this.data.pageIndex = page;
            this.setData({
              pageIndex: page
            })
            this.animate('.pane-header', [{
              opacity: 0
            }, {
              opacity: 1
            }], 500);
            this.animate('.pane-text', [{
              opacity: 0
            }, {
              opacity: 1
            }], 500);

          })
        }
      } else if (turn == 'left') {
        let page = this.data.pageIndex;
        if (page < 3) {
          page++;
          this.animate('.pane-header', [{
            opacity: 0
          }], 0);
          this.animate('.pane-text', [{
            opacity: 0
          }], 0);
          this.animate('.control-pane', [{
              opacity: 1
            }, {
              opacity: 0,
              translateY: 10
            },
            {
              opacity: 1,
              translateY: 0
            }
          ], 500, () => {
            this.data.pageIndex = page;
            this.setData({
              pageIndex: page
            })
            this.animate('.pane-header', [{
              opacity: 0
            }, {
              opacity: 1
            }], 500);
            this.animate('.pane-text', [{
              opacity: 0
            }, {
              opacity: 1
            }], 500);

          })
        }
      }
    }

  },
  // 团队介绍左右滑事件
})