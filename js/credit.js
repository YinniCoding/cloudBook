/**Des: 资料页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
function getUserInfo(userInfo){
    $.ajax({
        url: "http://test1.qess.me/ceo/getCeoInfo.htm",
        data: {userInfo:userInfo}
    }).done(function (ret) {
        ret = JSON.parse(ret);
        var res = ret.result;
        var name,gender,phone,room,idCardNo,idCardAddr,studentNo,
            education,entryYear,school,bank,city,cardNo,father,
            fatherNo,fatherId,mother,motherNo,motherId,friend1,friend1No,
            friend1Id,friend2,friend2No,friend2Id;
        if(!ret.code){
            name = res.name;
            gender = res.gender;
            phone = res.phone;
            //room寝室缺少
            idCardNo = res.idCard;
            idCardAddr = res.address;
            studentNo = res.studentNo;
            //education学历缺少
            //entryYear入学年份缺少
            school = res.school;
            bank = res.bank;
            city = res.city;
            cardNo = res.cardNo;
            //parent字段不具体，未区分父母
            //friend字段未区分朋友1，朋友2
            $("#name > input").val(name);
            if(gender === 0){
                $("#gender > input").removeAttr("checked");
                $("#gender > input:last-child").attr("checked","checked");
            }
            $("#phone > input").val(phone);
            $("#idCardNo > input").val(idCardNo);
            $("#idCardAddr > input").val(idCardAddr);
            $("#studentCardNo > input").val(studentNo);
            $("#school > input").val(school);
            $("#bank > input").val(bank);
            $("#city > input").val(city);
            $("#cardNo > input").val(cardNo);
        }else {
            alert(ret.msg);
        }
    }).fail(function () {
        alert("请求失败！");
    });
}

(function () {
    $("input[type='submit']").on("click",function (){
        var fileName = $(this).parent().find("input[type='file']").val();
        if(!/[jpg|png|gif]$/i.test(fileName)){
            alert("照片格式为JPG/PNG/GIF！");
        }
    });
    getUserInfo(global.userInfo);
})();