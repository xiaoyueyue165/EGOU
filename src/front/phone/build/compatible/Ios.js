           
var titHeight = 0;
var conArray = [false, false];
var idx = appcan.locStorage.getVal("tabviewindex") == null ? 0 : appcan.locStorage.getVal("tabviewindex");
var isMyCcount = appcan.locStorage.getVal('tabviewSelect') || true;

appcan.ready(function () {
    titHeight = $('#header').offset().height;
    idx = isMyCcount ? 1 : 0,
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
    index: isMyCcount ? 1 : 0,
    data: [{
        id: "0",
        label: "首页",
        icon: "iconhome_act ub-img ub"
    }, {
        id: "1",
        label: "我的账户",
        icon: "iconuser ub-img ub"
    }]
});

if (isMyCcount) {
    var home = document.getElementsByClassName('iconhome_act')[0],
        user = document.getElementsByClassName('iconuser')[0];
    setStyle(home, {
        backgroundImage: "url('index/myImg/t_icon_home.png')"
    })
    setStyle(user, {
        backgroundImage: "url('index/myImg/t_icon_user_active.png')"
    });
    // setStyle(server, {
    // backgroundImage : "url('index/myImg/t_icon_service.png')"
    // });

    appcan.locStorage.remove('tabviewSelect');
    appcan.locStorage.remove('agreementState');
}

tabview.on("click", function (obj, index) {

    openCon(index);
    changeIcon(index);
})

function openCon(idx) {
    switch (idx) {
        case 0:
            $("#header")[0].children[idx].className = "uh bc-text-head ub bc-head maxh";
            appcan.openPopoverByEle("content", "page" + (idx + 1) + ".html", 0, $('#header').offset().height, 0, 'content_' + idx);
            uexWindow.setPopoverFrame("content_" + idx, 0, titHeight, $("#content").width(), $("#content").height());
            appcan.frame.resize("content", 0, $("#header").offset().height, 0, 'content_' + idx);
            break;
        case 1:
            idx = idx + 1;
            $("#header")[0].children[idx].className = "uh bc-text-head ub bc-head maxh";
            appcan.openPopoverByEle("content", "page" + (idx + 1) + ".html", 0, $('#header').offset().height, 0, 'content_' + idx);
            uexWindow.setPopoverFrame("content_" + idx, 0, titHeight, $("#content").width(), $("#content").height());
            appcan.frame.resize("content", 0, $("#header").offset().height, 0, 'content_' + idx);
            break;
        default:
            break;
    }
    /*  for (var i = 0,
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
     } */

}

// {
// id : "2",
// label : "服务中心",
// icon : "iconservice ub-img ub"
// },