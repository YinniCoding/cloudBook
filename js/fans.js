/**Des: 推广粉丝页js文件
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
        url: "http://test1.qess.me/ceo/getSubscribeList.htm",
        data: obj,
        beforeSend: function () {
            $("#loading").show();
        },
        success: function (ret) {
            $("#loading").hide();
            var ret = JSON.parse(ret);
            
            if(ret.code !== -1){
                var res = ret.result;
                var userName,imgPath,remark,addTime,stuRemark;
                var total = res.total;
                var totalPage = Math.ceil(total / obj.rows);
                var trContent = "<tr>";  
                for(var i in res.rows){
                    userName = res.rows[i].userName;
                    imgPath = res.rows[i].imgPath;
                    remark = res.rows[i].remark;
                    addTime = res.rows[i].addTime;
                    stuRemark = res.rows[i].stuRemark;
                    trContent += "<td>" + userName + "</td>";
                    trContent += "<td><img src='" + imgPath + "'</td>";
                    trContent += "<td>" + remark + "</td>";
                    trContent += "<td>" + addTime + "</td>";
                    trContent += "<td>" + stuRemark + "</td>";
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
                    userName:obj.userName
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
        var startTime = $("#datetimepicker").val().trim();
        var endTime = $("#datetimepicker2").val().trim();
        var query = $("#query").val().trim();
        var dataObj = {};
        dataObj.page = 1;
        dataObj.rows = 16;
        dataObj.userInfo = global.userInfo;
        if(query){
            dataObj.name = query;
        }
        if(startTime){
            dataObj.startTime = startTime;
        }
        if(endTime){
            dataObj.endTime = endTime;
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
    getData({page:page,rows:rows,userInfo:global.userInfo});
    filter();
})();

