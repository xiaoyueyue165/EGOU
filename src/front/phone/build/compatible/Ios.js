var titHeight = 0;
var conArray = [false, false, false];
var idx = appcan.locStorage.getVal("tabviewindex") == null ? 0 : appcan.locStorage.getVal("tabviewindex");

appcan.ready(function () {
    titHeight = $('#header').offset().height;

    openCon(idx);
    conArray[idx] = true;

    appcan.window.subscribe('tabviewindex', function (tabviewindex) {
        idx = tabviewindex;
        openCon(idx);
        tabview.moveTo(idx);
    })

    appcan.window.subscribe('afterLogin', function (cusIdStr) {

    })

});


var tabview = appcan.tab({
    selector: "#tabview",
    hasIcon: true,
    hasAnim: false,
    hasLabel: true,
    hasBadge: true,
    index: idx,
    data: [{
        id: "1",
        label: "首页",
        icon: "iconhome_act ub-img ub"
    }, {
        id: "3",
        label: "我的账户",
        icon: "iconuser ub-img ub"
    }]
});
tabview.on("click", function (obj, index) {

    openCon(index);
    changeIcon(index);
})

function openCon(idx) {
    for (var i = 0,
            l = $("#header")[0].children.length; i < l; i++) {
        if (idx == i) {
            $("#header")[0].children[i].className = "uh bc-text-head ub bc-head maxh";

            if (!conArray[idx]) {

                // 强行跳转到page3
                if (idx == 1) {
                    idx = idx + 1;
                }

                appcan.openPopoverByEle("content", "page" + (idx + 1) + ".html", 0, $('#header').offset().height, 0, 'content_' + idx);
                uexWindow.setPopoverFrame("content_" + idx, 0, titHeight, $("#content").width(), $("#content").height());
                appcan.frame.resize("content", 0, $("#header").offset().height, 0, 'content_' + idx);
                conArray[idx] = true;
            } else {
                appcan.bringPopoverToFront('content_' + idx);
            }
        } else {
            $("#header")[0].children[i].className = "uhide";
        }
    }

}

// {
// id : "2",
// label : "服务中心",
// icon : "iconservice ub-img ub"
// },