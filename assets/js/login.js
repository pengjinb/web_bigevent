$(function () {
  //点击去注册账号的链接
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  //从layui里获取form对象
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位,且不能出现空格"],
  });
  //监听注册表单的提交事件
  var layer = layui.layer;
  var loginData = {
    username: $("#form_reg [name=username]").val(),
    password: $("#form_reg [name=password]").val(),
  };
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.post(
      "/api/reguser",
      {
        username: $("#form_reg [name=username]").val(),
        password: $("#form_reg [name=password]").val(),
      },
      function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg("注册成功，请登录");
        //调用点击事件
        $("#link_login").click();
      }
    );
  });
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      url: "/api/login",
      method: "post",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        //保存登录成功得到的token值
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
 
});
