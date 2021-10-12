<template>
  <c-stack
    spacing="4"
  >
    <c-stack
      spacing="1"
    >
      <c-text
        as="samp"
        fontSize="xs"
      >
        {{ `${ day() } ${ month() } ${ year() }` }}
      </c-text>
      <c-heading
        as="h2"
        size="md"
        fontSize="md"
        fontWeight="medium"
      >
        {{ item.title }}
      </c-heading>
      <c-text
        as="samp"
        fontSize="xs"
      >
        {{ item.preacher.firstName }} {{ item.preacher.lastName }}
      </c-text>
      <c-text
        fontSize="md"
      >
        {{ item.description }}
      </c-text>
    </c-stack>
    <c-box>
      <c-button
        variant-color="blue"
        size="sm"
        variant="outline"
        rounded="full"
        :px="[
          '0.75rem',  // base
          '0.875rem', // sm
          '0.75rem'   // md
        ]"
        position="static"
        @click="onPlayClick"
      >
        <c-icon
          name="play"
          size="4"
          color="blue"
        />
      </c-button>
    </c-box>
  </c-stack>
</template>

<script>
import { CBox, CButton, CHeading, CStack, CText } from '@chakra-ui/vue'
import eventBus from '@/use/eventBus'
import { useDate } from '@/use/hooks'

export default {
  name: 'Item',
  components: {
    CBox,
    CButton,
    CHeading,
    CStack,
    CText
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    const { day, month, year } = useDate({ value: this.item.recordedAt })

    return {
      day, month, year
    }
  },
  methods: {
    onPlayClick(event) {
      const regexp = /svg|path/i
      if (event.target.hasAttribute('data-chakra-component') || regexp.test(event.target.tagName)) {

        const event = new CustomEvent('click', {
          bubbles: true,
          detail: this.item.video
        })
        eventBus.$emit('play:video', event)
      }
    }
  }
}
</script>
