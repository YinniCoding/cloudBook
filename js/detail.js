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
                var tradeNumber,addTime,name,phone,address,message,inviteCode,remarkInfo;
                var total = res.total;
                var totalPage = Math.ceil(total / obj.data.rows);
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
                    page:obj.data.page,
                    total:total,
                    rows:obj.data.rows,
                    userInfo:obj.data.userInfo,
                    addTime:obj.data.addTime,
                    remarkInfo:obj.data.remarkInfo,
                    name:obj.name
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

//筛选
function filter(obj) {
    $("#filter").on("click",function () {
        var date = $("#datetimepicker").val().trim();
        var orderStatus = $("#orderStatus option:selected").val().trim();
        var query = $("#query").val().trim();
        //重新组织筛选参数
        var dataObj = {domain:"",data:{}};
        dataObj.domain = obj.domain;
        dataObj.page = obj.data.page;
        dataObj.rows = obj.data.rows;
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

