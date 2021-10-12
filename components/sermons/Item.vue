<template>
  <c-stack
    spacing="4"
  >
    <c-stack
      :spacing="1"
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
    <c-flex
      :flexDirection="[
        'column', // base
        'column', // sm
        'row',    // md
      ]"
      :spacing="4"
    >
      <c-box
        :mr="[
          '0', // base
          '0', // sm
          '4'  // md
        ]"
      >
        <c-button
          variantColor="blue"
          size="sm"
          variant="outline"
          rounded="full"
          :px="[
            '0.75rem',  // base
            '0.875rem', // sm
            '0.75rem'   // md
          ]"
          position="static"
          @click="onTogglePlay"
        >
          <c-icon
            :name="!howlState.loaded ? 'circular-progress-animation' : howlState.playing ? 'wave-animation' : 'play'"
            :class="!howlState.loaded ? 'animate-spin' : ''"
            size="1rem"
            color="blue"
            mr="0.25rem"
            mb="1px"
          />
          {{ timeOf(item.audio.metadata.duration) }}
        </c-button>
      </c-box>
      <c-stack
        :display="howlState.playing ? 'flex' : 'none'"
        isInline
        w="full"
        alignItems="center"
        :spacing="4"
        :mt="[
          '2', // base
          '2', // sm
          '0'  // md
        ]"
      >
        <c-text
          as="samp"
          minWidth="3.222rem"
          fontSize="xs"
        >
          {{ `${ playedHours() }:${ playedMinutes() }.${ playedSeconds() }` }}
        </c-text>
        <c-box
          width="100%"
          cursor="pointer"
          @click="onSeek"
        >
          <c-progress
            color="blue"
            height="0.25rem"
            :value="progressValue"
          />
        </c-box>
        <c-text
          as="samp"
          fontSize="xs"
        >
          {{ `${ totalHoursOf(item.audio.metadata.duration) }:${ totalMinutesOf(item.audio.metadata.duration) }` }}
        </c-text>
      </c-stack>
    </c-flex>
  </c-stack>
</template>

<script>
import { CBox, CButton, CFlex, CHeading, CProgress, CStack, CText, CIcon } from '@chakra-ui/vue'
import { useDate, useHowler } from '@/use/hooks'

export default {
  name: 'Item',
  components: {
    CBox,
    CButton,
    CFlex,
    CHeading,
    CProgress,
    CStack,
    CText,
    CIcon
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    showControls: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const { day, month, year, timeOf, totalHoursOf, totalMinutesOf } = useDate({ value: this.item.recordedAt })
    const { howlState, play, pause, seek, playedHours, playedMinutes, playedSeconds } = useHowler({
      src: [this.item.audio.url],
      onprogress: this.onProgress,
      onplay: this.onPlay
    })

    return {
      day, month, year, timeOf, totalHoursOf, totalMinutesOf,
      progressValue: 0,
      howlState, play, pause, seek, playedHours, playedMinutes, playedSeconds
    }
  },
  watch: {
    showControls(newShowControls, oldShowControls) {
      if (!newShowControls) {
        this.pause()
      }
    }
  },
  methods: {
    onTogglePlay(event) {
      if (!this.howlState.loaded) {
        return
      }

      this.howlState.playing ? this.pause() : this.play()
    },
    onPlay() {
      this.$emit('update:index', this.index)
    },
    onProgress() {
      if (!this.howlState.playing) {
        return 1
      }
      this.progressValue = (this.seek() * 100) / this.item.audio.metadata.duration
      return 0
    },
    onSeek(event) {
      const x = event.pageX - event.target.offsetLeft
      this.progressValue = (x * 100) / event.target.offsetWidth
      const percentage = (this.progressValue * this.item.audio.metadata.duration) / 100
      this.seek(percentage)
      if (!this.howlState.playing) {
        this.play()
      }
    }
  }
}
</script>

<style scoped>
[data-chakra-component="CProgress"] {
  pointer-events: none
}
</style>
