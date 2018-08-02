/**

 @Name：layuiAdmin 内容系统
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */


layui.define(['table', 'form'], function (exports) {
    var $ = layui.$
        , table = layui.table
        , form = layui.form
        , admin = layui.admin;

    //文章管理
    table.render({
        elem: '#LAY-app-content-list'
        , url: layui.setter.base + 'json/content/list.js' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 100, title: '文章ID', sort: true}
            , {field: 'label', title: '文章标签', minWidth: 100}
            , {field: 'title', title: '文章标题'}
            , {field: 'author', title: '作者'}
            , {field: 'uploadtime', title: '上传时间', sort: true}
            , {field: 'status', title: '发布状态', templet: '#buttonTpl', minWidth: 80, align: 'center'}
            , {title: '操作', minWidth: 150, align: 'center', fixed: 'right', toolbar: '#table-content-list'}
        ]]
        , page: true
        , limit: 10
        , limits: [10, 15, 20, 25, 30]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-app-content-list)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此文章？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.open({
                type: 2
                , title: '编辑文章'
                , content: '../../../views/app/content/listform.html?id=' + data.id
                , maxmin: true
                , area: ['550px', '550px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#layuiadmin-app-form-edit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(layuiadmin-app-form-edit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        obj.update({
                            label: field.label
                            , title: field.title
                            , author: field.author
                            , status: field.status
                        }); //数据更新

                        form.render();
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
            });
        }
    });

    //分类管理
    // table.render({
    //     elem: '#LAY-app-content-tags'
    //     , url: layui.setter.base + 'json/table/user.js'
    //     , cols: [[
    //         {field: 'experience', title: '编号', fixed: true}
    //         , {field: 'id', title: '网站主ID', sort: true}
    //         , {field: 'username', title: '网站域名'}
    //         , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#layuiadmin-app-cont-tagsbar'}
    //     ]]
    //     , page: true
    // });


    //站长列表里的展示模式控制编辑、查看
    table.on('tool(LAY-app-content-tags-domain)', function (obj) {
        var data = obj.data;
        var wesid = data.id;
        if (obj.event === 'edit') {
            var tr = $(obj.tr);
            var hrefs = window.location.href;
            var siteid = hrefs.split('=')[1];
            layer.open({
                type: 2
                , title: '编辑设置'
                , content: 'edit.html?id=' + wesid
                , area: ['800px', '520px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , content = othis.find('textarea[name="content"]').val()
                        , js_alias_id = othis.find('select[name="js_alias_id"]').next().find('input').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field;
                        admin.req({
                            type: "POST",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainurl + '/api/v1/switchjs/update/' + wesid,//url
                            data: {
                                id: wesid,
                                js_name: js_name,
                                content: content,
                                js_alias_id: js_alias_id
                            },
                            done: function (res) {
                                obj.update({
                                    id: wesid,
                                    js_name: js_name,
                                    content: content,
                                    alias: js_alias_id
                                });
                                layer.msg('修改成功');
                                layer.close(index);
                            },
                            error: function (e, code) {
                                layer.msg(e.responseJSON.errors.js_alias_id[0], {icon: 5});
                            }
                        });
                    })
                    submit.trigger('click');
                    if (!js_name.replace(/\s/g, '')) return;
                    if (!js_alias_id.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name)
                    othis.find('input[name="js_alias_id"]').val(data.alias)
                        , othis.find('textarea[name="content"]').val(data.content);
                }
            });
        } else if (obj.event === 'check') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '查看设置'
                , content: 'look.html?id=' + wesid
                , area: ['800px', '520px']
                , btn: ['确定']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , js_alias_id = othis.find('input[name="js_alias_id"]').val()
                        , content = othis.find('textarea[name="content"]').val();

                    if (!js_name.replace(/\s/g, '')) return;
                    if (!js_alias_id.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                    layer.close(index);
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name)
                        , othis.find('select[name="js_alias_id"]').val(data.js_alias_id)
                        , othis.find('textarea[name="content"]').val(data.content);
                }
            });
        } else if (obj.event === 'abolish') {
            layer.confirm('确定删除此JS的配置吗', function(index){
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainurl + '/api/v1/sitejsconf/del/' + wesid,//url
                    done: function (res) {
                        layer.msg('已经清空');
                        layer.close(index);
                    }
                });
            });
        }
    });


    //网站主域名列表里的展示模式控制
    table.on('tool(LAY-app-content-tags-wes)', function (obj) {
        var data = obj.data;
        var wesid = data.id;
        if (obj.event === 'edit') {
            var tr = $(obj.tr);
            var hrefs = window.location.href;
            var siteid = hrefs.split('=')[1];
            layer.open({
                type: 2
                , title: '编辑设置'
                , content: 'edit.html?id=' + wesid
                , area: ['800px', '520px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , content = othis.find('textarea[name="content"]').val()
                        , js_alias_id = othis.find('select[name="js_alias_id"]').next().find('input').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field;
                        admin.req({
                            type: "POST",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainurl + '/api/v1/switchjs/update/' + wesid,//url
                            data: {
                                id: wesid,
                                js_name: js_name,
                                content: content,
                                js_alias_id: js_alias_id
                            },
                            done: function (res) {
                                obj.update({
                                    id: wesid,
                                    js_name: js_name,
                                    content: content,
                                    alias: js_alias_id
                                });
                                layer.msg('修改成功');
                                layer.close(index);
                            },
                            error: function (e, code) {
                                layer.msg(e.responseJSON.errors.js_alias_id[0], {icon: 5});
                            }
                        });
                    })
                    submit.trigger('click');
                    if (!js_name.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name),
                        othis.find('select[name="js_alias_id"]').val(data.alias)
                        , othis.find('textarea[name="content"]').val(data.content)
                    ;
                }
            });
        } else if (obj.event === 'check') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '查看设置'
                , content: 'look.html?id=' + wesid
                , area: ['800px', '520px']
                , btn: ['确定']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , js_alias_id = othis.find('input[name="js_alias_id"]').val()
                        , content = othis.find('textarea[name="content"]').val();

                    if (!js_name.replace(/\s/g, '')) return;
                    if (!js_alias_id.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                    layer.close(index);
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name)
                        , othis.find('select[name="js_alias_id"]').val(data.js_alias_id)
                        , othis.find('textarea[name="content"]').val(data.content);
                }
            });
        } else if (obj.event === 'abolish') {
            layer.confirm('确定删除此JS的配置吗', function(index){
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainurl + '/api/v1/sitejsconf/del/' + wesid,//url
                   done: function (res) {
                        layer.msg('已经清空');
                        layer.close(index);
                    }
                });
            });

        }
    });


    //展示模式控制
    table.on('tool(LAY-app-content-tags-show)', function (obj) {
        var data = obj.data;
        var wesid = data.id;
        if (obj.event === 'edit') {
            var tr = $(obj.tr);
            var hrefs = window.location.href;
            var siteid = hrefs.split('=')[1];
            layer.open({
                type: 2
                , title: '编辑设置'
                , content: 'edit.html?id=' + wesid
                , area: ['600px', '500px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {

                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , content = othis.find('textarea[name="content"]').val()
                        , js_alias_id = othis.find('select[name="js_alias_id"]').next().find('input').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field;
                        $.ajax({
                            type: "POST",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainurl + '/api/v1/switchjs/update/' + wesid,//url
                            data: {
                                id: wesid,
                                js_name: js_name,
                                content: content,
                                js_alias_id: js_alias_id
                            },
                            success: function (res) {
                                obj.update({
                                    id: wesid,
                                    js_name: js_name,
                                    content: content,
                                    alias: js_alias_id
                                });
                                layer.msg('修改成功');
                                layer.close(index);
                            }
                        });
                    })
                    submit.trigger('click');
                    if (!js_name.replace(/\s/g, '')) return;
                    if (!js_alias_id.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name)
                        , othis.find('select[name="js_alias_id"]').val(data.alias)
                        , othis.find('textarea[name="content"]').val(data.content);
                }
            });
        } else if (obj.event === 'check') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '查看设置'
                , content: 'look.html?id=' + wesid
                , area: ['600px', '500px']
                , btn: ['确定']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , js_name = othis.find('input[name="js_name"]').val()
                        , js_alias_id = othis.find('input[name="js_alias_id"]').val()
                        , content = othis.find('textarea[name="content"]').val();
                    if (!js_name.replace(/\s/g, '')) return;
                    if (!js_alias_id.replace(/\s/g, '')) return;
                    if (!content.replace(/\s/g, '')) return;
                    layer.close(index);
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="js_name"]').val(data.js_name)
                        , othis.find('input[name="js_alias_id"]').val(data.js_alias_id)
                        , othis.find('textarea[name="content"]').val(data.content);
                }
            });
        }
    });

    //评论管理
    table.render({
        elem: '#LAY-app-content-comm'
        , url: layui.setter.base + 'json/content/comment.js' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 100, title: 'ID', sort: true}
            , {field: 'reviewers', title: '评论者', minWidth: 100}
            , {field: 'content', title: '评论内容', minWidth: 100}
            , {field: 'commtime', title: '评论时间', minWidth: 100, sort: true}
            , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-content-com'}
        ]]
        , page: true
        , limit: 10
        , limits: [10, 15, 20, 25, 30]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-app-content-comm)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此条评论？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            layer.open({
                type: 2
                , title: '编辑评论'
                , content: '../../../views/app/content/contform.html'
                , area: ['450px', '300px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'layuiadmin-app-comm-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    //监听提交
                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-app-content-comm'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            });
        }
    });

    exports('contlist', {})
});