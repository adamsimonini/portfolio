<template>
  <v-layout column justify-center align-center>
    <v-flex class="text-center">
      <h2>{{ $t("settings") }}</h2>
      <v-list-item-group>
        <LangToggle />
        <v-divider class="mx-4"></v-divider>
        <ThemeToggle />
        <v-divider class="mx-4"></v-divider>
        <FontSizePicker />
        <v-divider class="mx-4"></v-divider>
        <v-list-item v-if="isUser" :disabled="!canDelete" @click="deleteAccount()">
          <v-list-item-icon>
            <v-icon :color="canDelete ? 'red' : 'grey'">{{canDelete ? "mdi-delete" : "mdi-delete-outline"}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content >{{ $t("deleteAccount") }}</v-list-item-content>
        </v-list-item>
        <v-list-item v-if="isUser">
          <v-switch
            v-model="canDelete"
            :label="canDelete ? $t('deletionEnable') : $t('deletionDisable')"
          ></v-switch>
        </v-list-item>
      </v-list-item-group>
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import FontSizePicker from '@c/fontSizePicker.vue'
import firebase from 'firebase'

export default {
  name: 'Settings',
  data: function() {
    return {
      layout: this.$store.state.layout,
      canDelete: false,
      isUser: false,
    }
  },
  layout: 'default',
  components: {
    LangToggle,
    ThemeToggle,
    FontSizePicker
  },
  computed: {},
  methods: {
    deleteAccount() {
      var user = firebase.auth().currentUser
      console.log(user)
      user
        .delete()
        .then(function() {
          alert('Your account has been deleted and you have been logged out.')
          // delete the document within the users collection
          firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .delete()
            .then(function() {
              console.log('Document successfully deleted!')
            })
            .catch(function(error) {
              console.error('Error removing document: ', error)
            })
            window.location.reload()
        })
        .catch(function(error) {
          alert(`Deletion failed. Error: ${error}`)
        })
    }
  },
  mounted() {
    this.$store.getters.getUser != null
      ? (this.isUser = true)
      : (this.isUser = false)
  }
}
</script>

<style>
.nuxt-link {
  text-decoration: none;
}
</style>