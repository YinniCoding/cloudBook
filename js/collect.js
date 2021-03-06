/**Des: 收书页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/19
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
        url: obj.domain + "/ceo/getBookApplyList.htm",
        data: obj.data,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            var res = ret.result;
            var addTime,name,number,valid;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.data.rows);
            var trContent = "<tr>";
            if(ret.code == 0){
                for(var i in res.rows){
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].name;
                    number = res.rows[i].number;
                    valid = res.rows[i].valid;
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + number + "</td>";
                    switch (valid){
                        case 0:
                            trContent += "<td style='color: #ffb000'>未审核</td>";
                            break;
                        case 1:
                            trContent += "<td style='color: #32a555'>审核通过</td>";
                            break;
                        case 2:
                            trContent += "<td>审核未通过</td>";
                            break;
                    }
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                changeColor();
                setPagination({
                    domain: obj.domain,
                    total: total,
                    data: {
                        page: obj.data.page,
                        rows: obj.data.rows,
                        userInfo: obj.data.userInfo
                    }
                });
                setActive(obj.data.page,totalPage);
                //definePageClick(obj);
            }else {
                //异常
                alert("请求出错：" + ret.msg);
            }
        }
    });
}

//第二个参数供提交成功后刷新列表用
function wageApply(obj,dataObj) {
    $("#submit").on("click", function () {
        var name =  $("#name").val();
        var d = $("#datetimepicker").val();
        var number = $("#number").val();
        var remark = $("#remark").val();
        obj.data.name = name;
        obj.data.remark = remark;
        obj.data.addTime = d;
        obj.data.number = number;
        if(!name || !d || !number || !remark){
            alert("有必填项未填！");
        }else {
            $.ajax({
                url: obj.domain + "/ceo/insertBookApply.htm",
                data: obj.data
            }).done(function (ret) {
                ret = JSON.parse(ret);
                if(ret.code == 0){
                    alert("提交成功！");
                    //提交成功刷新列表
                    getData(dataObj);
                }else {
                    alert(ret.msg);
                }
            }).fail(function () {
                alert("请求失败！");
            });
        }
    });
}

(function main() {
    setDate();
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    var dataObj = {domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo}};
    getData(dataObj);
    wageApply({domain:global.domain,data:{userInfo: global.userInfo}},dataObj);
})();

