<!--
 * @Description:  
 * @Author: 王天琦
 * @Date: 2023-11-01 15:13:58
-->
## 数据类型
- 基本数据类型：简单的数据段。
- 引用数据类型：有多个值构成的对象；保存在堆内存中的对象。
引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址，通过这个引用地址可以快速查找到保存中堆内存中的对象。
## 数据类型判断
typeof 区分基本类型 string、number、boolean、undefined、function || object
instanceof 区分引用类型 array、objects
Object.prototype.toString.call(obj)
obj.__proto__.constructor
## array方法
### 转换方法
valueOf()
toString()
toLocaleString()
join()
### 堆栈方法
push()
pop()
### 队列方法
push()
shift()
unshift(item1, item2, ...)
### 排序方法
reverse()
sort()
### 操作方法
concat(arr1, arr2, ...)
slice()
splice()
### 位置方法
indexOf()
lastIndexOf()
### 迭代方法
every()
filter()
forEach()
map()
some()
### 合并方法
reduce()
reduceRight()
## 数据类型转换
### 隐形
### 显形
## 闭包
创建私有变量 | 延长变量生命周期｜定义在一个函数内部的函数，该内层函数能访问到外层函数的函数。
- js是静态作用域，它内部环境中所需变量在编译时就确定，运行时不会改变；
- js中函数是一等公民，可以被调用｜作为参数传递｜赋值给变量｜作为函数返回值，所以它的运行时环境很容易变化；
- 把内部环境中需要的变量，打包交给内层函数（闭包函数），它就可以随时访问这些变量，就形闭包。
## 深、浅拷贝
<script>
    function deepClone(obj, hash = new WeakMap()) {
    if (hash.has(obj)) {
        return obj;
    }
    let res = null;
    const reference = [Date, RegExp, Set, WeakSet, Map, WeakMap, Error];
    if (reference.includes(obj?.constructor)) {
        res = new obj.constructor(obj);
    } else if (Array.isArray(obj)) {
        res = [];
        obj.forEach((e, i) => {
            res[i] = deepClone(e);
        });
    } else if (typeof obj === "object" && obj !== null) {
        res = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                res[key] = deepClone(obj[key]);
            }
        }
        hash.set(obj, res);
    } else {
        res = obj;
    }
    return res;
}

</script>
## 防抖节流
<script>
//防抖——触发高频事件后n秒后函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间；
function debounce(fn,n=10){
    let timer = null
    return functoin(){
        clearTimeout(timer)
        tiemr = setTimeout(function() {
            fn().apply(this,arguments)//apply bind
        }, n);
    }
}
//节流——高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率。 window.addEventListener('resize', throttle(sayHi))
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
bind返回新函数，便于*稍后调用* function.bind(thisArg, arg1, arg2, ...)
call调用：function.call(context, arg1, arg2, ...)
apply调用：function.apply(context, [argsArray])
```
Function.prototype.bind = function(context){
    self = this;
    return function(){
        self.apply(context, arguments);
    }
}
```
## 垃圾回收、内存溢出
垃圾回收是自动完成的，我们不能强制执行或是阻止执行。

当对象是可达状态时，它一定是存在于内存中的。

被引用与可访问（从一个根）不同：一组相互连接的对象可能整体都不可达。

## 严格模式
1. 消除js语法不合理之处
2. 消除代码运行的一些不安全之处
3. 高编译器效率，增加运行速度

0. 与未使用严格模式文件压缩，浪费字节
