/**Des: 反馈js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/22.
 */
function doSubmit(contentEle,reqUrl) {
    var content = encodeURIComponent($(contentEle).val());
    if(!content){
        alert("请输入具体说明！");
    }else {
        $.ajax({
            url: reqUrl,
            data: {userInfo: global.userInfo}
        }).done(function (ret) {
            ret = JSON.parse(ret);
            if(ret.code == 0){
                alert("问题提交成功！");
            }else {
                alert(ret.msg);
            }
        }).fail(function () {
            alert("请求失败！");
        });
    }
}

(function () {
    //提交问题
    $("#submitQuestion").on('click', function () {
        doSubmit("#question",global.domain + "/ceo/insertProblem.htm");
    });
    
    //提交建议
    $("#submitSuggestiong").on('click', function () {
        doSubmit("#suggestion",global.domain + "/ceo/insertAdvice.htm");
    });
})();