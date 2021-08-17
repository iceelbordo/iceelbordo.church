<template>
  <c-box>
    <c-box class="space-y-4">
      <slot></slot>
      <slot name="scroll"></slot>
    </c-box>
  </c-box>
</template>

<script>
import { CBox } from '@chakra-ui/vue'

export default {
  name: 'ListOfSermons',
  components: {
    CBox
  }
}
</script>

<style scoped>
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--space-y-reverse)));
  margin-bottom: calc(1rem * var(--space-y-reverse));
}
</style>
