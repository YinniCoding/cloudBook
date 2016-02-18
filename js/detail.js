/**Des: detail页js文件
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
        url: obj.domain + "/ceo/getAssignmentList.htm",
        data: obj.data,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            
            if(ret.code == 0){
                var res = ret.result;
                var orderInfo,tradeNumber,addTime,name,phone,schoolInfo,address,message,inviteCode,remarkInfo;
                var total = res.total;
                var totalPage = Math.ceil(total / obj.data.rows);
                var trContent = "<tr>";
                var statusDropdown = "<span class='glyphicon glyphicon-edit' data-toggle='dropdown'></span>" +
                    "<ul class='dropdown-menu'>" +
                    "<li><a href='javascript:;' orderStatus='2'>待配送</a></li>" +
                    "<li><a href='javascript:;' orderStatus='3'>电话不通</a></li>" +
                    "<li><a href='javascript:;' orderStatus='6'>不在寝室</a></li>" +
                    "<li><a href='javascript:;' orderStatus='4'>配送完成</a></li>" +
                    "</ul>";
                $("#sidebar li .badge").text("");
                $("#sidebar li.active .badge").text(total);
                for(var i in res.rows){
                    orderInfo = res.rows[i].orderInfo;
                    tradeNumber = res.rows[i].order.tradeNumber;
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].order.name;
                    phone = res.rows[i].order.phone;
                    schoolInfo = res.rows[i].order.schoolInfo;
                    address = res.rows[i].order.address;
                    message = res.rows[i].order.message;
                    remarkInfo = res.rows[i].remarkInfo;
                    inviteCode = "";
                    trContent += "<td orderinfo='" + orderInfo + "'>" + tradeNumber + "</td>";
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + phone + "</td>";
                    trContent += "<td>" + schoolInfo + "</td>";
                    trContent += "<td>" + address + "</td>";
                    trContent += "<td>" + message + "</td>";
                    trContent += "<td>" + inviteCode + "</td>";

                    switch(remarkInfo){
                        case "1":
                            trContent += "<td class='order'><span>未出库</span></td>";
                            break;
                        case "2":
                            trContent += "<td class='order'><div class='dropdown'><span>待配送</span>" + statusDropdown + "</div></td>";
                            break;
                        case "3":
                            trContent += "<td class='order'><div class='dropdown'><span>电话不通</span>" + statusDropdown + "</div></td>";
                            break;
                        case "4":
                            trContent += "<td class='order'><span>配送完成</span></td>";
                            break;
                        case "5":
                            trContent += "<td class='order'><div class='dropdown'><span>订单错误</span>" + statusDropdown + "</div></td>";
                            break;
                        case "6":
                            trContent += "<td class='order'><div class='dropdown'><span>不在寝室</span>" + statusDropdown + "</div></td>";
                            break;
                    }
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
        var date = $("#datetimepicker").val().trim();
        var orderStatus = $("#orderStatus option:selected").val().trim();
        var query = $("#query").val().trim();
        //重新组织筛选参数
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
        if(query){
            if(/[0-9]{11}/.test(query)){
                dataObj.data.phone = query;
            }else {
                dataObj.data.name = query;
            }
        }
        getData(dataObj);
    });
}

//左侧菜单点击切换
function sidebar(obj) {
    var remarkInfo = obj.data.remarkInfo;
    if(remarkInfo == 1){
        $("#sidebar li.active").removeAttr("class");
        $("#sidebar li:nth-child(2)").attr("class","active");
    }
    $("#sidebar li > a").each(function (index, ele) {
        $(ele).on("click", function () {
            var className = $(ele).attr("class");
            switch (className){
                case "menu_0":
                    obj.data.remarkInfo = "";
                    getData(obj);
                    break;
                case "menu_1":
                    obj.data.remarkInfo = 1;
                    getData(obj);
                    break;
                case "menu_2":
                    obj.data.remarkInfo = 2;
                    getData(obj);
                    break;
            }
        });
    });
}

(function main() {
    setDate();
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    var curUrl = window.location.href;
    var statusNo = 2;
    if(/\?/.test(curUrl)){
        statusNo = window.location.href.split("?")[1].split("=")[1];
    }
    getData({domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo,remarkInfo:statusNo}});
    filter({domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo}});
    sidebar({domain:global.domain,data:{page:page,rows:rows,userInfo:global.userInfo,remarkInfo:statusNo}});
})();

