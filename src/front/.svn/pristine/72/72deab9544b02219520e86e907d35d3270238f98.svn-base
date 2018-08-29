 // 模板引擎补充
 template.defaults.imports.Balance = function (number) {
  return number.toFixed(2);
}
template.defaults.imports.OneDecimal = function (number) {
  return number.toFixed(1);
}
template.defaults.imports.number = function (number) {
  var times = Math.pow(10, 3);
  var roundNum = Math.round(number * times) / times;
  return roundNum.toFixed(3);
}
template.defaults.imports.changeMoney = function (value) {
  return fmoney(value)
}