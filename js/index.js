/**Des: 首页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
//获取屏幕高宽设置图片
function setBgdPic() {
    var height = $(document).height();
    $("#rightPic > img").attr("height",height);
}

(function () {
    $("#loginBtn").on("click", function () {
        var loginName = $("#userName").val();
        var passwd = $("input[name='passwd']").val();
        var code = $("#codeInput").val();
        if(!loginName || !passwd){
            alert("请输入用户名、密码!");
        }else {
            $.ajax({
                type: "POST",
                url: "http://test1.qess.me/ceo/userLogin.htm",
                data: {loginName: $("#userName").val(),password: $("input[name='passwd']").val(),veriCode:$("#codeInput").val()},
                success: function (ret) {
                    //alert(ret);
                    $("#loginInfo").text(ret);
                }
            });
        }
    });

    $("#autoLogin").on("click", function () {
        $("#autoChecked").toggle();
    });

    //刷新验证码
    $("#code").on("click", function () {
        $(this).find("img").attr("src","http://test1.qess.me/veriCode.jpeg?id=" + Math.random())
    });

    //右侧图片自动拉伸
    $(window).load(function () {
        setBgdPic();
    });
    $(window).resize(function () {
        setBgdPic();
    });
})();
