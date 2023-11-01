## 防抖节流
<script>
//防抖——触发高频事件后n 秒后函数只会执行一次，如果n 秒内高频事件再次被触发，则重新计算时间；
function debounce(fn,n=10){
    let timer = null
    return functoin(){
        clearTimeout(timer)
        tiemr = setTimeout(function() {
            fn().apply(this,arguments)//apply bind
        }, n);
    }
}
//节流——高频事件触发，但在n 秒内只会执行一次，所以节流会稀释函数的执行频率。 window.addEventListener('resize', throttle(sayHi))
function throttle(fn,n){
    let canRun = true// 通过闭包保存一个标记
    return function(){
        if(!canRun)return
        canRun = false
        setTimeout(()=>{
            fn().apply(this,arguments)
            canRun = true
        },n)
    }
}
</script>
## call、apply、bind 改变函数体内部 this 的指向
bind返回新函数，便于稍后调用 function.bind(thisArg, arg1, arg2, ...)
call调用：function.call(context, arg1, arg2, ...)
apply调用：function.apply(context, [argsArray])

## 闭包
## 深、浅拷贝


## 垃圾回收、内存溢出
垃圾回收是自动完成的，我们不能强制执行或是阻止执行。

当对象是可达状态时，它一定是存在于内存中的。

被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达。