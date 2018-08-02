/** layui-v2.3.0 MIT License By https://www.layui.com */

//定义模块
layui.define(['form'], function(exports){

    var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
    var $ = layui.$;
    var $ = layui.$
        , form = layui.form
        , layer = layui.layer;

    var obj = {
        setSelect: function (res, id, data, value, show, msg) {
            $("select[name='" + id + "']").html("<option value='-1'>"+msg+"</option>");
            if(res.code==0){
                if(res.count==0){
                    // layer.msg('没有数据');
                }else{
                    for (i = 0; i < data.length; i++) {
                        // console.log(data[i][value]);
                        // data[i][value];
                        if(data[i] != null){
                            $("select[name='" + id + "']").append("<option value='" + data[i][value] + "'>" + data[i][show] + "</option>");
                        }
                    }
                    form.render('select', 'set_' + id);
                }

            }else{
                layer.msg('数据异常');
            }
        }
    }

    //输出模块
    exports('result', obj);
});