/**Des: 概览js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */

(function () {
    $("#info div").on("mouseover", function () {
        $(this).addClass("shadow");
    });
    $("#info div").on("mouseout", function () {
        $(this).removeClass("shadow");
    });
})();
