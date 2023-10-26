<!-- 超出显示tooltip，其他无-->
<template>
  <div ref="wrap" class="tooltip-wrap">
    <el-tooltip
      ref="tlp"
      effect="dark"
      class="tooltip"
      :disabled="!tooltipFlag"
      :placement="placement"
      :content="text"
    >
      <span ref="tlpText" class="tooltip-text" :class="className" @mouseenter="visibilityChange($event)"> {{ text }} </span>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: "trankleTooltip",
  props: {
    text: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: "text"
    },
    placement: {
      type: String,
      default: "top-start"
    },
    fontSize: {
      type: Number,
      default: 14
    }
  },
  data() {
    return {
      disabledTip: false,
      tooltipFlag: false
    }
  },
  methods: {
    visibilityChange(e) {
       const ev = e.target
       const evWidth = ev.offsetWidth
      // const contentWidth = this.$refs.tlp.$el.parentNode.clientWidth
      // this.tooltipFlag = contentWidth < evWidth
      //根据字数*字体大小来判断
      //const contentWidth = this.$refs.tlpText.clientWidth
      const wrapWidth = this.$refs.wrap.clientWidth
      
      this.tooltipFlag = evWidth > wrapWidth//this.text.length * this.fontSize > contentWidth
    }
  }
}

</script>

<style lang="scss" scoped>
  .tooltip-wrap {
    overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    .tooltip-text {
      
    }
  }
</style>