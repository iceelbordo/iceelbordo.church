<template>
  <c-box
    v-show="state.isVisible"
    position="fixed"
    top="0"
    left="0"
    width="100%"
    height="100%"
    bg="darkBackground"
    boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    @click="onVideoStop"
  >
    <c-box
      :maxWidth="[
        'none',  // base
        '30rem', // sm
        '48rem', // md
        '62rem', // lg
        '80rem'  // xl
      ]"
      :margin="[
        '.5rem',        // base
        '1.75rem auto', // sm
      ]"
      bg="trasparent"
    >
      <c-box
        id="player"
        data-plyr-provider="vimeo"
        :data-plyr-embed-id="embedID"
      />
    </c-box>
  </c-box>
</template>

<script>
import { CBox } from '@chakra-ui/vue'
import eventBus from '@/use/eventBus'
import { usePlyr, useState } from '@/use/hooks'

export default {
  name: 'Modal',
  components: {
    CBox
  },
  data() {
    const { state, toggleIsVisible } = useState()
    const { play, stop } = usePlyr({ selector: '#player' })

    return {
      embedID: undefined,
      state, toggleIsVisible,
      play, stop
    }
  },
  mounted() {
    eventBus.$on('play:video', this.onVideoPlay)
  },
  methods: {
    onVideoPlay: function(event) {
      this.embedID = event.detail.embedID
      this.toggleIsVisible()
      this.play(this.embedID)
    },
    onVideoStop: function(event) {
      if (event.target.hasAttribute('data-chakra-component')) {
        this.toggleIsVisible()
        this.stop()
      }
    }
  }
}
</script>
