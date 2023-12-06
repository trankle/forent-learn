## WeakMap
使用对象作为常规 Map 的键，那么当 Map 存在时，该对象也将存在。*它会占用内存，并且不会被（垃圾回收机制）回收*
使用对象作为常规 WeakMap 的键 —— 它将会被从 map（和内存）中自动删除，该对象会被回收
- 不支持迭代
- 弱引用
## WeakSet
WeakSet 是类似于 Set 的集合，它仅存储对象，并且一旦通过其他方式无法访问这些对象，垃圾回收便会将这些对象删除。

对对象是弱引用，所以被它们引用的对象很容易地被垃圾收集器移除。
## Map、Set
## 增强的对象字面量
可以再对象字面量里定义原型
可以直接调用父类方法

Proxies
Symbols
Promises
Math、Number、String、Object的新API
定义方法可以不用function关键字
默认参数、不定参数、拓展参数

箭头操作符：=>
类的支持：class
字符串模板：·your name is ${num}·
解构：自动解析数组或对象中的值
let、const关键字
for of：值遍历
模块：module

