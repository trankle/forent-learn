## rem 适配代码
<script>
    var html = document.documentElement;
    var widths = html.clientWidth;
    var num = 10;
    html.style.fontSize = widths / num + 'px';
</script>

## 视口屏幕计算 vw vh
vw指的都是水平方向的，vh指的都是垂直方向的。总屏幕是100
NOTE:PC的时候，要注意滚动条

## vmin vmax

## px转成相应的vh、vw
px2vw插件
postcss

