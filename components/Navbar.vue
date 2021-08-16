<template>
    <c-box
      w="full"
      :bg="bg"
      position="fixed"
      top="0"
    >
      <container>
        <c-flex
          h="16"
          alignItems="center"
          flexDirection="row"
        >
          <c-flex>
            <c-button
              size="md"
              width="2.5rem"
              height="2.5rem"
              border="2px"
              borderColor="transparent"
              :display="[
                'none',    // base
                'inherit', // sm
                'none'     // md
              ]"
              @click="toggleIsVisible"
            >
              <c-icon
                :name="state.isVisible ? 'close' : 'menu'"
                size="6"
              />
            </c-button>
          </c-flex>
          <c-flex
            w="full"
            :justifyContent="[
              'flex-start', // base
              'center',     // sm
              'flex-start'  // md
            ]"
          >
            <c-stack
              is-inline
              :spacing="[
                8, // base
                0, // sm
                8  // md
              ]"
              alignItems="center"
            >
              <c-stack
                is-inline
                :spacing="[
                  4, // base
                  0, // sm
                  4  // md
                ]"
                alignItems="center"
              >
                <c-icon
                  name="church"
                  size="10"
                  color="blue.500"
                />
                <c-box
                  fontSize="2xl"
                  :display="[
                    'block', // base
                    'none',  // sm
                    'block'  // md
                  ]"
                >{{ navbar.churchShortName }} </c-box>
              </c-stack>
              <c-stack
                is-inline
                as="nav"
                spacing="4"
                :display="[
                  'block', // base
                  'none',  // sm
                  'block'  // md
                ]"
              >
                <c-link
                  color="gray.900"
                  px="3"
                  py="2"
                  rounded="md"
                  fontSize="md"
                  lineHeight="1.25rem"
                  :bg="$route.path === link.url ? 'gray.200' : 'transparent'"
                  :_hover="{
                    bg: 'gray.200'
                  }"
                  :_focus="{
                    boxShadow: 'none'
                  }"
                  :href="link.url"
                  v-for="(link, index) in navbar.links"
                  :key="index"
                >{{ link.text }}</c-link>
              </c-stack>
            </c-stack>
          </c-flex>
        </c-flex>
        <c-box
          pb="4"
          :display="[
            'none',    // base
            'inherit', // sm
            'none'     // md
          ]"
        >
          <c-stack
            as="nav"
            spacing="4"
          >
            <c-link
              color="gray.900"
              :display="state.isVisible ? 'block' : 'none'"
              px="3"
              py="2"
              rounded="md"
              fontSize="md"
              lineHeight="1.25rem"
              :bg="$route.path === link.url ? 'gray.200' : 'transparent'"
              :_hover="{
                bg: 'gray.200'
              }"
              :href="link.url"
               v-for="(link, index) in navbar.links"
              :key="index"
            >{{ link.text }}</c-link>
          </c-stack>
        </c-box>
      </container>
    </c-box>
</template>

<script>
import { CBox, CFlex, CLink, CStack } from '@chakra-ui/vue'
import Container from '@/components/Container.vue'
import { navbarQuery } from '@/graphql/queries'
import { useState } from '@/use/useState'

export default {
  name: 'Navbar',
  components: {
    CBox,
    CFlex,
    CLink,
    Container,
    CStack
  },
  props: {
    bg: {
      type: String,
      default: 'white'
    }
  },
  data () {
    const { state, toggleIsVisible } = useState()

    return {
      navbar: {},
      state, toggleIsVisible
    }
  },
  apollo: {
    navbar: {
      prefetch: true,
      query: navbarQuery
    }
  }
}
</script>
