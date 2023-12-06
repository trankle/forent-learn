## 导航守卫
beforeEach（全局前置守卫）：每一个路由改变的时候都会触发
    beforeEnter（路由独享守卫）：你可以在路由配置上直接配置 beforeEnter，进入当前路由前触发，不会在参数改变触发，
    // 组件内的守卫 在路由组件内直接定义路由导航守卫
    beforeRouteEnter（组件内钩子）：渲染组件前调用，组件还未创建。不能获取组件实例this
    beforeRouteUpdate（组件内钩子）：动态路由参数改变后会调用， 可以访问组件实例this
    beforeRouteLeave（组件内钩子）：导航离开该组件的对应路由时调用， 可以访问组件实例this
afterEach（全局后置守卫）：每一个路由改变的后都会触发，可用于分析、更改页面标题、声明页面等辅助功能
## router VS route
$router : 路由操作对象，只写对象
$route :  路由信息对象，只读对象
## Vue-router vs location.href 跳转
- location.href= url 刷新页面
- history.pushState( url ) 静态跳转，不刷新页面
- router.push( url ) 使用了 diff 算法，实现了按需加载，减少了 dom 的消耗，同上2.

## Hash history路由区别
hash路由监听hash变化不需要服务端支持;监听hashchange
history监听url变化需要服务端支持;调用  window.history  对象上的一系列方法
## 历史记录
采用replace进行页面跳转
会创建渲染新的Vue组件，在history中不会重复保存记录，而是替换原有的vue组件
   <router-link replace to="/">Login</router-link>
    router.replace(url)

## 路由传参 params VS query
params:跳转的时候路由后面加参数名，要和路由配置相同
    /path/:id
    params：/router1/:id ，/router1/123，/router1/789 ,这里的id叫做params
query
    /router1?id=123 ,/router1?id=456 ,这里的id叫做query。
    params不设置的时候，刷新页面或者返回参数会丢失，query并不会出现这种情况

this.$router.push(name:'router', params:{id:10}, query:{key:val})
### 动态路由传参
path:"/reg/:id",
给定匹配模式的路由映射到同一个组件
### 二者的区别
1. params 配置name，query配置path
2. params 必须设置参数
3. params 刷新刷新会无效
4. query 参数显示在地址栏中
## 路由之请求GET与POST参数
## 动态路由
后台会返回一个路由表，前端调接口拿到处理
### 添加 删除路由
## 命名视图
    path: "/",
    components: {
        default: () => import('../components/layout/menu.vue'),
        header: () => import('../components/layout/header.vue'),
        content: () => import('../components/layout/content.vue'),
    }

    <div>
        <router-view></router-view>
        <router-view name="header"></router-view>
        <router-view name="content"></router-view>
    </div>