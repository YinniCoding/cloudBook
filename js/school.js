/**Des: 我的学校页js文件
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
        url: obj.domain + "/ceo/getCeoDormList.htm",
        data: obj.data,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            ret = JSON.parse(ret);
            var res = ret.result;
            var room,phone,time,remark,memberInfo,schoolInfo;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.data.rows);
            var trContent = "<tr>";
            if(ret.code == 0){
                for(var i in res.rows){
                    room = res.rows[i].assignedDorm;
                    phone = res.rows[i].phone;
                    time = res.rows[i].time;
                    remark = res.rows[i].remark;
                    memberInfo = res.rows[i].memberInfo;
                    schoolInfo = res.rows[i].schoolInfo;
                    trContent += "<td>" + room + "</td>";
                    trContent += "<td>" + memberInfo + "</td>";
                    trContent += "<td>" + phone + "</td>";
                    trContent += "<td>" + remark + "</td>";
                    trContent += "<td>" + schoolInfo + "</td>";
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                changeColor();
                setPagination({
                    page:obj.data.page,
                    total:total,
                    rows:obj.data.rows,
                    userInfo:obj.data.userInfo,
                    addTime:obj.data.addTime,
                    remarkInfo:obj.data.remarkInfo,
                    name:obj.data.name
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

(function main() {
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    getData({domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo}});
})();

