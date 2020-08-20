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
      <div :v-if="userName" class="avatar-bar">
        <v-toolbar-title v-text="userName" />
        <!-- <v-avatar color="indigo" size="50">
          <span class="white--text headline initials">{{this.initials}}</span>
        </v-avatar>-->
        <v-divider class="pr-3 mr-3" :vertical="true"></v-divider>
      </div>
      <!-- <nuxt-link :to="this.user ? 'inspire' : 'login'"> -->
      <v-btn color="primary" @click="user ? logout() : goToLogin()">{{user ? "logout" : "sign in"}}</v-btn>
      <!-- </nuxt-link> -->
    </v-app-bar>
    <v-content class="main-content-box">
      <div class="loader-box">
        <v-progress-circular
          v-if="loggingOut"
          :size="100"
          color="primary"
          indeterminate
          class="loader"
        ></v-progress-circular>
      </div>
      <v-container v-if="!loggingOut" id="container">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavDrawer from '@c/navDrawer.vue'
import firebase from 'firebase'

export default {
  components: {
    NavDrawer
  },
  data() {
    return {
      dialog: false,
      user: null,
      userName: null,
      initials: null,
      locale: '',
      clipped: false,
      fixed: false,
      item: 0,
      loggingOut: false,
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
        // console.log('user:')
        // console.log(user)
        this.userName = user.displayName
        this.updateUser()
      } else {
        this.userName = null
        this.$store.commit('updateUser', null)
      }
    })
    // delete collection from DB
    // firebase
    //   .firestore()
    //   .collection('users')
    //   .doc('569H7KlbT8afQovLWMpc4DyzHh33')
    //   .delete()
    //   .then(function() {
    //     console.log('Document successfully deleted!')
    //   })
    //   .catch(function(error) {
    //     console.error('Error removing document: ', error)
    //   })
  },
  methods: {
    updateUser() {
      // this is to replicate the user data without using this.user, which is mutatable via soruces beyond the store
      const newUser = JSON.parse(JSON.stringify(this.user))
      this.$store.commit('updateUser', newUser)
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.loggingOut = true
          this.user = null
          this.userName = null
          this.$router.push('')
          this.$store.commit('updateUser', null)
          window.location.reload()
        })
    },
    goToLogin() {
      this.$router.push('login')
    },
    curerntUser() {
      console.log('user:')
      return this.$store.getters.getUser
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
.loader {
  margin: auto;
  height: 100%;
}
.main-content-box {
  display: flex;
}
.loader-box {
  position: absolute;
  top: 40%;
  height: 100px;
  right: 50%;
}
</style>