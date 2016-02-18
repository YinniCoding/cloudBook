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
        url: obj.domain + "/ceo/getPromoteOrderList.htm",
        data: obj.data,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            ret = JSON.parse(ret);
            
            if(ret.code == 0){
                var res = ret.result;
                var orderInfo,tradeNumber,addTime,name,phone,address,message,inviteCode;
                var total = res.total;
                var totalPage = Math.ceil(total / obj.data.rows);
                var trContent = "<tr>";
                /*
                var statusDropdown = "<span class='glyphicon glyphicon-edit' data-toggle='dropdown'></span>" +
                    "<ul class='dropdown-menu'>" +
                    "<li><a href='javascript:;' orderStatus='2'>待配送</a></li>" +
                    "<li><a href='javascript:;' orderStatus='3'>电话不通</a></li>" +
                    "<li><a href='javascript:;' orderStatus='6'>不在寝室</a></li>" +
                    "<li><a href='javascript:;' orderStatus='4'>配送完成</a></li>" +
                    "</ul>";
                */
                for(var i in res.rows){
                    orderInfo = res.rows[i].orderInfo;
                    tradeNumber = res.rows[i].tradeNumber;
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].name;
                    phone = res.rows[i].phone;
                    address = res.rows[i].address;
                    message = res.rows[i].message;
                    //orderStatus = res.rows[i].orderStatus;
                    inviteCode = "";
                    trContent += "<td orderinfo='" + orderInfo + "'>" + tradeNumber + "</td>";
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + phone + "</td>";
                    trContent += "<td>" + address + "</td>";
                    trContent += "<td>" + message + "</td>";
                    trContent += "<td>" + inviteCode + "</td>";
                    /*
                    switch(orderStatus){
                        case "1":
                            trContent += "<td class='order'>未出库</td>";
                            break;
                        case "2":
                            trContent += "<td class='order'><div class='dropdown'><span>待配送</span>" + statusDropdown + "</div></td>";
                            break;
                        case "3":
                            trContent += "<td class='order'><div class='dropdown'><span>电话不通</span>" + statusDropdown + "</div></td>";
                            break;
                        case "4":
                            trContent += "<td class='order'>配送完成</td>";
                            break;
                        case "5":
                            trContent += "<td class='order'><div class='dropdown'><span>订单错误</span>" + statusDropdown + "</div></td>";
                            break;
                        case "6":
                            trContent += "<td class='order'><div class='dropdown'><span>不在寝室</span>" + statusDropdown + "</div></td>";
                            break;
                    }
                    */
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                var updateObj = {
                    domain: obj.domain,
                    total: total,
                    data: {
                        page: obj.data.page,
                        rows: obj.data.rows,
                        userInfo: obj.data.userInfo,
                        addTime: obj.data.addTime,
                        remarkInfo: obj.data.remarkInfo,
                        name: obj.data.name,
                        phone: obj.data.phone
                    }
                };
                changeColor();
                changeStatus(updateObj);
                setPagination(updateObj);
                setActive(obj.data.page,totalPage);
                //definePageClick(obj);
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
        var date = $("#datetimepicker").val();
        var orderStatus = $("#orderStatus option:selected").val();
        var query = $("#query").val();
        var dataObj = {domain:"",data:{}};
        dataObj.domain = obj.domain;
        dataObj.data.page = obj.data.page;
        dataObj.data.rows = obj.data.rows;
        dataObj.data.userInfo = obj.data.userInfo;

        dataObj.data.addTime = date;
        if(orderStatus == "-1"){
            orderStatus = "";
        }
        dataObj.data.remarkInfo = orderStatus;
        //电话
        if(/[0-9]{11}/.test(query)){
            dataObj.data.phone = query;
        }else {
            dataObj.data.name = query;
        }
        getData(dataObj);
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
})();

