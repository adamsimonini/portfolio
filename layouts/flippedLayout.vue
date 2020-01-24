<!-- Applicable when compoent's layout value = the name of this file -->

<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-spacer />
      <v-toolbar-title v-text="title" />
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      right
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <ThemeToggle />
        <LayoutToggle />
        <LangToggle />
      </v-list>
    </v-navigation-drawer>
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
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/en'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/en/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      title: "PSD Conference Tracker"
    }
  }
}
</script>
