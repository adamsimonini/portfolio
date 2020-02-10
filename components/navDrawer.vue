<template>
    <v-navigation-drawer
      v-model="navOptions.drawer"
      :mini-variant="navOptions.mini"
      :clipped="clipped"
      fixed
      :right=right
      app
      :mobile-break-point=1400
    >
      <v-list
      nav
      >
        <v-list-item-group>
          <nuxt-link class="nuxt-link" :to="localePath('index')">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-icon>
              <v-list-item-content>{{ $t("home") }}</v-list-item-content>
            </v-list-item>
          </nuxt-link>
          <nuxt-link class="nuxt-link" :to="localePath('inspire')">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-chart-bubble</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Inspire</v-list-item-content>
            </v-list-item>
          </nuxt-link>
        </v-list-item-group>
        <ThemeToggle />
        <LayoutToggle />
        <LangToggle />
      </v-list>
    </v-navigation-drawer>
</template>

<script>
import LangToggle from '@c/langToggle.vue';
import ThemeToggle from '@c/themeToggle.vue';
import LayoutToggle from '@c/layoutToggle.vue';

export default {
    name: 'navDrawer',
    components: {
        ThemeToggle,
        LayoutToggle,
        LangToggle,
    },
    data: () => ({
        clipped: false,
        fixed: false,
    }),
    props: {
      right: {
        type: Boolean,
        default: false,
      },
      navOptions: {
          type: Object,
          default: () => {
              return {
                  drawer: true,
                  mini: false,
              }
          }
      },
    },
    methods: {
    },
}
</script>

<style scoped>
</style>