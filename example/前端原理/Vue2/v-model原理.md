<!--
 * @Description:  
 * @Author: 王天琦
 * @Date: 2023-10-13 10:42:25
-->
# 实现JavaScript对象的响应式
- Vue2：
object.defineProperty setter getter 重写
数组：重写数组原型方法

- Vue3使用proxy代理
优势
1. 监听数组变化;索引/length属性
2. set函数监听动态增/删的属性
3. 省去for in循环

- 对比
1. 实现方式：Proxy是ES6新增的一种特性，使用了一种代理机制来实现响应式。而Object.defineProperty是在ES5中引入的，使用了getter和setter方法来实现。
2. 作用对象：Proxy可以代理*整个对象*，包括对象的所有属性、数组的所有元素以及类似数组对象的所有元素。而Object.defineProperty只能代理*对象上定义的属性*。
3. 监听属性：Proxy可以监听到新增属性和删除属性的操作，而Object.defineProperty只能监听到*已经定义的属性的变化*。
4. 性能：由于Proxy是ES6新增特性，其内部实现采用了更加高效的算法，相对于Object.defineProperty来说在性能方面有一定的优势。
# 表单实现双向绑定
    * v-bind绑定一个value属性
    * v-on指令给当前元素绑定input事件
<input type="text" :value="username" @input="username = $event.target.value" />

# 组件实现双向绑定
    * 子组件创建 value 属性可以拿到父组件传递下来的值
    * 子组件内部更改 value 的时候，必须通过 $emit 派发一个 input 事件，并携最新的值
    * v-model 会自动监听 input 事件，把接收到的最新的值同步赋值到 v-model 绑定的变量上

<子组件 v-model="父组件定义的变量值" />
## 子组件内部
<template>
	<p>子组件库存:{{ value }}</p>
	<button @click="addFun">增加1</button>
</template>
<script>
export default {
   props:{
      //子组件创建 value 属性通过props可以拿到父组件传递下来的值
      value:{ type: Number,default:0 }
   },
   methods:{
         addFun() {
            //子组件内部更改 value 的时候，必须通过 $emit 派发一个 input 事件，并携最新的值
            // v-model 会自动监听 input 事件，把接收到的最新的值同步赋值到 v-model 绑定的变量上
            this.$emit('input', this.value + 1)
			}
   }
}
</script>

## v-model修饰符:通过 modelModifiers prop访问
<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    }
  },
   emits: ['update:modelValue'],
   methods: {
    emitValue(e) {
      let value = e.target.value
      // 组件的 v-model 上所添加的修饰符，可以通过 modelModifiers prop 在组件内访问到
      if (this.modelModifiers.capitalize) {
        // 处理value值
        value = value.charAt(0).toUpperCase() + value.slice(1)
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

