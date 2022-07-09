$(function () {
    //定义加载文章分类的方法
    var layer = layui.layer
    var form = layui.form
    //初始化副文本编辑器
    initEditor();
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates/',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章分类失败')
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
                // console.log(res);
            }
        })
    }
    initCate();

    //coverFile
    $("#btnChoseImage").on('click', function () {
        $("#coverFile").click();
    })
    // 1.1 获取裁剪区域的 DOM 元素 
    var $image = $('#image')
    // 1.2 配置选项 
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }
    // 1.3 创建裁剪区域 
    $image.cropper(options)
    //
    $("#coverFile").on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            // 销毁旧的裁剪区域 
            .attr('src', newImgURL)
            // 重新设置图片路径 
            .cropper(options)
        // 重新初始化裁剪区域
        //
    })
    //定义文章发布状态
    var art_state = '已发布'
    $('#btnSave2').on('click', function () {
        art_state = '草稿';
    })
    $("#form-pub").on('submit', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        //基于一个表单 快速创建formDATE对象
        var fd = new FormData($(this)[0])
        //z追加文章的发布状态到fd中
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布 
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象 
                // 得到文件对象后，进行后续的操作 
                fd.append('cover_img', blob)
                publishArticle(fd);
            })
    })
    function publishArticle(fd){
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            //注意  向服务器提交的是formDate格式的数据，
            //必须配置以下连个配置项
            contentType:false,
            processData:false,
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/article/art_list.html'
            }
        })
    }
})