# SPA的原理
简单来说，就是通过JS监听到URL的变化，从而对页面进行处理

## hash 模式
核心通过监听url中的hash来进行路由跳转

## history模式
history 模式核心借用 HTML5 history api，api 提供了丰富的 router 相关属性先了解一个几个相关的api：
    history.pushState 浏览器历史纪录添加记录
    history.replaceState修改浏览器历史纪录中当前纪录
    history.popState 当 history 发生变化时触发