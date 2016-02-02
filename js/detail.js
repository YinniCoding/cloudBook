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
        url: "http://test1.qess.me/ceo/getAssignmentList.htm",
        data: obj,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            
            if(ret.code !== -1){
                var res = ret.result;
                var tradeNumber,addTime,name,phone,address,message,inviteCode,remarkInfo;
                var total = res.total;
                var totalPage = Math.ceil(total / obj.rows);
                var trContent = "<tr>";
                for(var i in res.rows){
                    tradeNumber = res.rows[i].order.tradeNumber;
                    addTime = res.rows[i].addTime;
                    name = res.rows[i].order.name;
                    phone = res.rows[i].order.phone;
                    address = res.rows[i].order.address;
                    message = res.rows[i].order.message;
                    remarkInfo = res.rows[i].remarkInfo;
                    inviteCode = "";
                    trContent += "<td>" + tradeNumber + "</td>";
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + name + "</td>";
                    trContent += "<td>" + phone + "</td>";
                    trContent += "<td>" + address + "</td>";
                    trContent += "<td>" + message + "</td>";
                    trContent += "<td>" + inviteCode + "</td>";
                    switch(remarkInfo){
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
        var date = $("#datetimepicker").val().trim();
        var orderStatus = $("#orderStatus option:selected").val().trim();
        var query = $("#query").val().trim();
        var dataObj = {};
        dataObj.page = 1;
        dataObj.rows = 16;
        dataObj.userInfo = global.userInfo;
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

//左侧菜单点击切换
function sidebar(obj) {
    $("#sidebar li > a").each(function (index, ele) {
        $(ele).on("click", function () {
            var className = $(ele).attr("class");
            switch (className){
                case "menu_0":
                    obj.remarkInfo = "";
                    getData(obj);
                    break;
                case "menu_1":
                    obj.remarkInfo = 1;
                    getData(obj);
                    break;
                case "menu_2":
                    obj.remarkInfo = 2;
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
    getData({page:page,rows:rows,userInfo:global.userInfo,remarkInfo:statusNo});
    filter();
    sidebar({page:page,rows:rows,userInfo:global.userInfo});
})();

