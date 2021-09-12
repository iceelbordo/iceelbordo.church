<template>
  <c-flex v-if="count > pageSize" justify="center">
    <c-button
      right-icon="arrow-down"
      variant-color="blue"
      variant="outline"
      border="none"
      fontWeight="500"
      :_focus="{
        boxShadow: 'none'
      }"
      @click="onLoadMore"
    >
      Load more
    </c-button>
  </c-flex>
</template>

<script>
import { CButton, CFlex } from '@chakra-ui/vue'

export default {
  name: 'ScrollButton',
  components: {
    CButton,
    CFlex
  },
  props: {
    count: {
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
      startFrom: 0
    }
  },
  methods: {
    onLoadMore(event) {
      this.startFrom += this.pageSize
      this.$emit('update:startFrom', this.startFrom)
    }
  }
}
</script>
