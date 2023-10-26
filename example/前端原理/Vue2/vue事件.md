# 事件
## change 事件
 * 当标签的**值修改并失去焦点**后，但未提交时（例如：对<textarea>、 text、search、url、tel、email 或 password 类型的 <input> 元素进行编辑后）。
 * 当用户**显式提交改变**时（例如：通过鼠标点击了 <select> 中的一个下拉选项，通过 <input type="date"> 元素选择了一个日期，通过 <input type="file"> 元素上传了一个文件等）；
 * 当 <input type="checkbox"> **元素被选中或取消选中**时（通过点击或使用键盘）；
 * 当 <input type="radio"> **元素被选中**时（但不是取消选中时）；


## input 事件
 * 当一个 <input>, <select>, 或 <textarea> 元素的 value 被修改时，会触发 input 事件

## 动态事件
<template>
  <a v-on:[eventName]="doSomething">  </a>
  <a v-on="{event1: callback, event2: callback, ...}">  </a>
</template>

# EventBus
所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件
```main.js     Vue.prototype.$EventBus = new Vue()```
```低层级组件   EventBus.$emit("event", data)```
```高层级组件   EventBus.$on("event", callBack(data)=>{})```

# vue2 依赖注入 无响应式
传递响应式数据
## 传递this
## 传递函数、计算属性
<script>
export default {
    data() {return {message: 'hello!'}},
    provide() {
        return {
            // 显式提供一个计算属性
            message: computed(() => this.message),
            parentName: () => this.name
        }
    }
}
</script>