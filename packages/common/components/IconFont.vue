<template>
  <svg class="svg-font" aria-hidden="true">
    <use :xlink:href="getIconHref"></use>
  </svg>
</template>

<script>

/**
* icon的值在iconfont官网，切换到symbol，浮到icon上，复制代码即可
* <IconFont icon="icon-gongchengbianmalogo" style="color:red"></IconFont>
*/
export default {
name: "IconFont",
components: {},

props: {
  icon: {
    type: String,
    required: true,
  },
},

computed: {
  getIconHref() {
    return "#" + this.icon;
  },
},
};
</script>

<style lang="scss" scoped>
.svg-font {
width: 1em;
min-width: 1em;
height: 1em;
min-height: 1em;
vertical-align: -0.15em;
fill: currentColor;
font-size: 12px;
overflow: hidden;
}
</style>
