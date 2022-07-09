$(function () {
  initArtCateList();
  //初始化文章列表
  var layer = layui.layer;
  function initArtCateList() {
    $.ajax({
      method: "get",
      url: "/my/article/cates",
      success: function (res) {
        var dataStr = template("tpl-table", res);
        $("tbody").html(dataStr);
      },
    });
  }
  var indexAdd = null;
  $("#btnAddCate").on("click", function (e) {
    indexAdd = layer.open({
      type: "1",
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          console.log(res);
          return layer.msg("添加失败");
        }
        initArtCateList();
        layer.msg("新增成功");
        layer.close(indexAdd);
      },
    });
  });
  var indexEdit = null;
  var form = layui.form;
  var layer = layui.layer;
  $("tbody").on("click", ".btn-edit", function (e) {
    e.preventDefault();
    indexEdit = layer.open({
      type: "1",
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    var id = $(this).attr("data-id");
    // console.log(id);
    $.ajax({
      method: "get",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "post",
      url: "/my/article/updatecate/",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          console.log(res);
          return layer.msg("修改失败");
        }
        layer.msg("更新数据成功");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
  $("tbody").on("click", ".btn-delete", function () {
    var id = $(this).attr("data-id");
    layer.confirm(
      "确认删除？",
      { icon: 3, title: "提示" },
      function (index) {
        $.ajax({
          method: "get",
          url: "/my/article/deletecate/" + id,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg("删除文章失败！");
            }
            layer.msg("删除文章成功！");
            layer.close(index);
            initArtCateList();
          },
        });
      }
    );
  });
});
