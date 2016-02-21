/**Des: 公共js
 * Author: jhxzhangjihong@126.com
 * Date: 2016/1/13.
 */
//全局变量区
var global = {
    domain: "http://ceo.qess.me",
    userInfo: ""
};

//头部高亮
(function () {
    var curUrl = window.location.pathname.split("/");
    curUrl = curUrl[curUrl.length - 1];
    var pattern,href;
    $("#rightNav > ul > li > a").each(function (index, ele) {
        href = $(ele).attr("href");
        if(href){
            pattern = new RegExp(href,"i");
            if(pattern.test(curUrl)){
                $("#rightNav .active").removeClass("active");
                $(this).parent().addClass("active");
            }
        }
    });
})();

//sidebar高亮
(function () {
    $("#sidebar li").on("click", function () {
        $("#sidebar .active").removeClass("active");
        $(this).addClass("active");
    });
})();

//datetimepicker格式设置
if($("#datetimepicker").length){
    $('#datetimepicker').datetimepicker({
        lang: 'ch',              //中文化
        format:"Y-m-d",      //格式化日期
        timepicker: false,     //关闭时间
        yearStart: 2000,
        yearEnd: 2050
    });

    $('#datetimepicker2').datetimepicker({
        lang: 'ch',              //中文化
        format:"Y-m-d",      //格式化日期
        timepicker: false,     //关闭时间
        yearStart: 2000,
        yearEnd: 2050
    });
}

//判断登录情况
(function () {
    var cookie = document.cookie.split(";");
    var isLogin = false;
    //方便线下调试
    var DEBUG = false;
    if(DEBUG){
        global.userInfo = 42;
        //for(var i in cookie){
        //    if(/userLoginName/.test(cookie[i])){
        //        $("#headerName").text(cookie[i].split("=")[1]);
        //    }
        //}
    }else {
        for(var i in cookie){
            if(/isLogin/.test(cookie[i])){
                var v = cookie[i].split("=")[1];
                if(!v){
                    //未登录则跳转登录页
                    window.location.href = "index.html";
                }else {
                    isLogin = true;
                }
            }
            if(isLogin){
                //登录情况下从cookie获取用户id
                if(/userId/.test(cookie[i])){
                    global.userInfo = cookie[i].split("=")[1];
                }
                if(/userLoginName/.test(cookie[i])){
                    $("#headerName").text(cookie[i].split("=")[1]);
                }
            }else {
                window.location.href = "index.html";
            }
        }
    }

})();

//根据订单状态调整颜色
function changeColor(){
    $("#dataTable td.order").css({
        "text-align": "center",
        "vertical-align": "center",
        "color": "#ffb000"
    });

    $("#dataTable td span:contains('配送完成')").css({
        "color": "#32a555"
    });

    $("#dataTable td span:contains('订单错误')").css({
        "color": "red"
    });
}

//修改单选按钮的选中效果
function radioCheck(ele){
    $("input[name='male']").attr("checked",true);
    $(ele).on("click", function () {
        if(!$(this).attr("checked")){
            $(ele).parent().find("input[checked='checked']").removeAttr("checked");
            $(this).attr("checked",true);
        }
    });
}

//翻页器公共函数

/*设置分页器
* Params:
 * page:当前页
 * total：一共多少条记录
 * rows：每页多少条记录
* */
function setPagination(obj){
    var page = obj.data.page;
    var total = obj.total;
    var rows = obj.data.rows;
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
                dataObj.data.page = page;
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
            dataObj.data.page = page;
            getData(dataObj);
        }
    });

    $("#paginationPages > li.next > a").on("click", function () {
        if(!/disabled/.test($(this).parent().attr("class"))){
            curPage = $("#paginationPages > li.active > a").text();
            page = parseInt(curPage) + 1;
            //page = page >= totalPage ?
            dataObj.data.page = page;
            getData(dataObj);
        }
    });
}

/*改变订单状态
* obj为修改订单状态时所需的参数对象
* updateObj供异步刷新用
* */
function changeStatus(obj,updateObj) {
    $("td.order ul.dropdown-menu a").each(function () {
        $(this).on("click", function () {
            var orderInfo = $(this).closest(".order").parent().children("td:nth-child(1)").attr("orderinfo");
            var orderStatus = $(this).attr("orderStatus");
            //var _this = $(this);
            $.ajax({
                url: global.domain + "/ceo/updateRemarkInfo.htm",
                data: {orderInfo: orderInfo,remarkInfo: orderStatus,userInfo: obj.userInfo,id: obj.id}
            }).done(function (ret) {
                ret = JSON.parse(ret);
                if(ret.code !== 0){
                    alert("修改状态失败:" + ret.msg);
                }else {
                    //异步刷新
                    //_this.closest(".dropdown").children("span:first").text(_this.text());
                    getData(updateObj);
                    setBadge();
                }
            }).fail(function () {
                alert("请求失败!");
            });
        });
    });
}

function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}

//点击头像效果
(function () {
    $("#logout").on("click", function () {
        //清除cookie中登录状态
        clearCookie();
    });
})();