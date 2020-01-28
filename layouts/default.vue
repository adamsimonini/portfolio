<!-- When the 'layout' key is not specified in a page's export default, then this layout will automatically be used-->

<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
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
              <v-list-item-content>Home</v-list-item-content>
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
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"/>
      <v-spacer />
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import LangToggle from '@c/langToggle.vue';
import ThemeToggle from '@c/themeToggle.vue';
import LayoutToggle from '@c/layoutToggle.vue'

export default {
  components: {
    LangToggle,
    ThemeToggle,
    LayoutToggle,
  },
  data() {
    return {
      locale: '',
      clipped: false,
      drawer: true,
      fixed: false,
      item: 0,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          path: "/"
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          path: '/inspire'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "PSD Conference Tracker",
      // title: "PSD Conference Tracker",
    }
  },
  created() {
    this.locale = this.$i18n.locale;
  },
  methods: {
  },
}
</script>

<style>
.nuxt-link{
  width: 100%;
}
</style>