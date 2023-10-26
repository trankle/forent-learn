<!-- 文字显示溢出 省略号 -->
<template>
    <div ref="root" class="text-ellipsis-more">{{expanded ? content : text}}
        <span v-if="hasAction"
            class="text-ellipsis__action"
            @click="onClickAction">
            {{expanded ? collapseText :expandText}}
        </span>
    </div>
</template>

<script>
export default {
  name: "trankleTextEllipsisMore",
  props: {
    rows: {
      type: Number,
      default: 3,
    },
    dots: {
      type: String,
      default: "...",
    },
//文本内容
    content: {
      type: String,
      default: "",
    },
    expandText: {
      type: String,
      default: "展开详情",
    },
    collapseText: {
      type: String,
      default: "收起详情",
    },
    position: {
      type: String,
      default: "end",
    },
  },
  data() {
    return {
      text: "",
      expanded: false,
      hasAction: false,
    };
  },

  computed: {
    actionText() {
      return this.expanded ? this.expandText : this.collapseText;
    },

    watchValues() {
      return [this.content, this.rows, this.position];
    },
  },

  watch: {
    watchValues: {
      handler: function (val) {
        this.calcEllipsised();
      },
      deep: true,
    },
  },

  mounted() {
    this.calcEllipsised();
    //尺寸变化时
    //   useEventListener("resize", calcEllipsised);
  },

  methods: {
    pxToNum(value) {
      if (!value) return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    },

    onClickAction() {
      this.expanded = !this.expanded;
      this.$emit("clickAction");
    },

    calcEllipsised() {
      const cloneContainer = () => {
        if (!this.$refs.root) return;
        const originStyle = window.getComputedStyle(this.$refs.root); //拿到
        const container2 = document.createElement("div");
        const styleNames = Array.prototype.slice.apply(originStyle);
        styleNames.forEach((name2) => {
          container2.style.setProperty(name2, originStyle.getPropertyValue(name2));
        });

        container2.style.position = "fixed";
        container2.style.zIndex = "-9999";
        container2.style.top = "-9999px";
        container2.style.height = "auto";
        container2.style.minHeight = "auto";
        container2.style.maxHeight = "auto";
        container2.innerText = this.content;
        document.body.appendChild(container2);
        return container2;
      };
      const calcEllipsisText = (container2, maxHeight2) => {
        const end = this.content.length;
        const calcEllipse = () => {
          const tail = (left, right) => {
            if (right - left <= 1) {
              if (this.position === "end") {
                return this.content.slice(0, left) + this.dots;
              }
              return this.dots + this.content.slice(right, end);
            }
            const middle2 = Math.round((left + right) >> 1);
            if (this.position === "end") {
              container2.innerText = this.content.slice(0, middle2 + (this.expandText.length - this.dots.length)) + this.dots + this.actionText;
            } else {
              container2.innerText = this.dots + this.content.slice(middle2, end) + this.actionText;
            }
            if (container2.offsetHeight > maxHeight2) {
              if (this.position === "end") {
                return tail(left, middle2);
              }
              return tail(middle2, right);
            }
            if (this.position === "end") {
              return tail(middle2, right);
            }
            return tail(left, middle2);
          };
          container2.innerText = tail(0, end);
        };
        const middleTail = (leftPart, rightPart) => {
          if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
            return this.content.slice(0, leftPart[1]) + this.dots + this.dots + this.content.slice(rightPart[1], end);
          }
          const leftMiddle = Math.floor((leftPart[0] + leftPart[1]) >> 1);
          const rightMiddle = Math.ceil((rightPart[0] + rightPart[1]) >> 1);
          container2.innerText =
            this.content.slice(0, leftMiddle) + this.dots + this.actionText + this.dots + this.content.slice(rightMiddle, end);
          if (container2.offsetHeight >= maxHeight2) {
            return middleTail([leftPart[0], leftMiddle], [rightMiddle, rightPart[1]]);
          }
          return middleTail([leftMiddle, leftPart[1]], [rightPart[0], rightMiddle]);
        };
        const middle = (0 + end) >> 1;
        this.position === "middle" ? (container2.innerText = middleTail([0, middle], [middle, end])) : calcEllipse();
        return container2.innerText;
      };
      const container = cloneContainer();
      if (!container) return;
      const { paddingBottom, paddingTop, lineHeight } = container.style;
      const maxHeight = Math.ceil(
        (Number(this.rows) + 0.5) * this.pxToNum(lineHeight) + this.pxToNum(paddingTop) + this.pxToNum(paddingBottom)
      );
      if (maxHeight < container.offsetHeight) {
        this.hasAction = true;
        this.text = calcEllipsisText(container, maxHeight);
      } else {
        this.hasAction = false;
        this.text = this.content;
      }
      document.body.removeChild(container);
    },
  },
};
</script>

<style lang='scss' scoped >
.text-ellipsis-more {
  padding: 0px 16px 0 0;
  line-height: 20px;
  white-space: pre-wrap;
  word-break: break-word;

  .text-ellipsis__action {
    cursor: pointer;
    color: #198cff;
  }
}
</style>