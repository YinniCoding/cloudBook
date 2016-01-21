/**Des: 推广页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/20
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

/*设置分页器
* Params:
 * page:当前页
 * total：一共多少条记录
 * rows：每页多少条记录
* */

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
        url: "http://test1.qess.me/ceo/getPromoteOrderList.htm",
        data: obj,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            var res = ret.result;
            var tradeNumber,addTime,name,phone,address,message,inviteCode,orderStatus;
            var total = res.total;
            var totalPage = Math.ceil(total / obj.rows);
            var trContent = "<tr>";
            if(ret.code !== -1){
                for(var i in res.rows){
                    tradeNumber = res.rows[i].tradeNumber;
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].name;
                    phone = res.rows[i].phone;
                    address = res.rows[i].address;
                    message = res.rows[i].message;
                    orderStatus = res.rows[i].orderStatus;
                    inviteCode = "";
                    trContent += "<td>" + tradeNumber + "</td>";
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + phone + "</td>";
                    trContent += "<td>" + address + "</td>";
                    trContent += "<td>" + message + "</td>";
                    trContent += "<td>" + inviteCode + "</td>";
                    switch(orderStatus){
                        case "1":
                            trContent += "<td class='order'>未出库</td>";
                            break;
                        case "2":
                            trContent += "<td class='order'>待配送<span class='glyphicon glyphicon-edit'></span></td>";
                            break;
                        case "3":
                            trContent += "<td class='order'>电话不通<span class='glyphicon glyphicon-edit'></span></td>";
                            break;
                        case "4":
                            trContent += "<td class='order'>配送完成</td>";
                            break;
                        case "5":
                            trContent += "<td class='order'>订单错误<span class='glyphicon glyphicon-edit'></span></td>td>";
                            break;
                        case "6":
                            trContent += "<td class='order'>不在寝室<span class='glyphicon glyphicon-edit'></span></td>td>";
                            break;
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
                    addTime:obj.addTime,
                    remarkInfo:obj.remarkInfo,
                    name:obj.name
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

//筛选
function filter() {
    $("#filter").on("click",function () {
        var date = $("#datetimepicker").val();
        var orderStatus = $("#orderStatus option:selected").val();
        var query = $("#query").val();
        var dataObj = {};
        dataObj.page = 1;
        dataObj.rows = 16;
        dataObj.userInfo = 42;
        if(date){
            dataObj.addTime = date;
        }
        if(orderStatus){
            dataObj.remarkInfo = orderStatus;
        }
        if(query){
            //电话
            if(/[0-9]{11}/.test(query)){
                dataObj.phone = query;
            }else {
                dataObj.name = query;
            }
        }
        getData(dataObj);
    });
}

(function main() {
    setDate();
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    var userInfo = 42;
    //TODO: userInfo需要修改为实际的
    getData({page:page,rows:rows,userInfo:userInfo});
    filter();
})();

