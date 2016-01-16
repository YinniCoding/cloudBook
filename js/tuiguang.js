/**Des: 推广页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/16
 */
(function () {
    //获取订单
    $.ajax({
        url: "http://test1.qess.me/ceo/getAssignmentList.htm",
        data: {page:1,rows:10,userInfo:42},
        success: function (ret) {
            var ret = JSON.parse(ret);
            var res = ret.result;
            if(ret.code !== -1){
                var len = res.rows.length;
                var tradeNumber,addTime,name,phone,address,message,inviteCode,remarkInfo;
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
            }else {
                alert("请求出错：" + ret.msg);
            }
        }
    });
})();