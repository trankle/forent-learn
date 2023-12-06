<!--
 * @Description:  
 * @Author: 王天琦
 * @Date: 2023-10-25 10:01:16
-->
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
*实例*创建完成、数data已经被创建、修改数据不触发uodated、无法立即操作dom、可使用nextick操作dom
<!-- mounted -->
*Dom*挂载完毕、完成数据双向绑定、可 $refs 属性获取dom
# nextick 浏然器渲染原理
Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环中 观察到数据变化 推送进这个队列，统一更新。
Event Loop 异步执行的任务又分为宏任务和微任务，无论是执行宏任务还是微任务，完成后都会进入到一下tick，并在两个tick之间进行UI渲染。
## nextTick和setTimeout的比较
nextTick源码中利用的是Promise.resolve()实现的，区别在于setTimeout是宏任务，nextTick是微任务
所以nextTick的执行顺序优先于setTimeout，当然setTimeout也可以替代nextTick
# keep-alive生命周期执行顺序
不希望组件被重新渲染影响使用体验；或者处于性能考虑，避免多次重复渲染降低性能。而是希望组件可以缓存下来,维持当前的状态。

初次进入时：onMounted> onActivated
退出后触发 deactivated
再次进入：
只会触发 onActivated
事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

## watch跟computed的区别
- 功能上
computed是计算属性，watch是监听一个值的变化，然后执行对应的回调。
- 是否调用缓存
computed中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而watch在每次监听的值发生变化的时候都会执行回调。
- 是否调用return
computed中的函数必须要用return返回，watch中的函数不是必须要用return。
- 首次加载监听
computed默认第一次加载的时候就开始监听；watch默认第一次加载不做监听，如果需要第一次加载做监听，添加immediate属性，设置为true（immediate:true）
- 使用场景
computed----当一个属性受多个属性影响的时候，使用computed-----购物车商品结算。watch–当一条数据影响多条数据的时候，使用watch-----搜索框.