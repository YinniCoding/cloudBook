/**Des: 公共js
 * Author: jhxzhangjihong@126.com
 * Date: 2016/1/13.
 */
//头部高亮
(function () {
    var curUrl = window.location.pathname.split("/");
    curUrl = curUrl[curUrl.length - 1];
    var pattern,href;
    $("#rightNav > ul > li > a").each(function (index, ele) {
        href = $(ele).attr("href");
        if(href){
            pattern = new RegExp(href,"i");
            if(pattern.test(curUrl)){
                $("#rightNav .active").removeClass("active");
                $(this).parent().addClass("active");
            }
        }
    });
})();

//sidebar高亮
(function () {
    $("#sidebar li").on("click", function () {
        $("#sidebar .active").removeClass("active");
        $(this).addClass("active");
    });
})();

//datetimepicker格式设置
if($("datetimepicker").length){
    $('#datetimepicker').datetimepicker({
        lang: 'ch',              //中文化
        format:"Y-m-d",      //格式化日期
        timepicker: false,     //关闭时间
        yearStart: 2000,
        yearEnd: 2050
    });

    $('#datetimepicker2').datetimepicker({
        lang: 'ch',              //中文化
        format:"Y-m-d",      //格式化日期
        timepicker: false,     //关闭时间
        yearStart: 2000,
        yearEnd: 2050
    });
}

//判断登录情况
(function () {
    var cookie = document.cookie.split(";");
    for(var i in cookie){
        //if(/isLogin/.test(cookie[i])){
        //    var v = cookie[i].split("=")[1];
        //    if(!v){
        //        window.location.href = "index.html";
        //    }
        //    break;
        //}else {
        //    window.location.href = "index.html";
        //}
    }
})();

//根据订单状态调整颜色
function changeColor(){
    $("#dataTable td.order").css({
        "text-align": "center",
        "vertical-align": "center",
        "color": "#ffb000"
    });

    $("#dataTable td:contains('配送完成')").css({
        "color": "#32a555"
    });

    $("#dataTable td:contains('订单错误')").css({
        "color": "red"
    });
}
