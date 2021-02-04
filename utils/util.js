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

const getDom = (dom)=>{
  return new Promise((resolve,reject)=>{
    let query = wx.createSelectorQuery();
    query.select(dom).boundingClientRect();
    query.selectViewport().scrollOffset();
    query.exec(function(res){
      resolve(res[0]);
    })

  })
}

module.exports = {
  formatTime,
  getDom
}
