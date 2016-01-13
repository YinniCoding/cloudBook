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

(function () {
    //生成验证码
    var randomCode = randomStr(4);
    var exp = new Date();
    exp.setTime(exp.getTime() + 3*60*1000);
    document.cookie = "code=" + randomCode + ";expires=" + exp.toGMTString();
    $("#code").text(randomCode);

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
})();
