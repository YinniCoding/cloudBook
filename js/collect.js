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
        url: "http://test1.qess.me/ceo/getBookApplyList.htm",
        data: obj,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            var res = ret.result;
            var addTime,name,number,valid;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.rows);
            var trContent = "<tr>";
            if(ret.code !== -1){
                for(var i in res.rows){
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].name;
                    number = res.rows[i].number;
                    valid = res.rows[i].valid;
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + number + "</td>";
                    if(valid){
                        trContent += "<td style='color: #32a555'>审核通过</td>";
                    }else {

                        trContent += "<td style='color: #ffb000'>未审核</td>";
                    }
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                changeColor();
                setPagination({
                    page:obj.page,
                    total:total,
                    rows:obj.rows,
                    userInfo:obj.userInfo,
                });
                setActive(obj.page,totalPage);
                //definePageClick(obj);
            }else {
                //异常
                alert("请求出错：" + ret.msg);
            }
        }
    });
}

function wageApply(userInfo) {
    $("#submit").on("click", function () {
        var name =  $("#name").val();
        var d = $("#datetimepicker").val();
        var number = $("#number").val();
        var remark = $("#remark").val();
        if(!name || !d || !number || !remark){
            alert("有必填项未填！");
        }else {
            $.ajax({
                url: "http://test1.qess.me/ceo/insertBookApply.htm",
                data: {userInfo: userInfo,name: name,number: number,remark: remark}
            }).done(function (ret) {
                if(!ret.code){
                    alert("提交成功！");
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
    getData({page:page,rows:rows,userInfo:global.userInfo});
    wageApply(global.userInfo);
})();

