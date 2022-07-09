//每次发起ajax请求都会先调用这个函数 无论 post get ajax
$.ajaxPrefilter(function (options) {
  // 拼接访问地址
  options.url = "http://www.liulongbin.top:3007" + options.url;
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }
  // 全局挂载 complete 回调函数
  options.complete = function (res) {
    // console.log("执行了complete回调函数");
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  };
});
