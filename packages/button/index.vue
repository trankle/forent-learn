<template>
  <div>
    <el-button @click="changeStr('changeStr 组件更改state')"
      >changeStr</el-button
    >
    <el-button @click="changeStrAction('changeStrAction 组件更改state')"
      >changeStrAction</el-button
    >
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
export default {
  name: "tButton",
  /* vuex use */
  computed: {
    ...mapState('vuexUse', ['str']),
    ...mapGetters({
      getStr: 'vuexUse/getStr',
    }),
  },
  methods: {
    ...mapMutations({
      changeStr: 'vuexUse/CHANGE_STR',
    }),
    ...mapActions({
      changeStrAction: 'vuexUse/CHANGE_STR_ACTION',
    })
  }
};
</script>
<script setup>
/*pinia use */
import {useUniqueStore} from '@packages/store/usePinia.js'
const uniqueStore = useUniqueStore()
// id, user 是在当前页面响应式引用
const { id, user } = storeToRefs(uniqueStoreName)
uniqueStore.initUser()
// 重置state
uniqueStore.resetState()

</script>

<style>
.tButton {
  background-color: #1188ff;
  color: white;
  border: none;
  padding: 6px 12px;
}
</style>
