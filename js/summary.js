/**Des: 概览js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
function getSummaryInfo(obj) {
    $.ajax({
        url: obj.domain + "/ceo/getIndexInfo.htm",
        data: {userInfo: obj.userInfo}
    }).done(function (ret) {
        ret = JSON.parse(ret);
        var res = ret.result;
        if(!ret.code){
            var NotDispatchingCount,NotExWarehouseCount,balances;
            NotDispatchingCount = res.NotDispatchingCount;
            NotExWarehouseCount = res.NotExWarehouseCount;
            balances = res.balances;
            $("#waitForSend").text(NotDispatchingCount);
            $("#waitForPop").text(NotExWarehouseCount);
            $("#salary").text(balances);
        }
    }).fail(function () {
        alert("请求失败");
    });
}

(function () {
    $("#info div").on("mouseover", function () {
        $(this).addClass("shadow");
    });
    $("#info div").on("mouseout", function () {
        $(this).removeClass("shadow");
    });
    $(".banner").luara({height:"100%",interval:4500,selected:"seleted",deriction:"left"});
    //$("#banner").luara({width:"500",height:"334",interval:4500,selected:"seleted",deriction:"left"});

    getSummaryInfo(global);
})();
