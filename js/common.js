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