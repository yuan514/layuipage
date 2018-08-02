/**

 @Name：layuiAdmin 用户管理 管理员管理 角色管理
 @Author：star1029
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */


layui.define(['table', 'form'], function (exports) {
    var $ = layui.$
        , table = layui.table
        , admin = layui.admin
        , form = layui.form
        , layer = layui.layer;

    //用户管理
    table.render({
        elem: '#LAY-user-manage'
        , url: layui.setter.base + 'json/useradmin/webuser.js' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 100, title: 'ID', sort: true}
            , {field: 'username', title: '用户名', minWidth: 100}
            , {field: 'avatar', title: '头像', width: 100, templet: '#imgTpl'}
            , {field: 'phone', title: '手机'}
            , {field: 'email', title: '邮箱'}
            , {field: 'sex', width: 80, title: '性别'}
            , {field: 'ip', title: 'IP'}
            , {field: 'jointime', title: '加入时间', sort: true}
            , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-webuser'}
        ]]
        , page: true
        , limit: 30
        , height: 'full-220'
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-manage)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.prompt({
                formType: 1
                , title: '敏感操作，请验证口令'
            }, function (value, index) {
                layer.close(index);

                layer.confirm('真的删除行么', function (index) {
                    obj.del();
                    layer.close(index);
                });
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑用户'
                , content: '../../../views/user/user/userform.html'
                , maxmin: true
                , area: ['500px', '450px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    //监听提交
                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-front-submit'); //数据刷新
                        layer.close(index); //关闭弹层
                    });
                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            });
        }
    });

    //管理员管理
    table.render({
        elem: '#LAY-user-back-manage'
        , url: layui.setter.base + 'json/useradmin/mangadmin.js' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', width: 80, title: 'ID', sort: true}
            , {field: 'loginname', title: '登录名'}
            , {field: 'telphone', title: '手机'}
            , {field: 'email', title: '邮箱'}
            , {field: 'role', title: '角色'}
            , {field: 'jointime', title: '加入时间', sort: true}
            , {field: 'check', title: '审核状态', templet: '#buttonTpl', minWidth: 80, align: 'center'}
            , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-manage)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.prompt({
                formType: 1
                , title: '敏感操作，请验证口令'
            }, function (value, index) {
                layer.close(index);
                layer.confirm('确定删除此管理员？', function (index) {
                    obj.del();
                    layer.close(index);
                });
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑管理员'
                , content: '../../../views/user/administrators/adminform.html'
                , area: ['420px', '420px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-back-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    //监听提交
                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-front-submit'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });

    //域名配置
    table.render({
        elem: '#LAY-user-back-role'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', title: '域名ID', sort: true}
            , {field: 'rolename', title: '域名名称'}
            , {field: 'limits', title: '域名类型'}
            , {field: 'descr', title: '域名描述'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'descr', title: '状态'}
            , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //域名配置
    table.on('tool(LAY-user-back-role)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此域名配置？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑域名配置'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //apk列表
    table.render({
        elem: '#LAY-user-back-role-al'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {field: 'id', title: 'apkID', sort: true}
            , {field: 'rolename', title: 'apk名称'}
            , {field: 'limits', title: 'apk域名'}
            , {field: 'descr', title: 'apk上传类型'}
            , {field: 'limits', title: 'apk路径'}
            , {field: 'descr', title: 'apk描述'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'descr', title: '状态'}
            , {title: '操作', width: 150, align: 'center', fixed: 'right', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-al)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-al'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //apk规则列表
    table.render({
        elem: '#LAY-user-back-role-rl'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', title: '规则ID', sort: true}
            , {field: 'rolename', title: '规则名称'}
            , {field: 'limits', title: '代理类型'}
            , {field: 'descr', title: '随机值长度'}
            , {field: 'limits', title: 'HTML前缀/后缀'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'descr', title: '状态'}
            , {title: '操作', width: 150, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-rl)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-rl'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //海南技巧
    table.render({
        elem: '#LAY-user-back-role-hn'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', title: '技巧ID', sort: true}
            , {field: 'rolename', title: '技巧名称'}
            , {field: 'limits', title: '入口域名'}
            , {field: 'descr', title: '入口路径'}
            , {field: 'rolename', title: '是否启用二级跳转'}
            , {field: 'limits', title: '跳转次数'}
            , {field: 'descr', title: '跳转参数名'}
            , {field: 'descr', title: '跳转参数名不同参数'}
            , {field: 'limits', title: 'HTML前缀/后缀'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'descr', title: '状态'}
            , {title: '操作', width: 150, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-hn)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-hn'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //乐樽技巧
    table.render({
        elem: '#LAY-user-back-role-lz'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', title: '技巧ID', sort: true}
            , {field: 'rolename', title: '技巧名称'}
            , {field: 'limits', title: '入口域名'}
            , {field: 'descr', title: '入口路径'}
            , {field: 'limits', title: 'HTML静态页'}
            , {field: 'limits', title: '添加时间'}
            , {title: '操作', width: 150, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-lz)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-lz'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //落地页模板管理
    table.render({
        elem: '#LAY-user-back-role-mp'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', title: '模板ID', sort: true}
            , {field: 'rolename', title: '模板文件名'}
            , {field: 'limits', title: '模板路径'}
            , {field: 'descr', title: '模板描述'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'limits', title: '状态'}
            , {title: '操作', width: 150, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-mp)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-mp'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //配置技巧
    table.render({
        elem: '#LAY-user-back-role-sc'
        , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , cols: [[
            {type: 'checkbox'}
            , {field: 'id', title: '配置ID', sort: true}
            , {field: 'rolename', title: '包号'}
            , {field: 'limits', title: 'apk'}
            , {field: 'limits', title: 'apk代理规则'}
            , {field: 'limits', title: '技巧'}
            , {field: 'limits', title: '模板文件名'}
            , {field: 'limits', title: '配置描述'}
            , {field: 'limits', title: '添加时间'}
            , {field: 'limits', title: '状态'}
            , {title: '操作', width: 150, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-sc)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-sc'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });


    //手机号配置
    table.render({
        elem: '#LAY-user-back-role-mc'
        // , url: layui.setter.base + '../views/app/message/text.json' //模拟接口
        , url: domainName + '/sms/list'
        , cols: [[
            {field: 'id', title: 'ID', sort: true}
            , {field: 'phone', title: '手机号'}
            , {field: 'name', title: '名称'}
            , {field: 'status', templet: '#buttonTpl', title: '状态'}
            , {title: '操作', width: 240, align: 'center', toolbar: '#layuiadmin-app-cont-tagsbar'}
        ]]
        , text: '对不起，加载出现异常'
        , limit: 10
        , page: true
    });
    //监听工具条
    table.on('tool(LAY-user-back-role-mc)', function (obj) {
        var data = obj.data;
        var id = data.id;
        status = data.status == 'y' ? 'n' : 'y';
        if (obj.event === 'del') {
            layer.confirm('确定删除此手机号？', function (index) {
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/sms/delete',//url
                    data: {"id": id, "access_token": layui.data('layuiAdmin').access_token,},
                    done: function (res) {
                        if (res.code == 0) {
                        } else {
                        }
                        ;
                    }
                })
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '编辑手机号'
                , content: 'roleform.html?id=' + data.id
                , area: ['450px', '280px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , phone = othis.find('input[name="phone"]').val()
                        , name = othis.find('input[name="name"]').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field;
                        $.ajax({
                            type: "GET",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainName + '/sms/update',//url
                            data: {
                                "id": id,
                                "access_token": layui.data('layuiAdmin').access_token,
                                "phone": phone,
                                "name": name
                            },
                            success: function (res) {
                                if (res.code == 0) {
                                    admin.req({
                                        type: 'GET',
                                        dataType: "json",//预期服务器返回的数据类型
                                        url: domainName + '/sms/send',
                                        data: {
                                            "access_token": layui.data('layuiAdmin').access_token,
                                            "phone": phone
                                        },
                                        done: function (res) {
                                            obj.update({
                                                id: id,
                                                phone: phone,
                                                name: name
                                            });
                                            // layer.msg(res.msg)
                                            layer.close(index);
                                        }
                                    })
                                } else {
                                    layer.msg(res.msg)
                                }
                                ;
                            }
                        })
                    })
                    submit.trigger('click');

                    if (!phone.replace(/\s/g, '')) return;
                    if (!name.replace(/\s/g, '')) return;

                    // 调用api

                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="phone"]').val(data.phone);
                    othis.find('input[name="name"]').val(data.name);
                }
            });
        } else if (obj.event === 'status') {
            layer.confirm('执行此操作？', function (index) {
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/sms/status',//url
                    data: {"id": id, "access_token": layui.data('layuiAdmin').access_token, "status": status},
                    done: function (res) {
                        if (res.code == 0) {
                        } else {
                        }
                        ;
                    }
                })
                obj.update({
                    id: id,
                    status: status
                });
                layer.close(index);
            });
        }
    });


    //短信日志
    table.render({
        elem: '#LAY-user-back-role-md'
        // , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , url: domainName + '/smslog/list'
        , where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        , cols: [[
            {field: 'id', title: 'ID', sort: true}
            , {field: 'content', title: '短信内容'}
            , {field: 'phone', title: '手机号'}
            , {field: 'type', templet: '#buttonTpms', title: '短信类型'}
            , {field: 'time', title: '发送时间'}
        ]]
        , text: '对不起，加载出现异常！'
        , page: true
    });


    //浏览器拦截
    table.render({
        elem: '#LAY-user-back-role-ll'
        // , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , url: domainName + '/intercept/list'
        , where: {
            type: "1",
            access_token: layui.data('layuiAdmin').access_token
        }
        , cols: [[
            {field: 'id', title: 'ID', sort: true}
            , {field: 'domain', title: '域名'}
            , {field: 'wx', templet: "#buttonTpwx", title: '微信'}
            , {field: 'qq', templet: "#buttonTpqq", title: 'QQ'}
            , {field: '_360', templet: "#buttonTp360", title: '360'}
            , {field: 'result', templet: "#buttonTp", title: '拦截状态'}
            , {field: 'status', templet: '#buttonTpl', title: '状态'}
            , {title: '操作', width: 240, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
        , page: true
    });

//监听工具条
    table.on('tool(LAY-user-back-role-ll)', function (obj) {
        var data = obj.data;
        var id = data.id, type = data.type;
        status = data.status == 'y' ? 'n' : 'y';
        if (obj.event === 'del') {
            layer.confirm('确定删除此域名？', function (index) {
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/intercept/delete',//url
                    data: {"id": id, "access_token": layui.data('layuiAdmin').access_token,},
                    success: function (res) {
                        if (res.code == 0) {
                        } else {
                        }
                        ;
                    }
                })
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '编辑域名'
                , content: 'll.html?id=' + data.id
                , area: ['450px', '240px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , domain = othis.find('input[name="domain"]').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);

                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field; //获取提交的字段
                        // 调用api
                        $.ajax({
                            type: "GET",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainName + '/intercept/update',//url
                            data: {
                                "id": id,
                                "access_token": layui.data('layuiAdmin').access_token,
                                "type": type,
                                "domain": domain
                            },
                            success: function (res) {

                                if (res.code == 0) {
                                    var loadingIndex = layer.load(1, {
                                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                                    });
                                    $.ajax({
                                        type: "GET",//方法类型
                                        dataType: "json",//预期服务器返回的数据类型
                                        url: domainName + '/check/intercept',//url
                                        data: {},
                                        success: function (res) {
                                            if(res.code==0){
                                                obj.update({
                                                    domain: domain
                                                });
                                                layer.close(loadingIndex);
                                                layer.close(index);
                                                layer.msg("编辑并检测完成")
                                            }else{
                                                layer.msg(res.data)
                                            }

                                        }
                                    })

                                } else {
                                    layer.msg(res.msg)
                                }
                                ;
                            }
                        })

                    })

                    submit.trigger('click');


                    if (!domain.replace(/\s/g, '')) return;


                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="domain"]').val(data.domain);
                }
            });
        } else if (obj.event === 'status') {
            layer.confirm('执行此操作？', function (index) {
                admin.req({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/intercept/status',//url
                    data: {
                        "id": id,
                        "access_token": layui.data('layuiAdmin').access_token,
                        "type": type,
                        "status": status
                    },
                    done: function (res) {
                        if (res.code == 0) {
                        } else {
                        }
                        ;
                    }
                })
                obj.update({
                    id: id,
                    type: type,
                    status: status
                });
                layer.close(index);
            });
        }
    });


    //域名备案
    table.render({
        elem: '#LAY-user-back-role-df'
        // , url: layui.setter.base + '../views/component/nav/text.json' //模拟接口
        , url: domainName + '/intercept/list'
        , where: {
            type: "2",
            access_token: layui.data('layuiAdmin').access_token
        }
        , cols: [[
            {field: 'id', title: 'ID', sort: true}
            , {field: 'domain', title: '域名'}
            , {field: 'result', templet: "#buttonTpbeian", title: '备案状态'}
            , {field: 'status', templet: '#buttonTpl', title: '状态'}
            , {title: '操作', width: 240, align: 'center', toolbar: '#table-useradmin-admin'}
        ]]
        , text: '对不起，加载出现异常！'
        , page: true
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-df)', function (obj) {
        var data = obj.data;
        var id = data.id, type = data.type;
        status = data.status == 'y' ? 'n' : 'y';
        if (obj.event === 'del') {
            layer.confirm('确定删除此域名？', function (index) {
                $.ajax({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/intercept/delete',//url
                    data: {"id": id, "access_token": layui.data('layuiAdmin').access_token,},
                    success: function (res) {
                        if (res.code == 0) {

                        } else {

                        }
                        ;
                    }
                })
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);
            layer.open({
                type: 2
                , title: '编辑域名'
                , content: 'dr.html?id=' + data.id
                , area: ['450px', '240px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    //获取iframe元素的值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags")
                        , domain = othis.find('input[name="domain"]').val();

                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submitID = 'LAY-user-front-submit'
                        , submit = layero.find('iframe').contents().find('#' + submitID);


                    iframeWindow.layui.form.on('submit(' + submitID + ')', function (data) {
                        var field = data.field; //获取提交的字段

                        // 调用api
                        $.ajax({
                            type: "GET",//方法类型
                            dataType: "json",//预期服务器返回的数据类型
                            url: domainName + '/intercept/update',//url
                            data: {
                                "id": id,
                                "access_token": layui.data('layuiAdmin').access_token,
                                "type": type,
                                "domain": domain
                            },
                            success: function (res) {
                                if (res.code == 0) {
                                    var loadingIndex = layer.load(1, {
                                        shade: [0.1, '#fff'] //0.1透明度的白色背景
                                    });
                                    $.ajax({
                                        type: "GET",//方法类型
                                        dataType: "json",//预期服务器返回的数据类型
                                        url: domainName + '/check/beian',//url
                                        data: {},
                                        success: function (res) {
                                            obj.update({
                                                domain: domain
                                            });
                                            layer.close(loadingIndex);
                                            layer.close(index);
                                            layer.msg("编辑并检测完成")
                                        }
                                    })
                                } else {
                                    layer.msg(res.msg);
                                }
                                ;
                            }
                        })

                    })
                    submit.trigger('click');
                    if (!domain.replace(/\s/g, '')) return;
                }
                , success: function (layero, index) {
                    //给iframe元素赋值
                    var othis = layero.find('iframe').contents().find("#layuiadmin-app-form-tags").click();
                    othis.find('input[name="domain"]').val(data.domain);
                }
            });
        } else if (obj.event === 'status') {
            layer.confirm('执行此操作？', function (index) {
                $.ajax({
                    type: "GET",//方法类型
                    dataType: "json",//预期服务器返回的数据类型
                    url: domainName + '/intercept/status',//url
                    data: {
                        "id": id,
                        "access_token": layui.data('layuiAdmin').access_token,
                        "type": type,
                        "status": status
                    },
                    success: function (res) {
                        if (res.code == 0) {
                        } else {
                        }
                        ;
                    }
                })
                obj.update({
                    id: id,
                    status: status
                });
                layer.close(index);
            });

        }
    });


    //汇总表
    table.render({
        elem: '#LAY-user-back-role-me'
        // , url: layui.setter.base + 'json/useradmin/test.json' //模拟接口
        , url: domainName + '/count/list'
        , where: {
            access_token: layui.data('layuiAdmin').access_token
        }
        , cols: [[
            {field: 'pack', width: 160, fixed: 'left', title: '包号'}
            , {field: 'date', width: 160, title: '日期'}
            , {field: 'ldy', width: 160, title: '落地页请求'}
            , {field: 'ldyt', width: 180, title: '落地页头部加载完成数'}
            , {field: 'ldyw', width: 180, title: '落地页尾加载完成数'}
            // , {field: 'ldyw', width: 180, title: '落地页头部ip数'}
            // , {field: 'ldyw', width: 180, title: '落地页尾部ip数'}
            , {field: 'qx', width: 160, title: '取消按钮点击次数'}
            , {field: 'qr', width: 160, title: '确认点击'}
            , {field: 'dl', width: 140, title: '独立ip下载数'}
            , {field: 'fin', width: 160, title: '独立IP下载完成数'}
            , {field: 'agt-dl', width: 160, title: '代理下载数'}
            , {field: 'agt-fin', width: 160, title: '代理下载完成数'}
            , {field: 'tot-dl', width: 160, title: '总计下载数'}
            , {field: 'tot-fin', width: 160, fixed: 'right', title: '总计下载完成数'}



            // {type: 'checkbox', fixed: 'left'}
            // // ,{field:'ID',width:100,title:'ID'}
            // ,{field:'pack',width:160,title:'包号'}
            // ,{field:'date',width:160,title:'日期'}
            // , {field: 'ldyt', width: 180, title: '落地页头部加载完成数'}
            // , {field: 'ldyw', width: 180,  title: '落地页尾加载完成数'}
            // , {field: 'ldy', width: 160, title: '落地页请求'}
            // , {field: 'dl',  width: 140,title: '独立ip下载数'}
            // , {field: 'fin', width: 160, title: '独立IP下载完成数'}
            // , {field: 'agt-dl', width: 160, title: '代理下载数'}
            // , {field: 'agt-fin', width: 160, title: '代理下载完成数'}
            // , {field: 'tot-fin',  width: 160,title: '总计下载完成数'}
            // , {field: 'tot-dl',  width: 160,title: '总计下载数'}
            // , {field: 'xztz', width: 160, title: '下载跳转'}
            // , {field: 'qx',  width: 160,title: '取消按钮点击次数'}
            // , {field: 'qr', width: 160,fixed: 'right', title: '确认点击'}
            // , {field: 'df-dl',  width: 160,title: '独立IP默认下载数'}
            // , {field: 'df-fin', width: 160, title: '独立IP默认下载完成数'}
            // , {field: 'df-adl', width: 160, title: '代理默认下载数'}
            // , {field: 'df-afin', width: 160, title: '代理默认下载完成数'}
            // , {field: 'idf-dl', width: 160, title: '独立IP非默认下载数'}
            // , {field: 'idf-fin',  width: 180,title: '独立IP非默认下载完成数'}
            // , {field: 'idf-adl',  width: 160,title: '代理非默认下载数'}
            // , {field: 'idf-afin',  width: 160,title: '代理非默认下载完成数'}
            // , {field: 'id', title: 'ID', fixed: 'left', sort: true}
            // , {field: 'rk',  width: 160,title: '入口请求'}
            // , {field: 'ldys',  width: 160,title: '落地页跳转'}
            // , {field: 'ldyf',  width: 160,title: '落地页加载完成'}

        ]]
        , text: '对不起，加载出现异常！'
    });

    //监听工具条
    table.on('tool(LAY-user-back-role-me)', function (obj) {
        var data = obj.data;
        if (obj.event === 'del') {
            layer.confirm('确定删除此角色？', function (index) {
                obj.del();
                layer.close(index);
            });
        } else if (obj.event === 'edit') {
            var tr = $(obj.tr);

            layer.open({
                type: 2
                , title: '编辑角色'
                , content: '../../../views/user/administrators/roleform.html'
                , area: ['500px', '480px']
                , btn: ['确定', '取消']
                , yes: function (index, layero) {
                    var iframeWindow = window['layui-layer-iframe' + index]
                        , submit = layero.find('iframe').contents().find("#LAY-user-role-submit");

                    //监听提交
                    iframeWindow.layui.form.on('submit(LAY-user-role-submit)', function (data) {
                        var field = data.field; //获取提交的字段

                        //提交 Ajax 成功后，静态更新表格中的数据
                        //$.ajax({});
                        table.reload('LAY-user-back-role-me'); //数据刷新
                        layer.close(index); //关闭弹层
                    });

                    submit.trigger('click');
                }
                , success: function (layero, index) {

                }
            })
        }
    });

    exports('useradmin', {})


});