// 请求数据放进select下拉框里


function a(res, id, data, value, show){

    if(res.code==0){
        if(res.count==0){
            layer.msg('没有数据');
        }else{
            setSelect(id, data, value, show);
        }

    }else{
        layer.msg('数据异常');
    }
}