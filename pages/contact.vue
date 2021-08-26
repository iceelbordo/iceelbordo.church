<template>
  <base-layout>
    <template name="nav">
      <navbar bg="transparent" />
    </template>
    <template>
      <c-box
        width="100vw"
        height="100vh"
        bgImage="url('/img/map.png')"
        bgSize="cover"
        bgPos="center"
      >
        <container
          ref="container"
          height="100%"
          :pt="containerPaddingY"
          :pb="containerPaddingY"
        >
          <input
            v-chakra
            id="clipboard"
            position="absolute"
            left="-24rem"
          />
          <c-flex
            height="100%"
            :alignItems="[
              'center',   // base
              'flex-end', // sm
              'flex-end', // md
              'center'    // lg
            ]"
            :justifyContent="[
              'flex-start',
              'center',
              'center',
              'flex-start'
            ]"
          >
            <c-stack
              bg="white"
              boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              borderRadius="lg"
              py="4"
              :maxW="[
                'none', // base
                '32rem' // sm
              ]"
              :width="[
                'auto', // base
                '100%'  // sm
              ]"
            >
              <c-heading
                as="h3"
                size="md"
                fontWeight="500"
                px="6"
              >
                {{ contact.churchName }}
              </c-heading>
              <c-stack
                :spacing="2"
                userSelect="none"
              >
                <a
                  v-chakra="{
                    ':hover': { bg: 'blue.50', textDecoration: 'none' },
                    ':focus': { boxShadow: 'none' },
                    '&:hover > div:last-child': {
                      display: 'flex'
                    }
                  }"
                  :href="contact.map.url"
                  target="_blank"
                  display="flex"
                  alignItems="center"
                  py="2"
                  px="6"
                >
                  <c-flex flex="none">
                    <c-icon
                      name="location-market"
                      size="8"
                      color="blue.500"
                    />
                  </c-flex>
                  <c-flex
                    flex-grow="1"
                    mx="2"
                  >
                    <c-stack
                      :spacing="0"
                    >
                      <c-text as="samp">{{ contact.map.address }}</c-text>
                      <c-text as="samp">{{ contact.map.zip }} {{ contact.map.city }}, {{ contact.map.state }}, {{ contact.map.country }}</c-text>
                    </c-stack>
                  </c-flex>
                  <c-flex
                    flex="none"
                    display="none"
                  >
                    <c-icon
                      name="external-link"
                      size="5"
                      color="gray.400"
                    />
                  </c-flex>
                </a>
                <div
                  v-chakra="{
                    ':hover': { bg: 'blue.50' },
                    '&:hover > div:nth-child(3)': {
                      display: 'flex'
                    }
                  }"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  py="2"
                  px="6"
                  :data-text="contact.email"
                  @click="[onTextCopy($event), onShowToast()]"
                >
                  <c-flex flex="none">
                    <c-icon
                      name="at-symbol"
                      size="8"
                      color="blue.500"
                    />
                  </c-flex>
                  <c-flex
                    flex-grow="1"
                    mx="2"
                  >
                    <c-text as="samp">{{ contact.email }}</c-text>
                  </c-flex>
                  <c-flex
                    flex="none"
                    display="none"
                  >
                    <c-icon
                      name="duplicate"
                      size="5"
                      color="gray.400"
                    />
                  </c-flex>
                </div>
                <c-flex
                  align="center"
                  pt="2"
                  px="6"
                >
                  <c-flex flex="none">
                    <c-icon
                      name="clock"
                      size="8"
                      color="blue.500"
                    />
                  </c-flex>
                  <c-flex
                    flex-grow="1"
                    mx="2"
                  >
                    <c-text as="samp">Horario</c-text>
                  </c-flex>
                </c-flex>
                <table width="100%">
                  <tbody>
                    <template v-for="(schedule, index) in contact.schedules">
                      <tr
                        v-chakra="{
                          ':hover': { bg: 'blue.50' },
                          '&:hover > td:last-child': {
                            display: 'table-cell'
                          }
                        }"
                        :key="index"
                        cursor="pointer"
                        :data-text="`${translateDay(schedule.day)} ${schedule.startedAt} - ${schedule.finishedAt} ${schedule.meetingName}`"
                        @click="[onTextCopy($event), onShowToast()]"
                      >
                        <td
                          v-chakra
                          width="auto"
                          verticalAlign="top"
                          pl="16"
                          pr="0"
                          py="2"
                        >
                          {{ translateDay(schedule.day) }}
                        </td>
                        <td
                          v-chakra
                          width="100%"
                          px="2"
                          py="2"
                        >
                          <ul
                            v-chakra
                            listStyleType="none"
                          >
                            <li v-chakra>{{ schedule.startedAt }} - {{ schedule.finishedAt }}</li>
                            <li v-chakra fontSize="sm" color="gray.800">{{ schedule.meetingName }}</li>
                          </ul>
                        </td>
                        <td
                          v-chakra
                          width="auto"
                          display="none"
                          pl="0"
                          pr="6"
                          py="2"
                        >
                          <c-icon
                            name="duplicate"
                            size="5"
                            color="gray.400"
                          />
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </c-stack>
            </c-stack>
          </c-flex>
        </container>
      </c-box>
    </template>
    <template name="footer">
      <banner />
    </template>
  </base-layout>
</template>

<script>
import Banner from '@/components/Banner.vue'
import BaseLayout from '@/components/BaseLayout.vue'
import Container from '@/components/Container.vue'
import Navbar from '@/components/Navbar.vue'
import { useTranslate, useClipboard } from '@/use/hooks'
import eventBus from '@/use/eventBus'

import {
  CBox,
  CFlex,
  CHeading,
  CIcon,
  CLink,
  CStack,
  CText
} from '@chakra-ui/vue'
import { contactQuery } from '@/graphql/queries'

export default {
  name: 'contact',
  components: {
    Banner,
    BaseLayout,
    CBox,
    CFlex,
    CHeading,
    CIcon,
    CLink,
    Container,
    CStack,
    CText,
    Navbar
  },
  data() {
    const { copyFrom } = useClipboard()
    const { translateDay } = useTranslate()

    return {
      contact: {},
      translateDay,
      copyFrom,
      containerPaddingY: '20'
    }
  },
  mounted() {
    eventBus.$on('hidden:banner', () => this.containerPaddingY = '4')
  },
  methods: {
    onTextCopy: function(event) {
      this.copyFrom('#clipboard', event.currentTarget.dataset.text)
    },
    onShowToast() {
      this.$toast({
        position: 'top-right',
        duration: 3000,
        render: () => {
          return this.$createElement('div', {
            attrs: {
              'style': 'display: flex; align-items: center; background-color: #4F46E5; color: white; border-radius: 0.25rem; margin: 0.75rem 0.5rem 0.5rem 0.5rem; padding: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
            }
          }, [
            this.$createElement('svg', {
              attrs: {
                'xmlns': 'http://www.w3.org/2000/svg',
                'fill': 'none',
                'viewBox': '0 0 24 24',
                'stroke': 'currentColor',
                'style': 'flex: none; width: 1.25rem; height: 1.25rem; margin-right: 0.5rem'
              }
            }, [
              this.$createElement('path', {
                attrs: {
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': '2',
                  'd': 'M5 13l4 4L19 7'
                }
              })
            ]),
            this.$createElement('div', {
              attrs: {
                'style': 'flex: none'
              }
            }, 'Copied')
          ])

        }
      })
    }
  },
  apollo: {
    contact: {
      prefetch: true,
      query: contactQuery
    }
  }
}
</script>
