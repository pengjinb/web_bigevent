$(function () {
  var layer = layui.layer;
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  }; // 1.3 创建裁剪区域
  $image.cropper(options);

  $("#btnChoseImage").on("click", function () {
    $("#file").click();
  });
  //为文件提交框绑定change事件
  $("#file").on("change", function (e) {
    var filelist = e.target.files;
    if (filelist.length === 0) {
      return layer.msg("请选择图片！");
    }
    var file = e.target.files[0];
    var newImgURL = URL.createObjectURL(file);
    // console.log(imgURL);
    $image
      .cropper("destroy")
      .attr("src", newImgURL)
      // 重新设置图片路径
      .cropper(options);
    // 重新初始化裁
  });
  $("#btnUpload").on("click", function (e) {
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符 串
      $.ajax({
        method:'post',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL,
        },
        success:function(res){
          if(res.status !== 0){
            return layer.msg('更新头像失败！');
          }
          layer.msg('更新成功！');
          window.parent.getUserInfo();
        }
      })
  });

  //   $("#file").on("change", function (e) {
  //     // console.log(e.target.files);
  //     var filelist = e.target.files;
  //     if (filelist.length === 0) {
  //       return layer.msg("请选择照片");
  //     }
  //     //拿到用户选择的图片
  //     var file = e.target.files[0];
  //     var imgURL = URL.createObjectURL(file);
  //     $image
  //       .cropper("destroy")
  //       // 销毁旧的裁剪区域
  //       .attr("src", newImgURL)
  //       // 重新设置图片路径
  //       .cropper(options);
  //     // 重新初始化裁
  //   });
});
