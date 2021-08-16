<template>
  <c-box
    w="full"
    bg="indigo.600"
    position="fixed"
    bottom="0"
    opacity="1"
    transition="opacity 500ms"
    v-if="banner !== null"
  >
    <c-box
      maxWidth="80rem"
      mx="auto"
      :px="[
        '3', // base
        '6', // sm
        '3', // md
        '8'  // lg
      ]"
      py="3"
    >
      <c-flex
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <c-flex
          w="0"
          flex="1 1 0%"
          alignItems="center"
        >
          <c-flex
            p="2"
            borderRadius="lg"
            bg="indigo.800"
          >
            <c-icon
              name="speakerphone"
              size="6"
              color="white"
            />
          </c-flex>
          <c-text
            is-truncated
            ml="3"
            fontWeight="medium"
            color="white"
          >
            <c-text
              as="samp"
              :display="[
                'inline', // base
                'inline', // sm
                'none'    // md
              ]"
            >
              {{ banner === null ? '' : banner.shortDescription }}
            </c-text>
            <c-text
              as="samp"
              :display="[
                'none',  // base
                'none',  // sm
                'inline' // md
              ]"
            >
              {{ banner === null ? '' : banner.longDescription }} {{ `${days}d ${hours}h:${minutes}m.${seconds}s` }}
            </c-text>
          </c-text>
        </c-flex>
        <c-box
          :order="[
            '3', // base
            '2'  // sm
          ]"
          :mt="[
            '2', // base
            '0'  // sm
          ]"
          flexShrink="0"
          :w="[
            'full', // base
            'auto'  // sm
          ]"
        >
          <c-link
            :href="banner === null || banner.meetLink === null ? '#' : banner.meetLink.url"
            is-external
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="4"
            py="2"
            border="1px"
            borderColor="transparent"
            borderRadius="md"
            fontSize="sm"
            lineHeight="1.25rem"
            fontWeight="medium"
            color="indigo.600"
            bg="white"
            :_hover="{
              bg: 'indigo.50'
            }"
            :_focus="{
              boxShadow: 'none'
            }"
          >
            {{ banner === null || banner.meetLink === null ? '' : banner.meetLink.text }}
          </c-link>
        </c-box>
        <c-flex
          :order="[
            '2', // base
            '3'  // sm
          ]"
          :ml="[
            '0', // base
            '3'  // sm
          ]"
          flexShrink="0"
        >
          <c-button
            size="md"
            width="2.5rem"
            height="2.5rem"
            border="2px"
            bg="indigo.600"
            borderColor="transparent"
            display="flex"
            :_active="{
              bg: 'transparent'
            }"
            :_hover="{
              bg: 'indigo.500'
            }"
            :_focus="{
              boxShadow: 'none'
            }"
            @click="onCloseClick"
          >
            <c-icon
              name="close"
              size="6"
              color="white"
            />
          </c-button>
        </c-flex>
      </c-flex>
    </c-box>
  </c-box>
</template>

<script>
import { bannerQuery } from '@/graphql/queries'
import { CBox, CButton, CFlex, CIcon, CLink, CText } from '@chakra-ui/vue'
import eventBus from '@/use/eventBus'

export default {
  name: 'Banner',
  components: {
    CBox,
    CButton,
    CFlex,
    CIcon,
    CLink,
    CText
  },
  data() {
    return {
      banner: {},
      days: 0, hours: 0, minutes: 0, seconds: 0,
    }
  },
  mounted() {
    this.countdown()
  },
  methods: {
    onCloseClick: function () {
      const style = this.$el.style
      style.opacity = 0

      setTimeout(function() {
        style.zIndex = -1
        eventBus.$emit('hidden:banner')
      }, 600)
    },
    countdown: function () {
      if (this.banner === null || this.banner.timer === null) {
        return
      }
      const timer = setInterval(() => {
        const end = new Date(this.banner.timer.datetime)
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: this.banner.timer.timeZone }))
        const diff = end.getTime() - now.getTime()

        if (diff < 0) {
          clearInterval(timer)
          return
        }

        this.days = Math.floor(diff / (1000 * 60 * 60 * 24))
        this.hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        this.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        this.seconds = Math.floor((diff % (1000 * 60)) / 1000)
      }, 1000)
    }
  },
  apollo: {
    banner: {
      prefetch: true,
      query: bannerQuery
    }
  }
}
</script>
