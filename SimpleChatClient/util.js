exports.getDate = function () {
  var weeks = new Array('日', '月', '火', '水', '木', '金', '土');
  var now = new Date();
  var week = weeks[now.getDay()]; 
  return now.toLocaleDateString() + '（' + week + '） ' + now.toLocaleTimeString();
}