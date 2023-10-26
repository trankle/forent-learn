
## 钩子函数触发顺序
beforeEach（全局前置守卫）：每一个路由改变的时候都会触发
beforeEnter（路由独享守卫）：你可以在路由配置上直接配置 beforeEnter，进入当前路由前触发，不会在参数改变触发，
// 组件内的守卫 在路由组件内直接定义路由导航守卫
beforeRouteEnter（组件内钩子）：渲染组件前调用，组件还未创建。不能获取组件实例this
beforeRouteUpdate（组件内钩子）：动态路由参数改变后会调用， 可以访问组件实例this
beforeRouteLeave（组件内钩子）：导航离开该组件的对应路由时调用， 可以访问组件实例this

afterEach（全局后置守卫）：每一个路由改变的后都会触发，可用于分析、更改页面标题、声明页面等辅助功能

## Vue-router vs location.href 跳转
- location.href= url 刷新页面
- history.pushState( url ) 静态跳转，不刷新页面
- router.push( url ) 使用了 diff 算法，实现了按需加载，减少了 dom 的消耗，同上2.

