/**Des: 其他推广页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/20
 */

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
        url: "http://test1.qess.me/ceo/getPromoteApplyList.htm",
        data: obj,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            var res = ret.result;
            var addTime,name,promoteType,valid,remark;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.rows);
            var trContent = "<tr>";
            if(ret.code !== -1){
                for(var i in res.rows){
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].name;
                    promoteType = res.rows[i].promoteType;
                    valid = res.rows[i].valid;
                    remark = res.rows[i].remark;
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + promoteType + "</td>";
                    if(valid){
                        trContent += "<td style='color: #32a555'>审核通过</td>";
                    }else {
                        trContent += "<td style='color: #ffb000'>未审核</td>";
                    }
                    trContent += "<td>" + remark + "</td>";
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                changeColor();
                setPagination({
                    page:obj.page,
                    total:total,
                    rows:obj.rows,
                    userInfo:obj.userInfo
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

//申请推广工资
function wageApply(){
    $("#salaryApplyWrap #submit").on("click", function () {
        var name = $("#name").val();
        var promoteType = $("#promoteType option:selected").val();
        var remark = $("#remark").val();

        if(!name || promoteType === "0"){
            alert("申请人和推广方式必填！");
            return;
        }else {
            $.ajax({
                url: "http://test1.qess.me/ceo/insertPromoteApply.htm",
                data: {name:name,promoteType:promoteType,remark:remark}
            }).done(function (ret) {
                if(!ret.code){
                    alert("提交成功！");
                }else {
                    alert(ret.msg);
                }
            }).fail(function () {
                alert("提交失败！");
            });
        }
    });
}

(function main() {
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    getData({page:page,rows:rows,userInfo:global.userInfo});
    wageApply();
})();

