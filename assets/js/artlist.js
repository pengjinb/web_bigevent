$(function () {
    //定义一个查询的参数对象，将来请求数据的时候，提交到服务器
    var layer = layui.layer;
    var form = layui.form
    var laypage = layui.laypage
    // 定义梅美化时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);

        //年
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth())
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + "-" + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,//页码值，默认显示第一页
        pagesize: 2,//每页显示几条数据
        cate_id: '',//文章分类的ID 
        state: '',//文章发布状态
    }
    initTable();
    initCate();
    function initTable() {
        $.ajax({
            method: 'get',
            url: "/my/article/list",
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')

                }
                //使用模板引擎渲染数据
                layer.msg('获取文章列表成功！')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
                // console.log(res);
                renderPage(res.total);
            }
        })
    }
    //初始化文章分类
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
    //为筛选表单绑定submit事件
    $("#form-searah").on('submit', function (e) {
        e.preventDefault();
        var cate_id = $("[name=cate_id]").val();
        var state = $("[name=state]").val();
        q.cate_id = cate_id;
        q.state = state;
        //根据最新赛选条件重新渲染数据
        initTable();
    })
    //定义渲染分页的方法
    function renderPage(total) {
        console.log(total);
        //调用laypage.render方法渲染分页
        laypage.render({
            elem: 'pageBox',//容器id
            count: total,//总条数
            limit: q.pagesize,//每页显示几条
            curr: q.pagenum, //默认选中项
            layout:['count','limit','prev','page','next','skip'],
            limits :[2,3,5,8,10],
           // 触发jump回调的方式，1。点击页码触发，2.调用laypage.render也会触发
            jump: function (obj,frist) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //根据最新的对象q来渲染数据
                if(!frist){
                    initTable();
                }
               
            }
        })
    };
    $("tbody").on('click', '#clearList', function () {
        var id = $(this).attr("data-id");
        layer.confirm('你确定要删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'get',
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    layer.msg('删除成功');
                    initTable();
                }
            })
            layer.close(index);
        });
    })

})