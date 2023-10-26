
# 父子组件生命周期执行顺序
    <!-- 加载 -->
父: beforeCreate ->  created ->  beforeMount ->                                                    mounted
子:                                            beforeCreate -> created -> beforeMount -> mounted ->
    <!-- 更新 -->
父: beforeUpdate ->                          updated
子:                beforeUpdate -> updated ->
    <!-- 销毁 -->
vue2
父: beforeDestroy ->                              destroyed
子:                 beforeDestroy -> destroyed ->
vue3
父: beforeUnmount ->                            unmounted
子:                beforeUnmount -> unmounted ->
# created和 mounted 区别
<!-- created -->可以获取初始化数据
实例创建完成、数data已经被创建、修改数据不触发uodated、无法立即操作dom、可使用nextick操作dom
<!-- mounted -->
Dom 挂载完毕、完成数据双向绑定、可 $refs 属性获取dom
# nextick 浏然器渲染原理
Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环中 观察到数据变化 推送进这个队列，统一更新。
Event Loop 异步执行的任务又分为宏任务和微任务，无论是执行宏任务还是微任务，完成后都会进入到一下tick，并在两个tick之间进行UI渲染。
# keep-alive生命周期执行顺序
不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。

初次进入时：onMounted> onActivated
退出后触发 deactivated
再次进入：
只会触发 onActivated
事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中