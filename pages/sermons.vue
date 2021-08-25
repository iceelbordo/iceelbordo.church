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
              :item="item"
              :index="index"
              :key="item.id"
              :showControls="sermonIndex === index"
              @update:index="sermonIndex = $event"
            />
            <template name="scroll">
              <infinite-scroll
                :show="state.isLoading"
                :size="sermonsCount"
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
import Banner from '@/components/Banner.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import { CFlex, CHeading, CStack } from '@chakra-ui/vue'
import Container from '@/components/Container.vue'
import eventBus from '@/use/eventBus'
import InfiniteScroll from '@/components/InfiniteScroll.vue'
import Item from '@/components/sermons/Item.vue'
import ListOfSermons from '@/components/sermons/ListOfSermons.vue'
import Navbar from '@/components/Navbar.vue'
import { sermonsQuery, sermonsCountQuery } from '@/graphql/queries'
import { useState } from '@/use/hooks'

export default {
  name: 'sermons',
  components: {
    Banner,
    BaseLayout,
    CFlex,
    CHeading,
    Container,
    CStack,
    InfiniteScroll,
    Item,
    ListOfSermons,
    Navbar
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
    const { state, toggleIsLoading } = useState()

    return {
      sermons: [],
      sermonsCount: 0,
      sermonIndex: undefined,
      state, toggleIsLoading,
      containerPaddingBottom: '20'
    }
  },
  mounted() {
    eventBus.$on('hidden:banner', () => this.containerPaddingBottom = '4')
  },
  methods: {
    findAll: function (limit, start) {
      return this.$apollo.query({
        query: sermonsQuery,
        variables: {
          limit: limit,
          start: start
        }
      })
    },
    onStartFromUpdate: async function (fromStart) {
      this.toggleIsLoading()
      const request = await this.findAll(this.limit, fromStart)
      if (request?.data.sermons) {
        this.sermons = [
          ...this.sermons,
          ...request.data.sermons
        ]
      }
      this.toggleIsLoading()
    }
  },
  apollo: {
    sermons: {
      prefetch: true,
      query: sermonsQuery,
      variables () {
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
