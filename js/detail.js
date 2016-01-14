/**Des: detail页js文件
 * Author：njhxzhangjihong@126.com
 * Date：2016/1/12
 */
function dataTable(){
    $(document).ready( function () {
        $('#dataTable').DataTable({
            "scrollY": "80%",
            "processing": true,
            color: "blue",
            "language": {
                "lengthMenu": "每页显示 _MENU_ 条",
                "zeroRecords": "没找到相关数据！",
                "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                "infoEmpty": "记录为空！",
                "sSearch": "搜索 ",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "末页"
                }
            }
        });
    } );
}

dataTable();