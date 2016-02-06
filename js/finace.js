/**Des: 财务中心页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/12
 */
//时间框日期设置
function setDate(){
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if(month < 10){
        month = "0" + month;
    }
    var day = d.getDate();
    $("#datetimepicker").val(year + "-" + month + "-" + day);
}

/*
 * 获取分页数据
 * params：json
 * page: 页码
 * rows：每页多少条记录
 * userInfo：用户id
 * 其余为可选筛选参数
 * */
function getData(obj){
    $.ajax({
        url: obj.domain + "/ceo/getWageList.htm",
        data: obj.data,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            var res = ret.result;
            var addTime,type,account,balance,remarkInfo;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.data.rows);
            var trContent = "<tr>";
            if(!ret.code){
                for(var i in res.rows){
                    addTime = res.rows[i].addTime;
                    type = res.rows[i].type;
                    account = res.rows[i].account;
                    balance = res.rows[i].balance;
                    remarkInfo = res.rows[i].remark;
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + type + "</td>";
                    trContent += "<td>" + account + "</td>";
                    trContent += "<td>" + balance + "</td>";
                    trContent += "<td>" + remarkInfo + "</td>";
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                changeColor();
                setPagination({
                    page:obj.data.page,
                    total:total,
                    rows:obj.data.rows,
                    userInfo:obj.data.userInfo,
                    addTime:obj.data.addTime
                });
                setActive(obj.data.page,totalPage);
            }else {
                //异常
                alert("请求出错：" + ret.msg);
            }
        }
    });
}

//筛选
function filter(obj) {
    $("#filter").on("click",function () {
        var date = $("#datetimepicker").val().trim();
        var type = $("#type").val().trim();
        console.log(obj);
        var dataObj = obj;
        dataObj.data.addTime = date;
        if(type == "-1"){
            type = "";
        }
        dataObj.data.type = type;
        getData(dataObj);
    });
}

function getWageTotal(obj) {
    var total = 0;
    var balances = 0;
    var res;
    $.ajax({
        url: obj.domain + "/ceo/getWageTotal.htm",
        data: {userInfo:obj.userInfo},
        success: function (ret) {
            ret = JSON.parse(ret);
            res = ret.result;
            if(!ret.code){
                total = res.summary;
                balances = res.balances;
                $("#totalMoney").text(total);
                $("#withdrawCash").text(balances);
                adjustMargin();
            }else {
                alert("请求出错:" + ret.msg);
            }
        },
        error: function (){
            alert("请求异常!");
        }
    });
}

//动态调整工资文案的对齐
function adjustMargin() {
    var totalW = $("#totalMoney").width();
    var withdrawW = $("#withdrawCash").width();
    var textWrapW = $("#totalMoney").parents().find(".caption").width();
    var totalmarginW = (textWrapW - totalW) / 2;
    var withdrawmarginW = (textWrapW - withdrawW) / 2;
    $("#totalMoney").css({"margin-left": totalmarginW});
    $("#withdrawCash").css({"margin-left": withdrawmarginW});
}

//浮动特效
(function (){
    $("#salaryApplyContent > div").hover(function () {
        $(this).addClass("shadow");
    }, function () {
        $(this).removeClass("shadow");
    });
})();

//提现接口,第一个参数自身使用,第二个参数供成功后刷新页面使用
function withdraw(obj,dataObj) {
    $.ajax({
        url: obj.domain + "/ceo/withdrawal.htm",
        data: {"userInfo": obj.userInfo,"money": obj.money}
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(!ret.code){
            $("#withdrawModal").modal("hide");
            alert("提现成功!");
            //提现成功刷新列表
            getData(dataObj);
        }else {
            alert("提现失败!" + ret.msg);
        }
    }).fail(function () {
        alert("请求异常!");
    });
}

(function main() {
    setDate();
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    var dataObj = {domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo}};
    getData(dataObj);
    filter(dataObj);

    getWageTotal(global);

    $("#confirm").on("click", function () {
        //可提现金额
        var withdrawCash = parseFloat($("#withdrawCash").text());
        //待提现金额
        var towithdraw = parseFloat($("#towithdraw").val());
        if(!towithdraw || towithdraw > withdrawCash){
            alert("可提现余额不足!");
        }else {
            withdraw({domain:global.domain,userInfo:global.userInfo,money:towithdraw},dataObj);
        }
    });
    $("#cancel").on("click",function(){
        $("#towithdraw").val("");
    });

})();

