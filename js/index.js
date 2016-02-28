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
    domain: "http://test1.qess.me"
};

//根据cookie判断是否已经登录
function autoLogin(){
    if(/index.html/.test(window.location.pathname)){
        var cookie = document.cookie.split(";");
        var base = $("base").attr("href");
        for(var k in cookie){
            if(/isLogin/.test(cookie[k])){
                var v = cookie[k].split("=")[1];
                if(v){
                    window.location.href = base + "./summary.html";
                }
            }
        }
    }
}

function login() {
    var loginName = $("#userName").val();
    var passwd = $("input[name='passwd']").val();
    var data = {};
    data.loginName = loginName;
    data.password = passwd;
    data.veriCode = $("#codeInput").val();
    //自动登录
    if($("#autoChecked").attr("style")){
        data.autoLogin = true;
    }
    if(!loginName || !passwd){
    alert("请输入用户名、密码!");
    }else {
        $.ajax({
            type: "POST",
            url: global.domain + "/ceo/userLogin.htm",
            data: data,
            success: function (ret) {
                ret = JSON.parse(ret);
                if(ret.code != 0){
                    $("#loginInfo").text(ret.msg);
                }else {
                    var base = $("base").attr("href");
                    window.location.href = base + "./summary.html";
                }
            }
        });
    }
}

(function () {
    autoLogin();

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
