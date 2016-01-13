/**Des: 资料页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/13.
 */
(function () {
    $("input[type='submit']").on("click",function (){
        var fileName = $(this).parent().find("input[type='file']").val();
        if(!/[jpg|png|gif]$/i.test(fileName)){
            alert("照片格式为JPG/PNG/GIF！");
        }
    });
})();