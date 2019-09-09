$(function() {
$("img").lazyload(
    {
    // 距离屏幕 200 像素时加载
    threshold:200,
    // 淡入效果
    effect:"fadeIn",
    // 当插件找到10个不在可见区域内的图片时停止搜索
    failure_limit : 10,
    // 加载隐藏图片
    skip_invisible : false,
    // 设置占位符替代显示区域内待加载的图片
    // placeholder:'loading.gif'
    }
);
});

$(document).ready(function () {

    $(".clipboards").hide();

    ld = [
        ["17788889999", "明明", "他"]
    ];
    var index = Math.floor(Math.random() * (ld.length - 0.01));
    $(".weixin").text(ld[index][0]);
    $(".weixin").css("color","red");
    $(".wxname").text(ld[index][1]);
    $(".wxname").css("color","red");
    $(".gender").text(ld[index][2]);

    var clipboardJS = new ClipboardJS('.weixin');
    clipboardJS.on('success', function (e) {

        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        show();
        e.clearSelection();
    });
    clipboardJS.on('error', function (e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
        show();
        e.clearSelection();
    });

    // 点击我知道了
    $("div[name=closed]").click(function () {
        $(".clipboards").fadeOut();
    });
    // 点击模态框和其他地方
    $(".clipboards").on('click', function (a) {
        console.log("1");
        // 判断点击其他地方
        if ($(a.target).is('.clpclosed') || $(a.target).is('.clipboards')) {
            console.log("2");
            $(".clipboards").fadeOut();
        }
    });
});

// 显示模态框
function show() {
    $(".clipboards").show();
    $(".clpbox").show();
    $(".clpbox2").hide();
}