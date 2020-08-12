<!-- When the 'layout' key is not specified in a page's export default, then this layout will automatically be used-->

<template>
  <v-app dark>
    <NavDrawer :navOptions="navOptions" />
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="navOptions.drawer = !navOptions.drawer" />
      <!-- <v-btn icon @click.stop="navOptions.mini = !navOptions.mini">
        <v-icon>mdi-{{ `chevron-${navOptions.mini ? 'right' : 'left'}` }}</v-icon>
      </v-btn>-->
      <v-toolbar-title v-text="this.$t('conferenceTracker')" />
      <v-spacer />
      <nuxt-link v-if="!userName" to="loginPage">
        <v-btn>login</v-btn>
      </nuxt-link>
      <div v-if="userName" class="avatar-bar">
        <v-toolbar-title v-text="userName" />
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
import firebase from 'firebase'

export default {
  components: {
    NavDrawer
  },
  data() {
    return {
      dialog: false,
      user: {},
      userName: null,
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
        console.log(this.user)
        this.updateUser()
        this.setUserNames()
      }
    })
  },
  methods: {
    updateUser() {
      // this is to replicate the user data without using this.user, which is mutatable via soruces beyond the store
      const newUser = JSON.parse(JSON.stringify(this.user))
      this.$store.commit('updateUser', newUser)
    },
    setUserNames() {
      db.collection('users')
        .doc(this.user.uid)
        .get()
        .then(snapshot => {
          this. userName = `${snapshot.data().firstName} ${snapshot.data().lastName}`
          this.initials = `${snapshot.data().firstName[0]}${snapshot.data().lastName[0]}`
          console.log(names)
        })
    }
  }
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