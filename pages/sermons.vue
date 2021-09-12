<template>
  <base-layout>
    <template name="nav">
      <navbar />
    </template>
    <template>
      <container
        pt="20"
        :pb="containerPaddingBottom"
      >
        <c-stack
          :spacing="4"
        >
          <c-heading
            as="h1"
            size="xl"
            fontSize="xl"
            fontWeight="normal"
          >
            Sermones disponibles
          </c-heading>
          <list-of-sermons>
            <item
              v-for="(item, index) in sermons"
              :key="item.id"
              :item="item"
              :index="index"
              :showControls="sermonIndex === index"
              @update:index="sermonIndex = $event"
            />
            <template name="scroll">
              <scroll-button
                :count="sermonsCount"
                :pageSize="limit"
                @update:startFrom="onStartFromUpdate"
              />
            </template>
          </list-of-sermons>
        </c-stack>
      </container>
    </template>
    <template name="footer">
      <banner />
    </template>
  </base-layout>
</template>

<script>
import { CHeading, CStack } from '@chakra-ui/vue'
import Banner from '@/components/Banner.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Container from '@/components/Container.vue'
import eventBus from '@/use/eventBus'
import Item from '@/components/sermons/Item.vue'
import ListOfSermons from '@/components/sermons/ListOfSermons.vue'
import Navbar from '@/components/Navbar.vue'
import ScrollButton from '@/components/ScrollButton.vue'
import { sermonsCountQuery, sermonsQuery } from '@/graphql/queries'

export default {
  name: 'Sermons',
  components: {
    Banner,
    BaseLayout,
    CHeading,
    Container,
    CStack,
    Item,
    ListOfSermons,
    Navbar,
    ScrollButton
  },
  props: {
    limit: {
      type: Number,
      default: 10
    },
    start: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      sermons: [],
      sermonsCount: 0,
      sermonIndex: undefined,
      containerPaddingBottom: '20'
    }
  },
  mounted() {
    eventBus.$on('hidden:banner', () => { this.containerPaddingBottom = '4' })
  },
  methods: {
    findAll(limit, start) {
      return this.$apollo.query({
        query: sermonsQuery,
        variables: {
          limit,
          start
        }
      })
    },
    async onStartFromUpdate(fromStart) {
      const request = await this.findAll(this.limit, fromStart)
      if (request?.data.sermons) {
        this.sermons = [
          ...this.sermons,
          ...request.data.sermons
        ]
      }
    }
  },
  apollo: {
    sermons: {
      prefetch: true,
      query: sermonsQuery,
      variables() {
        return {
          limit: this.limit,
          start: this.start
        }
      }
    },
    sermonsCount: {
      prefetch: true,
      query: sermonsCountQuery
    }
  }
}
</script>
