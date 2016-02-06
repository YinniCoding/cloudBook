/**Des: 用户资料页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/20.
 */
function getUserInfo(obj) {
    $.ajax({
        url: obj.domain + "/ceo/getCeoInfo.htm",
        data: obj.data
    }).done(function (ret) {
        ret = JSON.parse(ret);
        var res = ret.result;
        var name,gender,phone,addr,bank,branch,city,cardNo,inviteCode,qrcode;
        if(ret.code == 0){
            name = res.name;
            gender = res.gender;
            phone = res.phone;
            addr = res.address;
            bank = res.bank;
            branch = res.branch;
            city = res.city;
            cardNo = res.cardNo;
            inviteCode = res.inviteCode;
            qrcode = res.qrcode;
            $("#name > input").val(name);
            if(gender === 0){
                $("#gender > input:checked").removeAttr("checked");
                $("#gender > input:last-child").attr("checked","checked");
            }
            $("#phone > input").val(phone);
            $("#addr > input").val(addr);
            $("#bank > input").val(bank);
            $("#city > input").val(city);
            $("#cardNo > input").val(cardNo);
            $("#inviteCode").text(inviteCode);
            $("#qrcode").attr("src",qrcode);
        }else {
            alert(ret.msg);
        }
    }).fail(function (){
        alert("请求失败！");
    });
}

(function (){
    getUserInfo({domain:global.domain,data:{userInfo:global.userInfo}});

    $("#gender > input[type='radio']").each(function () {
        radioCheck($(this));
    });   
})();

