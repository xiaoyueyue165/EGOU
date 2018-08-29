(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {
         appcan.window.close(-1);
    });
    appcan.button("#nav-right", "btn-act",
    function() {});


	appcan.ready(function() {
        });
        var lv = appcan.listview({
            selector : "#listview",
            type : "thickLineTmp",
            hasIcon : true,
            hasAngle : true,
            hasSubTitle : false
        });
        lv.set([{
            icon : "search/css/myImg/img.png",
            title : "付邮通知单",
            describe : '<div class="ub uinn-t t-a ulev-1">你饿了吗，电话订购吧</div>' + '<div class="t-e ulev0">￥59</div>' + '<div class="t-a ulev-1 uinn-t"><span class="umar-l">1779</span>购买</div>'
        }, {
            icon : "search/css/myImg/img.png",
            title : "小猪红烧肉",
            describe : '<div class="ub uinn-t t-a ulev-1">你饿了吗，电话订购吧</div>' + '<div class="t-e ulev0">￥59</div>' + '<div class="t-a ulev-1 uinn-t"><span class="umar-l">1779</span>购买</div>'
        }]);
        lv.on('click', function(ele, context, obj, subobj) {
            //appcan.window.open(context.pagename,context.pageurl,10);
        })
})($);