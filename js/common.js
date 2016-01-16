/**Des: ����js�ļ�
 * Author��jhxzhangjihong@126.com
 * Date��2016/1/13.
 */
//ͷ���˵�����
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

//sidebar����
(function () {
    $("#sidebar li").on("click", function () {
        $(".active").removeClass("active");
        $(this).addClass("active");
    });
})();

//datetimepicker格式设置
$('#datetimepicker').datetimepicker({
    lang: 'ch',              //中文化
    timepicker: false,     //关闭时间
    yearStart: 2000,
    yearEnd: 2050
});

$('#datetimepicker2').datetimepicker({
    lang: 'ch',              //中文化
    timepicker: false,     //关闭时间
    yearStart: 2000,
    yearEnd: 2050
});