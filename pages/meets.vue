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
            :index="index"
            :key="item.id"
          />
          <template name="scroll">
            <scroll-button
              :count="meetsCount"
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
import { CHeading } from '@chakra-ui/vue'
import Banner from '@/components/Banner.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Container from '@/components/Container.vue'
import eventBus from '@/use/eventBus'
import Item from '@/components/meets/Item.vue'
import ListOfMeets from '@/components/meets/ListOfMeets.vue'
import { meetsCountQuery, meetsQuery } from '@/graphql/queries'
import Navbar from '@/components/Navbar.vue'
import PlyrModal from '@/components/meets/PlyrModal.vue'
import ScrollButton from '@/components/ScrollButton.vue'

export default {
  name: 'Meets',
  components: {
    Banner,
    BaseLayout,
    CHeading,
    Container,
    Item,
    ListOfMeets,
    Navbar,
    PlyrModal,
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
      meets: [],
      meetsCount: 0,
      containerPaddingBottom: '20'
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
  mounted() {
    eventBus.$on('hidden:banner', () => { this.containerPaddingBottom = '4' })
  },
  methods: {
    findAll(limit, start) {
      return this.$apollo.query({
        query: meetsQuery,
        variables: {
          limit,
          start
        }
      })
    },
    async onStartFromUpdate(startFrom) {
      const request = await this.findAll(this.limit, startFrom)
      if (request?.data.meets) {
        this.meets = [
          ...this.meets,
          ...request.data.meets
        ]
      }
    }
  },
  apollo: {
    meets: {
      prefetch: true,
      query: meetsQuery,
      variables() {
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
