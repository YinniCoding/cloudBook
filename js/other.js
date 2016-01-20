/**Des: 其他推广页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/20
 */

/*设置分页器
* Params:
 * page:当前页
 * total：一共多少条记录
 * rows：每页多少条记录
* */
function setPagination(obj){
    var page = obj.page;
    var total = obj.total;
    var rows = obj.rows;
    var totalPage = Math.ceil(total / rows);
    var liContent = "";

    //控制翻页器一共多长(1...6,7,8,9,10...totalPage)
    var start = 0;
    var end = 5;
    //如果条数不够五页，则以实际页数为准
    if(page > 5){
        start = page - 2;
        end = page + 2;
    }
    end = (totalPage < end) ? totalPage : end;
    if(start !== 0){
        //第一页必须保留
        liContent += "<li><a href='javascript:;'>1</a></li>";
        liContent += "<li class='disabled'><a href='javascript:;'>...</a></li>";
    }
    for(var j=start;j<end;j++){
        liContent += "<li><a href='javascript:;'>" + (j+1) + "</a></li>"
    }
    if(totalPage > 5 && end !== totalPage){
        //页码较多时最末页必须保留
        liContent += "<li class='disabled'><a href='javascript:;'>...</a></li>";
        liContent += "<li><a href='javascript:;'>" + totalPage + "</a></li>";
    }
    $("#totalNum").text(total);
    $("#paginationPages > li:first-child").nextAll().each(function(index,ele){
        if(!/next/.test($(ele).attr("class"))){
            $(ele).remove();
        }
    });
    $("#paginationPages > li:first-child").after(liContent);

    definePageClick(obj);
}

/*设置当前页码高亮
 * params:
 * page: 当前页码
 * totalPage: 总页码
* */
function setActive(page,totalPage){
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
                    trContent += "<td>" + valid + "</td>";
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

/*
* 定义页码点击事件
* params:
* page: 当前页码 必选
* 其余为筛选参数
* */
function definePageClick(dataObj){
    var page,curPage;
    $("#paginationPages > li > a").each(function (index, ele) {
        var className = $(ele).parent().attr("class");
        if(!className){
            $(ele).on("click",function () {
                //非前翻页后翻页的普通翻页元素
                page = parseInt($(ele).text());
                dataObj.page = page;
                $(ele).unbind("click");
                getData(dataObj);
            });
        }
    });

    $("#paginationPages > li.previous > a").unbind("click");
    $("#paginationPages > li.next > a").unbind("click");
    $("#paginationPages > li.previous > a").on("click", function () {
        if(!/disabled/.test($(this).parent().attr("class"))){
            curPage = $("#paginationPages > li.active > a").text();
            page = curPage - 1;
            //page = page <= 0 ? 1 : page;
            dataObj.page = page;
            getData(dataObj);
        }
    });

    $("#paginationPages > li.next > a").on("click", function () {
        if(!/disabled/.test($(this).parent().attr("class"))){
            curPage = $("#paginationPages > li.active > a").text();
            page = parseInt(curPage) + 1;
            //page = page >= totalPage ?
            dataObj.page = page;
            getData(dataObj);
        }
    });
}

//申请推广工资
function wageApply(){
    $("#salaryApplyWrap #submit").on("click", function () {
        var name = $("#name").val();
        var promoteType = $("#promoteType option:selected").val();
        var remark = $("#remark").val();
        $.ajax({
            url: "http://test1.qess.me/ceo/insertPromoteApply.htm",
            data: {name:name,promoteType:promoteType,remark:remark}
        }).done(function (ret) {
            console.log(ret);
            if(!ret.code){
                alert("提交成功！");
            }else {
                alert(ret.msg);
            }
        }).fail(function () {
            alert("提交失败！");
        });
    });
}

(function main() {
    //默认展示第一页，每页16条，待配送状态
    var page = 1;
    var rows = 16;
    var userInfo = 42;
    //TODO: userInfo需要修改为实际的
    getData({page:page,rows:rows,userInfo:userInfo});
    wageApply();
})();

