// 常用组件
import TextEllipsisMore from './TextEllipsisMore.vue' //文字显示溢出 省略号
import Tooltip from './Tooltip.vue' //超出显示tooltip，其他无
import IconFont from './IconFont.vue' //超出显示tooltip，其他无

const components = [
    TextEllipsisMore,
    Tooltip,
    IconFont,
]

let hasInstall = false

function install(app){
    if(hasInstall) return
    hasInstall = true
    components.forEach(cp=>{
        app.components(cp.name,cp)
    })
}

export default {
    install
}