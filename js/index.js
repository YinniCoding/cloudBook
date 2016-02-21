/**Des: 首页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
//获取屏幕高宽设置图片
function setBgdPic() {
    var height = $(document).height();
    $("#rightPic > img").attr("height",height);
}

//全局变量区,index不引用common.js,重新定义
var global = {
    domain: "http://ceo.qess.me"
};

function login() {
    var loginName = $("#userName").val();
    var passwd = $("input[name='passwd']").val();
    if(!loginName || !passwd){
        alert("请输入用户名、密码!");
    }else {
        $.ajax({
            type: "POST",
            url: global.domain + "/ceo/userLogin.htm",
            data: {loginName: $("#userName").val(),password: $("input[name='passwd']").val(),veriCode:$("#codeInput").val()},
            success: function (ret) {
                ret = JSON.parse(ret);
                if(ret.code != 0){
                    $("#loginInfo").text(ret.msg);
                }else {
                    window.location.href = "summary.html";
                }
            }
        });
    }
}

(function () {
    //点击登录
    $("#loginBtn").on("click", function () {
        login();
    });

    //回车登录
    $(document).on("keydown", function (e) {
        if(e.keyCode === 13){
            login();
        }

    });

    $("#autoLogin").on("click", function () {
        $("#autoChecked").toggle();
    });

    //刷新验证码
    $("#code").on("click", function () {
        $(this).find("img").attr("src",global.domain + "/veriCode.jpeg?id=" + Math.random());
    });

    //右侧图片自动拉伸
    $(window).load(function () {
        setBgdPic();
    });
    $(window).resize(function () {
        setBgdPic();
    });

    $("#code > img").attr("src",global.domain + "/veriCode.jpeg");
})();
