<template>
  <c-box>
    <slot name="nav">
    </slot>
    <slot></slot>
    <slot name="footer">
    </slot>
  </c-box>
</template>

<script>
export default {
  name: 'BaseLayout'
}
</script>
