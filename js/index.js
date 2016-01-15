/**Des: 首页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
//生成验证码
function randomStr(len) {
    var i;
    len = len || 4;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//获取屏幕高宽设置图片
function setBgdPic() {
    var height = $(document).height();
    $("#rightPic > img").attr("height",height);
}

(function () {
    //生成验证码
    var randomCode = randomStr(4);
    var exp = new Date();
    exp.setTime(exp.getTime() + 3*60*1000);
    document.cookie = "code=" + randomCode + ";expires=" + exp.toGMTString();
    $("#code > div").text(randomCode);

    //设置验证码样式，默认旋转7deg
    var luckyNum = Math.floor(Math.random()*500);
    var maxDeg = 0,rotateDeg = 7;
    if(luckyNum > 200){
        maxDeg = 30;
    }else {
        maxDeg = -30;
    }
    rotateDeg = Math.floor(Math.random() * maxDeg);
    $("#code > div").css({
        "transform" : "rotate(" + rotateDeg + "deg)",
        "-webkit-transform" : "rotate(" + rotateDeg + "deg)",
        "-moz-transform" : "rotate(" + rotateDeg + "deg)",
        "-ms-transform" : "rotate(" + rotateDeg + "deg)",
        "-o-transform" : "rotate(" + rotateDeg + "deg)"
    });


    $("#loginBtn").on("click", function () {
        if(!$("input[name='userName']").val() || !$("input[name='passwd']").val()){
            alert("请输入用户名、密码!");
        }else {
            var code = $("#codeInput").val();
            var codeIncookie = document.cookie.split("=")[1];
            if(!codeIncookie){
                alert("验证码已失效，请刷新！")
            }else {
                if(codeIncookie.toLowerCase() === code.toLowerCase()){
                    window.location.href = "http://www.baidu.com";
                }else {
                    alert("验证码输入错误！");
                }
            }
        }
    });

    $("#autoLogin").on("click", function () {
        $("#autoChecked").toggle();
    });

    //右侧图片自动拉伸
    $(window).load(function () {
        setBgdPic();
    });
    $(window).resize(function () {
        setBgdPic();
    });
})();
