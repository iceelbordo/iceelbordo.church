<template>
  <c-flex
    :display="show ? 'flex' : 'none'"
    justifyContent="center"
    mt="4"
  >
    <c-icon
      name="circular-animation"
      size="32px"
      color="blue.500"
    />
  </c-flex>
</template>

<script>
import { CFlex, CIcon } from '@chakra-ui/vue'

export default {
  name: 'InfiniteScroll',
  components: {
    CFlex,
    CIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      required: true
    },
    pageSize: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      startFrom: 0,
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0
    }
  },
  mounted() {
    if (this.hasTouch() === true) {
      window.addEventListener('touchstart', this.onTouchStart)
      window.addEventListener('touchend', this.onTouchEnd)
    }
    if (this.hasTouch() === false) {
      window.addEventListener('scroll', this.onScroll)
    }
  },
  methods: {
    hasTouch: function () {
      return 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch ? true : false
    },
    endAt: function () {
      return this.startFrom === 0 ? this.pageSize : this.startFrom + this.pageSize
    },
    onTouchStart: function (event) {
      if (this.endAt() >= this.size) {
        return
      }
      this.touchStartX = event.screenX
      this.touchStartY = event.screenY
    },
    onTouchEnd: function (event) {
      if (this.endAt() >= this.size) {
        return
      }
      this.touchEndX = event.screenX
      this.touchEndY = event.screenY
      if (this.touchEndY === this.touchStartY) {
        this.startFrom += this.pageSize
        this.$emit('update:startFrom', this.startFrom)
      }
    },
    onScroll: function () {
      if (this.endAt() >= this.size) {
        return
      }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.startFrom += this.pageSize
        this.$emit('update:startFrom', this.startFrom)
      }
    }
  }
}
</script>
