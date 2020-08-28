<template>
  <div v-show="isLoaded" class="conf-card">
    <div class="conf-title">
      <h3>{{name}}</h3>
    </div>
    <nuxt-link
      class="conf-image"
      :to="localePath('singleConf')"
      v-on:click.native="updateConferenceSelection()"
    >
      <img v-if="imageUrl" :src="imageUrl" @error="imgPlaceholder" />
    </nuxt-link>
    <div class="conf-dates">
      <v-icon>mdi-calendar-month</v-icon>
      <span>
        <b>{{ $t('start') }}</b>
        : {{startDate}}
      </span>
    </div>
    <div class="conf-dates">
      <v-icon>mdi-calendar-month</v-icon>
      <span>
        <b>{{ $t('end') }}</b>
        : {{endDate}}
      </span>
    </div>
    <div class="conf-details">
      <div class="details-item conf-location">
        <v-icon>mdi-map-marker</v-icon>
        <span>{{city}}, {{country}}</span>
      </div>
      <!-- TODO: Add disabled when no link is provided  -->
      <div v-if="website" class="details-item conf-website">
        <v-btn :href="`//${this.website}`" target="_blank" :disabled="disabled">
          <v-icon>mdi-link-variant</v-icon>
          <span>{{ $t('website')}}</span>
        </v-btn>
      </div>
    </div>
    <div class="deadline">{{ $t("deadline") }}: {{deadline}}</div>
    <v-divider class="mx-4"></v-divider>
    <div v-if="isAdmin" class="deletion">
      <v-btn
        @click="deleteConference()"
        small
        :color="canDelete ? 'error' : 'primary'"
        :disabled="canDelete ? false : true"
      >
        <v-icon>{{canDelete ? "mdi-delete" : "mdi-delete-outline"}}</v-icon>
        {{ $t("delete") }}
      </v-btn>
      <v-switch v-model="canDelete" label></v-switch>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'confCard',
  data: () => ({
    disabled: false,
    imageUrl: '',
    canDelete: false,
    isAdmin: false,
    isLoaded: false,
  }),
  props: {
    // TODO: can I set default value to trigger when field is left blank? At the moment it never triggers
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'not provided'
    },
    imageRef: {
      type: String,
      default: ''
    },
    startDate: {
      type: String,
      default: 'not provided'
    },
    endDate: {
      type: String,
      default: 'not provided'
    },
    city: {
      type: String,
      default: 'not provided'
    },
    country: {
      type: String,
      default: 'not provided'
    },
    website: {
      type: String,
      default: ''
    },
    deadline: {
      type: String,
      default: 'not provided'
    }
  },
  computed: {
    userId() {
      if (this.$store.state.user) {
        return this.$store.state.user.uid
      }
      return false
    }
  },
  watch: {
    userId: function() {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(this.userId)

      userRef.get().then(doc => {
        if (doc.exists) {
          console.log(`conf card isAdmin: ${doc.data().isAdmin}`)
          const isAdmin = doc.data().isAdmin
          this.isAdmin = isAdmin
        } else {
          console.log('No user: user ID is invalid')
        }
      })
    },
    imageRef: function() {
      // what for when the reference changes due to filtering, and trigger getImage in order to get new image. 
      // TODO: all the images SHOULD be cashed, such that firebase calls don't need to be made most of the time
      this.getImageUrl();
    }
  },
  methods: {
    imgPlaceholder(e) {
      e.target.src = '/images/no-image-found.png'
    },
    updateConferenceSelection() {
      const conferenceData = {
        id: this.$props.id,
        name: this.$props.name,
        imageRef: this.$props.imageRef,
        startDate: this.$props.startDate,
        endDate: this.$props.endDate,
        city: this.$props.city,
        country: this.$props.country,
        website: this.$props.website,
        deadline: this.$props.deadline
      }
      this.$store.commit('updateConferenceSelection', conferenceData)
    },
    async getImageUrl() {
      const storage = firebase.storage()
      try {
        const storageRef = await storage.ref(this.$props.imageRef)
        const imageUrl = await storageRef.getDownloadURL().then(url => {
          this.imageUrl = url
        })
      } catch (err) {
        console.log(err)
        const storageRef = await storage
          .ref('no-image-found.png')
          .getDownloadURL()
          .then(function(url) {
            this.imageUrl = url
          })
      }
      this.isLoaded = true
    },
    deleteConference() {
      const conferenceRef = firebase
        .firestore()
        .collection('conferences')
        .doc(this.id)
        .delete()
        .then(() => {
          alert(`${this.name} has been deleted`)
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {},
  created() {
    this.getImageUrl()
    this.website == '' ? (this.disabled = true) : (this.disabled = false)
  },
  mounted() {
    // preliminary check for if user is an admin
    if (this.userId) {
      const userRef = firebase
        .firestore()
        .collection('users')
        .doc(this.userId)

      userRef.get().then(doc => {
        if (doc.exists) {
          this.isAdmin = doc.data().isAdmin
        } else {
          console.log('No user: user ID is invalid')
        }
      })
    }
  }
}
</script>

<style scoped>
.conf-card {
  max-width: 350px;
  width: 350px;
  margin: 40px 20px;
}
.conf-title {
  max-width: 100%;
  margin-bottom: 10px;
}
.conf-title h3 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  margin-bottom: 10px;
}
.conf-dates {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.conf-details {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.conf-details div {
  width: 50%;
}
.details-item {
  width: 33%;
  min-height: 70px;
}
.conf-image {
  text-align: center;
}
.conf-image img {
  width: 350px;
  height: 175px;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
}
.conf-image img:hover {
  transform: scale(0.97);
  box-shadow: 2px 6px 15px -4px rgba(0, 0, 55, 0.75);
}
a {
  text-decoration: none;
}
.details-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-height: 60px;
}
.deletion {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>