$(function () {
    var form = layui.form

    form.verify({
        nickname: function (value) {
            if (value.length > 6) return "昵称长度需要在 1 ~ 6 个字符之间"
        }
    })
    initUserInfo();
    //重置表单数据
    $("#btnReset").on('click',function(r){
        //阻止表单默认重置
        r.preventDefault();
        initUserInfo();
    })
    //监听表单提交事件
    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('更新用户信息失败');
                }
                layer.msg("更新用户信息成功")
                // initUserInfo();
               //调用父页面的方法，渲染头像信息
               window.parent.getUserInfo();
            }
        })
    })
    //  初始化用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                return layer.msg("获取用户信息失败")
                }
                // console.log(res);
                // 调用form.val快速赋值
                form.val('formUserInfo',res.data);
            },
           
        })
    }
})