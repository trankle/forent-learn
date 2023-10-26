/* vuex */
import Vue from 'vue'
import Vuex from 'vuex'
import vuexUse from './vuexUse'

Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        vuexUse
    },
    state:{},
    getters:{},
    mutations:{},
    actions:{},
})

/* pinia */
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia