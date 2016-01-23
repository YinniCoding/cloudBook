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

//upload file
function upload(url,contentEle) {
    var formData = new FormData($(contentEle)[0]);
    formData.append("userInfo",global.userInfo);
    $.ajax({
        url: url,
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(!ret.code){
            alert("上传成功！");
        }else {
            alert("上传失败：" + ret.msg);
        }
    }).fail(function () {
        alert("请求失败");
    });
}

//update information
function update(){
    var obj = {};
    obj.userInfo = global.userInfo;
    var name = $("#name > input").val(),
        //gender = $("#gender > input").val(),
        phone = $("#phone > input").val(),
        address = $("#addr > input").val(),
        idCard = $("#idCardNo > input").val(),
        //pidCard = $("#idCardFace").val(),
        //bidCard = $("#idCardBack").val(),
        //hidCard = $("#hidCard").val(),
        //sidCard = $("#studentCard").val(),
        school = $("#school > input").val(),
        studentNo = $("#studentCardNo > input").val(),
        cardNo = $("#cardNo > input").val(),
        bank = $("#bank > input").val(),
        city = $("#city > input").val(),
        reservedPhone = $("#tel > input").val(),
        fatherName = $("#father > input").val(),
        fatherPhone = $("#fatherNo > input").val(),
        fatherCard = $("#fatherId > input").val(),
        motherName = $("#mother > input").val(),
        motherPhone = $("#motherNo > input").val(),
        motherCard = $("#motherId > input").val(),
        friendName = $("#friend1 > input").val(),
        friendPhone = $("#friend1No > input").val(),
        friendCard = $("#friend1Id > input").val(),
        alipay = $("#alipay > input").val(),
        room = $("#room > input").val(),
        education = $("#education > input").val(),
        entryYear = $("#entryYear > input").val();
    var gender = $("#gender").find("input[checked='checked']").val();
    obj.gender = gender;
    obj.name = name;
    obj.gender = gender;
    obj.phone = phone;
    obj.address = address;
    obj.idCard = idCard;
    obj.school = school;
    obj.studentNo = studentNo;
    obj.cardNo = cardNo;
    obj.bank = bank;
    obj.city = city;
    obj.reservedPhone = reservedPhone;
    obj.fatherName = fatherName;
    obj.fatherPhone = fatherPhone;
    obj.fatherCard = fatherCard;
    obj.motherName = motherName;
    obj.motherPhone = motherPhone;
    obj.motherCard = motherCard;
    obj.friendName = friendName;
    obj.friendPhone = friendPhone;
    obj.friendCard = friendCard;
    obj.alipay = alipay;
    obj.room = room;
    obj.education = education;
    obj.entryYear = entryYear;
    console.log(obj);
    $.ajax({
        url: "http://test1.qess.me/ceo/updateCeoInfo.htm",
        data: obj
    }).done(function (ret) {
        ret = JSON.parse(ret);
        if(!ret.code){
            alert("更新成功");
        }else {
            alert("更新失败：" + ret.msg);
        }
    }).fail(function () {

    });
}

(function () {
    getUserInfo(global.userInfo);

    $("#gender > input[type='radio']").each(function () {
        radioCheck($(this));
    });

    var uploadEleArr = ["idCardFace","idCardBack","hidCardFace","studentCard"];
    for(var i in uploadEleArr){
        var item = uploadEleArr[i];
        $("#" + item).find("input[type='submit']").on('click', function () {
            var fileName = $(this).parent().find("input[type='file']").val();
            if(!/[jpg|png|gif]$/i.test(fileName)){
                alert("照片格式为JPG/PNG/GIF！");
            }
            upload("http://test1.qess.me/ceo/imgUpLoad.htm",$(item));
        });
    }

    $("#submit").on("click", function () {
        update();
    });
})();