<!--
 * @Description:  token
 * @Author: 王天琦
 * @Date: 2023-11-02 14:16:32
-->
1. 用户登录接口 获取token
<script>
    const { token } = res.data
    const expires = Number(day) / 86400 // 换算成天
    Cookies.set("eleToken", token, expires)
</script>

2. token实现路由守卫
<script>
router.beforeEach((to, from, next) => {
    const isLogin = Cookies.get(eleToken) ? true: false
    const whitePath = ['/login','/register']
// 确定不需要拦截(登录和注册)白名单路由 ，直接放行next()
    if(whitePath.inclue(to.path)){
        next()
    }else {
// 对于拦截路由，登录过直接放行，否则跳转到登录
        isLogin ? next() : next('/login')
    }
})
</script>

3. 请求拦截header统一添加token
<script>
axios.interceptors.request.use(config => {
    const eleToken = Cookies.get(eleToken)
    if(eleToken){
        // 设置统一的请求头
        config.headers.Authorization = eleToken
    }
    return config
}, error => {
    return Promise.reject(error)
})
</script>

4. 响应拦截
当token过期后，页面会响应一个错误状态码，这里要做的事情就是要把这个过期的token清除，并跳转到登录页面
<script>
    // 获取错误状态码
    if(status == HTTP_STATUS_CODE.UNAUTH){
        Message.error("token失效，请重新登录")
        delCookie('eleToken')
        router.push('/login')
    }
</script>
