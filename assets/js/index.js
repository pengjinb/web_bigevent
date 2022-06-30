$(function(){
    getUserInfo();
    //
 /// 退出操作
    var layer = layui.layer
    $("#btnLogout").on('click',function(){
        layer.confirm('你确认要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清除登录后拿到的token
            localStorage.removeItem('token');
            //页面跳转
            location.href = '/login.html'
            //关闭弹出层
            layer.close(index);
          });
    })
});
//获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        //访问有权限的接口，发送请求头
        // headers:{
        //     // Authorization:localStorage.getItem('token') || ''
        
        success: function(res){
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败！');

            }
            //调用渲染头像的函数 自己定义封装
            renderAvatar(res.data);
        },
        // // complete:function(res){
        // //     // console.log("执行了complete回调函数");
        // //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        // //         localStorage.removeItem('token');
        // //         location.href = '/login.html'
        // //     }
        // }
    })
}
//渲染用户头像
function renderAvatar(user){
    //获取用户名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name)
    //按需要渲染图片头像还是文本头像
    if(user.user_pic !==null){
        //渲染图片头像
        $(".layui-nav-img").attr('src',user.user_pic).show().siblings(".text-avatar").hide();
    } else{
        // 渲染文本头像
        $(".layui-nav-img").hide()
        // 将名称的第一个字母转换为大写
        var first = name[0].toUpperCase();
        // 渲染名字
        $(".text-avatar").html(first).show();
    }
}