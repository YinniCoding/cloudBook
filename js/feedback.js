/**Des: 反馈js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/22.
 */
function doSubmit(obj) {
    var data = {};

    if(!obj.content){
        alert("请输入具体说明！");
        return;
    }else {
        if(obj.des === "problem"){
            data.problem = obj.content;
        }else {
            data.advice = obj.content;
        }
        data.userInfo = obj.userInfo;
        $.ajax({
            url: obj.url,
            data: data
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
    var content = "";
    $("#submitQuestion").on('click', function () {
        content = encodeURIComponent($("#question").val());
        doSubmit({url: global.domain + "/ceo/insertProblem.htm",userInfo: global.userInfo,content: content,des: "problem"});
    });
    
    //提交建议
    $("#submitSuggestiong").on('click', function () {
        content = encodeURIComponent($("#question").val());
        doSubmit({url: global.domain + "/ceo/insertAdvice.htm",userInfo: global.userInfo,content: content,des: "advice"});
    });
})();