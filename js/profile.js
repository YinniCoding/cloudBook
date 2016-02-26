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
            $("#branch > input").val(branch);
            $("#city > input").val(city);
            $("#cardNo > input").val(cardNo);
            $("#inviteCode").text(inviteCode);
            $("#qrcode").attr("src",qrcode);
        }else {
            alert(ret.msg);
            //清空默认的二维码和邀请吗
            getCode(obj);
        }
    }).fail(function (){
        alert("请求失败！");
    });
}

//获取邀请码和二维码
function getCode(obj) {
    $.ajax({
        url: obj.domain + "/ceo/getQrcode.htm",
        data: obj.data
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(ret.code == 0){
            $("#qrcode").attr("src",ret.result);
        }else {
            $("#qrcode").parent().html("无");
        }
    }).fail(function () {
        $("#qrcode").parent().html("无");
    });

    $.ajax({
        url: obj.domain + "/ceo/getInviteCode.htm",
        data: obj.data
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(ret.code == 0){
            $("#inviteCode").text(ret.result)
        }else {
            $("#inviteCode").text("无");
        }
    }).fail(function () {
        $("#inviteCode").text("无");
    });
}

function updateInfo(domain,userInfo) {
    var name = $("#name input").val(),
        gender = $("#gender input:checked").val(),
        phone = $("#phone input").val(),
        addr = $("#addr input").val(),
        bank = $("#bank input").val(),
        branch = $("#branch input").val(),
        city = $("#city input").val(),
        cardNo = $("#cardNo input").val();
    $.ajax({
        url: domain + "/ceo/updateBasicInfo.htm",
        data: {userInfo: userInfo,name: name,gender: gender,phone: phone,address: addr,bank: bank,branch: branch,city: city,cardNo: cardNo}
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(ret.code === 0){
            alert("修改成功！");
            //window.location.reload();
        }else {
            alert("修改失败： " + ret.msg);
        }
    }).fail(function () {
        alert("请求失败！");
    });
}

(function (){
    getUserInfo({domain:global.domain,data:{userInfo:global.userInfo}});

    $("#gender > input[type='radio']").each(function () {
        radioCheck($(this));
    });

    $("#modifyBtn button").on("click", function () {
        updateInfo(global.domain,global.userInfo);
    })
})();

