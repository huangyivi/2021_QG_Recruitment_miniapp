const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getDom = (dom) => {
  return new Promise((resolve, reject) => {
    let query = wx.createSelectorQuery();
    query.select(dom).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function (res) {
      resolve(res[0]);
    })

  })
}

const formatDate = (date) => {
  if(!date) date = new Date();
  //date是传入的时间
  let d = new Date(date);

  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  let sec = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

  let times = d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;

  return times;
}

module.exports = {
  formatTime,
  getDom,
  formatDate
}
