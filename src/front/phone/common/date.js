(function($) {
    $.init();
    var result = $('#result')[0];
    var btns = $('#timeBtn');
    btns.each(function(i, btn) {
        btn.addEventListener('tap', function() {
            var _self = this;
            if (_self.picker) {
                _self.picker.show(function(rs) {

                    result.innerText = rs.text;
                    var chooseDate = (rs.text).split(" ")[0];
                    var chooseTime = (rs.text).split(" ")[1];
                    appcan.locStorage.setVal("chooseDate", chooseDate)
                    appcan.locStorage.setVal("chooseTime", chooseTime)
                    _self.picker = null;
                });
            } else {
                var date = new Date().formate("yyyy-MM-dd"),
                    y = date.split("-")[0],
                    m = Number(date.split("-")[1]),
                    d = Number(date.split("-")[2]);

                var thisMonthDay = mGetDate(y, m),
                    continuedDays = 10,
                    maxDay = d + continuedDays > thisMonthDay ? d + continuedDays - thisMonthDay : Number(d) + continuedDays,
                    minMonth = m - 1,
                    maxMonth = d + continuedDays > thisMonthDay ? minMonth + 1 : minMonth;

                var options = {
                    type : "hour", //设置日历初始视图模式
                    beginDate : new Date(y, minMonth, d), //设置开始日期
                    endDate : new Date(y, maxMonth, maxDay), //设置结束日期
                    labels : ["年", "月", "日", "时段", "分"], //设置默认标签区域提示语
                    customData : {
                        h : [{
                            "text" : "上午",
                            "value" : "上午"
                        }, {
                            "text" : "下午",
                            "value" : "下午"
                        }, {
                            "text" : "晚上",
                            "value" : "晚上"
                        }]
                    }//时间/日期别名
                }
                var id = this.getAttribute('id');

                _self.picker = new $.DtPicker(options);
                _self.picker.show(function(rs) {

                    result.innerText = rs.text;
                    var chooseDate = (rs.text).split(" ")[0];
                    var chooseTime = (rs.text).split(" ")[1];
                    appcan.locStorage.setVal("chooseDate", chooseDate)
                    appcan.locStorage.setVal("chooseTime", chooseTime)
                    _self.picker = null;
                });
            }

        }, false);
    });
})(mui);
