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
        <c-heading
          as="h1"
          size="xl"
          fontSize="xl"
          fontWeight="normal"
          mb="4"
        >
          Meets disponibles
        </c-heading>
        <list-of-meets>
          <item
            v-for="(item, index) in meets"
            :item="item"
            :key="index"
          />
          <template name="scroll">
            <infinite-scroll
              :show="state.isLoading"
              :size="meetsCount"
              :pageSize="limit"
              @update:startFrom="onStartFromUpdate"
            />
          </template>
        </list-of-meets>
        <plyr-modal />
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
import { CHeading } from '@chakra-ui/vue'
import Container from '@/components/Container.vue'
import InfiniteScroll from '@/components/InfiniteScroll.vue'
import Item from '@/components/meets/Item.vue'
import ListOfMeets from '@/components/meets/ListOfMeets.vue'
import Navbar from '@/components/Navbar.vue'
import PlyrModal from '@/components/meets/PlyrModal.vue'
import { meetsQuery, meetsCountQuery } from '@/graphql/queries'
import { useState } from '@/use/hooks'
import eventBus from '@/use/eventBus'

export default {
  name: 'meets',
  components: {
    Banner,
    BaseLayout,
    CHeading,
    Container,
    InfiniteScroll,
    Item,
    ListOfMeets,
    Navbar,
    PlyrModal
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
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.plyr.io/3.6.8/plyr.css',
          body: true
        },
        {
          rel: 'stylesheet',
          href: '/css/plyr.css',
          body: true
        }
      ],
    }
  },
  data() {
    const { state, toggleIsLoading } = useState()

    return {
      meets: [],
      meetsCount: 0,
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
        query: meetsQuery,
        variables: {
          limit: limit,
          start: start
        }
      })
    },
    onStartFromUpdate: async function(startFrom) {
      this.toggleIsLoading()
      const request = await this.findAll(this.limit, startFrom)
      if (request?.data.meets) {
        this.meets = [
          ...this.meets,
          ...request.data.meets
        ]
      }
      this.toggleIsLoading()
    }
  },
  apollo: {
    meets: {
      prefetch: true,
      query: meetsQuery,
      variables () {
        return {
          limit: this.limit,
          start: this.start
        }
      }
    },
    meetsCount: {
      prefetch: true,
      query: meetsCountQuery
    }
  }
}
</script>
