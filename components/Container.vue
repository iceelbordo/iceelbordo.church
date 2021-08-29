<template>
  <c-box
    :height="height"
    px="4"
    :pt="pt"
    :pb="pb"
    mx="auto"
    :max-width="[
      '100%',  // base
      '30rem', // sm (30em)
      '48rem', // md (48em)
      '62rem', // lg (62em)
      '80rem'  // xl (80em)
    ]"
  >
    <slot></slot>
  </c-box>
</template>

<script>
import { CBox } from '@chakra-ui/vue'

export default {
  name: 'Container',
  components: {
    CBox
  },
  props: {
    pt: {
      type: String | Array,
      default: '0'
    },
    pb: {
      type: String | Array,
      default: '0'
    },
    height: {
      type: String,
      default: 'auto'
    }
  }
}
</script>
