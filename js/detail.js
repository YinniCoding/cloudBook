/**Des: detail页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/12
 */
//刷新表格数据
function getData(page,perPage,userInfo,onload) {
    $.ajax({
        url: "http://test1.qess.me/ceo/getAssignmentList.htm",
        data: {page:page,rows:perPage,userInfo:userInfo},
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
                    trContent += "<td>" + remarkInfo + "</td>";
                    trContent += "</tr>";
                }
                $("#dataTable > tbody").html(trContent);
                if(onload){
                    //初始传入，设置分页器
                    setPagination(total,perPage);
                }
                setActive(page);
            }else {
                alert("请求出错：" + ret.msg);
            }
        }
    });
}

function setPagination(total,perPage){
    //设置分页器
    var totalPage = Math.ceil(total / perPage);
    var liContent = "";
    //控制翻页器一共多长
    var cnt = 0;
    var start = 0;
    for(var j=start;j<totalPage;j++){
        if(cnt++ > 9){
            break;
        }
        liContent += "<li><a href='javascript:;'>" + (j+1) + "</a></li>"
    }
    $("#totalNum").text(total);
    $("#paginationPages > li:first-child").after(liContent);
}

function setActive(page) {
    $("#paginationPages > li > a").each(function (index, ele) {
        if($(ele).text() == page){
            $("#paginationPages > li.active").removeClass("active");
            $(ele).parent().addClass("active");
        }
    });
}

(function () {
    //默认展示第一页，每页16条
    var perPage = 16;
    var userInfo = 42;
    var curPage,page;
    //TODO: userInfo需要修改为实际的
    getData(1,perPage,userInfo,true);

    //翻页器
    $("#paginationPages > li.previous").click(function () {
        curPage = parseInt($("#paginationPages > li.active").text());
        page = curPage - 1;
        page = page < 0 ? 0 : page;
        getData(page,perPage,userInfo,false);
    });

    $("#paginationPages > li.next").click(function () {
        curPage = parseInt($("#paginationPages > li.active").text());
        page = curPage + 1;
        getData(page,perPage,userInfo,false);
    });

    $("#paginationPages > li > a").each(function (index, ele) {
        $(ele).click(function () {
            if(!$(ele).attr("class")){
                page = parseInt($(ele).text());
                getData(page,perPage,userInfo,false);
            }
        });
    });
})();