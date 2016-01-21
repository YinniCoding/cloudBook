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
            room = res.room;
            idCardNo = res.idCard;
            idCardAddr = res.address;
            studentNo = res.studentNo;
            education = res.education;
            entryYear = res.entryYear;
            school = res.school;
            bank = res.bank;
            city = res.city;
            cardNo = res.cardNo;
            father = res.fatherName;
            fatherId = res.fatherCard;
            fatherNo = res.fatherPhone;
            mother = res.motherName;
            motherId = res.motherCard;
            motherNo = res.motherPhone;
            friend1 = res.friendName;
            friend1Id = res.friendCard;
            friend1No = res.friendPhone;
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
            $("#room > input").val(room);
            $("#education > input").val(education);
            $("#entryYear > input").val(entryYear);
            $("#father > input").val(father);
            $("#fatherId > input").val(fatherId);
            $("#fatherNo > input").val(fatherNo);
            $("#mother > input").val(mother);
            $("#motherId > input").val(motherId);
            $("#motherNo > input").val(motherNo);
            $("#friend1 > input").val(friend1);
            $("#friend1Id > input").val(friend1Id);
            $("#friend1No > input").val(friend1No);
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