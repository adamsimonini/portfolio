<!-- When the 'layout' key is not specified in a page's export default, then this layout will automatically be used-->

<template>
  <v-app dark>
    <NavDrawer :navOptions="navOptions" />
    <v-app-bar :clipped-left="clipped" fixed app>
      <!-- <v-app-bar-nav-icon @click.stop="navOptions.drawer = !navOptions.drawer" /> -->
      <v-btn icon @click.stop="navOptions.mini = !navOptions.mini">
        <v-icon>mdi-{{ `chevron-${navOptions.mini ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="this.$t('conferenceTracker')" />
      <v-spacer />
      <nuxt-link v-if="!user" to='login'><v-btn>login</v-btn></nuxt-link>
      <div v-if="user" class="avatar-bar">
        <v-toolbar-title v-text="user" />
        <v-avatar color="indigo" size="50">
          <span class="white--text headline initials">{{this.initials}}</span>
        </v-avatar>
      </div>
    </v-app-bar>
    <v-content>
      <v-container id="container">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavDrawer from '@c/navDrawer.vue'
import db from '@p/firebase.js'

export default {
  components: {
    NavDrawer
  },
  data() {
    return {
      dialog: false,
      user: null,
      initials: null,
      locale: '',
      clipped: false,
      fixed: false,
      item: 0,
      navOptions: {
        drawer: true,
        mini: false
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          path: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          path: '/inspire'
        }
      ]
    }
  },
  created() {
    this.locale = this.$i18n.locale
  },
  mounted() {
    // db.collection('users')
    //   .doc('r7h17ifadmaJpjHLAmi6')
    //   .get()
    //   .then(snapshot => {
    //     this.user = `${snapshot.data().firstName} ${snapshot.data().lastName}`
    //     const names = this.user.split(' ');
    //     this.initials = names.map(name => {
    //       return name[0];
    //     }).join('');
    //   })
  },
  methods: {}
}
</script>

<style scoped>
.nuxt-link {
  width: 100%;
  text-decoration: none;
}
#container {
  max-width: 80%;
}
.avatar-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.avatar-bar .initials {
  font-size: 20px !important;
}
.login-field {
  padding: 24px;
}
.v-application a {
    color: transparent;
}
</style>