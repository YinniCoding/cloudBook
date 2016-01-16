/**Des: detail页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/12
 */
//刷新表格数据
function getData(dataObj/*page,perPage,userInfo*/,onload) {
    $.ajax({
        url: "http://test1.qess.me/ceo/getAssignmentList.htm",
        data: dataObj/*{page:page,rows:perPage,userInfo:userInfo}*/,
        beforeSend: function () {
            $("#dataTable > tbody").html("查询需要一段时间，请稍等....");
        },
        success: function (ret) {
            var ret = JSON.parse(ret);
            var res = ret.result;
            if(ret.code !== -1){
                var len = res.rows.length;
                var tradeNumber,addTime,name,phone,address,message,inviteCode,remarkInfo;
                var total = res.total;
                var totalPage = Math.ceil(total / perPage);
                var trContent = "<tr>";
                for(var i=0;i<len;i++){
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
                if(onload){
                    //初始传入，设置分页器
                    setPagination(total,perPage,userInfo);
                }
                setActive(page,totalPage);
            }else {
                alert("请求出错：" + ret.msg);
            }
        }
    });
}

function setPagination(total,perPage,userInfo){
    //设置分页器
    var totalPage = Math.ceil(total / perPage);
    var liContent = "";
    var page;
    //控制翻页器一共多长
    //var cnt = 0;
    var start = 0;
    for(var j=start;j<totalPage;j++){
        //if(cnt++ > 9){
        //    break;
        //}
        liContent += "<li><a href='javascript:;'>" + (j+1) + "</a></li>"
    }
    $("#totalNum").text(total);
    $("#paginationPages > li:first-child").after(liContent);

    //定义页码点击事件
    $("#paginationPages > li > a").each(function (index, ele) {
        $(ele).click(function () {
            //非前翻页后翻页的普通翻页元素
            if(!$(ele).parent().attr("class")){
                page = parseInt($(ele).text());
                getData({page:page,perPage:perPage,userInfo:userInfo},false);
            }
        });
    });
}

function setActive(page,totalPage) {
    $("#paginationPages > li > a").each(function (index, ele) {
        if($(ele).text() == page){
            $("#paginationPages > li.active").removeClass("active");
            $(ele).parent().addClass("active");
            $("#paginationPages .previous").removeClass("disabled");
            $("#paginationPages .next").removeClass("disabled");
        }
    });
    if(page == 1){
        $("#paginationPages .previous").addClass("disabled");
    }
    if(page == totalPage){
        $("#paginationPages .next").addClass("disabled");
    }
}

(function () {
    //默认展示第一页，每页16条
    var perPage = 16;
    var userInfo = 42;
    var curPage,page;
    //TODO: userInfo需要修改为实际的
    getData({page:1,perPage:perPage,userInfo:userInfo},true);

    //翻页器
    $("#paginationPages > li.previous").click(function () {
        if(!/disabled/.test($(this).attr("class"))){
            curPage = parseInt($("#paginationPages > li.active").text());
            page = curPage - 1;
            page = page < 0 ? 0 : page;
            getData({page:page,perPage:perPage,userInfo:userInfo},false);
        }
    });

    $("#paginationPages > li.next").click(function () {
        if(!/disabled/.test($(this).attr("class"))){
            curPage = parseInt($("#paginationPages > li.active").text());
            page = curPage + 1;
            getData({page:page,perPage:perPage,userInfo:userInfo},false);
        }
    });

    $("#filter").click(function () {
        var date = $("#datetimepicker").val();
        var orderStatus = $("#orderStatus option:selected").val();
        var query = $("#query").val();

    });
})();