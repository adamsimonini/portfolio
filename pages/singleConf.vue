<template>
  <v-layout column align-center>
    <div v-if="loaded && imageUrl" class="conf-card">
      <div class="conf-title">
        <h2>{{this.name}}</h2>
      </div>
      <img class="conf-image" :src="imageUrl" @error="imgPlaceholder" alt="Conference image" />
      <!-- <span>Start Date</span> -->
      <v-menu
        ref="menu"
        v-model="picker.start.menu"
        :close-on-content-click="false"
        :return-value.sync="picker.start.date"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template>
          <v-text-field
            class="picker"
            :value="formatDate(picker.start.date)"
            :label="$t('startDate')"
            prepend-icon="mdi-calendar-month"
            readonly
          ></v-text-field>
        </template>
      </v-menu>
      <!-- <span>End Date</span> -->
      <v-menu
        ref="menu"
        v-model="picker.end.menu"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template>
          <v-text-field
            class="picker"
            :value="formatDate(picker.end.date)"
            :label="$t('endDate')"
            prepend-icon="mdi-calendar-month"
            readonly
          ></v-text-field>
        </template>
      </v-menu>

      <div class="conf-location">
        <v-icon>mdi-map-marker</v-icon>
        <span>{{city}}, {{country}}</span>
      </div>
      <!-- TODO: Add disabled when no link is provided  -->
      <div class="details-item conf-website">
        <v-btn
          color="primary"
          small
          :href="`//${website}`"
          target="_blank"
          large
          :disabled="disabled"
        >
          <v-icon>mdi-link-variant</v-icon>
          <span>{{ $t('website')}}</span>
        </v-btn>
      </div>

      <div class="conf-deadline">
        <span>{{ $t("deadline") }}: {{deadline}}</span>
      </div>
      <!-- TODO: enable report feature that links to OneDrive -->
      <!-- <div class="download" v-if="reportName">
          <v-btn :href="`//${reportUrl}`" target="_blank" large>
            <span>View {{reportName}}'s Report</span>
            <v-icon>mdi-file-document</v-icon>
          </v-btn>
      </div>-->
      <div v-if="loaded && imageUrl" class="back-button">
        <nuxt-link :to="localePath('index')">
          <v-btn large @click="$router.push('index')">
            <v-icon>mdi-arrow-left-circle</v-icon>
            <span>{{ $t('back')}}</span>
          </v-btn>
        </nuxt-link>
      </div>
    </div>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import { mapState } from 'vuex'
import firebase from 'firebase'
import moment from 'moment'

export default {
  name: 'singleConf',
  data: function() {
    return {
      disabled: false,
      layout: this.$store.state.layout,
      loaded: false,
      date: new Date().toISOString().substr(0, 10),
      picker: {
        start: {
          menu: false,
          date: null,
          modal: false,
          menu2: false
        },
        end: {
          menu: false,
          date: null,
          modal: false,
          menu2: false
        }
      },
      name: null,
      imageRef: null,
      imageUrl: null,
      city: null,
      country: null,
      website: 'apple',
      deadline: null,
      reportName: 'Test',
      reportUrl: 'google.ca'
    }
  },
  layout: 'default',
  methods: {
    imgPlaceholder(e) {
      e.target.src = '/images/no-image-found.png'
    },
    formatDate(date) {
      moment.locale(this.locale)
      return this.date ? moment(date).format('dddd, MMMM Do YYYY') : ''
    },
    getImageUrl() {
      const storage = firebase.storage()
      try {
        const storageRef = storage.ref(this.imageRef)
        const imageUrl = storageRef.getDownloadURL().then(url => {
          this.imageUrl = url
        })
      } catch (err) {
        console.log(err)
        const storageRef = storage
          .ref('no-image-found.png')
          .getDownloadURL()
          .then(function(url) {
            this.imageUrl = url
          })
      }
    }
  },
  computed: {
    locale() {
      // cookies are leveraged for locale in order to persist beyond browser sessions
      const value = `; ${document.cookie}`
      const parts = value.split(`; i18n_redirected=`)
      if (parts.length === 2)
        return parts
          .pop()
          .split(';')
          .shift()
      console.log(
        'There was an error accessing the locale cookie. Reverint to English'
      )
      return 'en'
    }
  },
  created() {},
  mounted() {
    // if this is a shared link, extract the idea and set the selected conference in vuex
    if (window.location.search) {
      console.log(window.location.search)
      let id = decodeURI(window.location.search).replace(/[^\w\s]/gi, '')
      alert(
        `You are looking for the folloing conference: ${id}, which is encoded in the URL. Support for this request will be added in the future. Until then please search for the conference on the home page.`
      )
      this.$router.push('/')
      // firebase.firestore().collection('conferences').doc('8th ISPAH Congress').get().then((doc) => {
      //   this.$store.commit('updateConferenceSelection', doc.data())
      //   console.log(doc.data())
      // })
      // console.log(id)
    }
    const selectedConf = this.$store.getters.getSelectedConf
    this.id = selectedConf.id || null
    this.name = selectedConf.name || null
    this.deadline = selectedConf.deadline || null
    this.picker.end.date = selectedConf.endDate || null
    this.imageRef = selectedConf.imageRef || null
    this.city = selectedConf.city || null
    this.country = selectedConf.country || null
    this.picker.start.date = selectedConf.startDate || null
    this.website = selectedConf.website || null

    this.getImageUrl()
    this.loaded = true
    let encoded = encodeURI(this.id)
    window.history.replaceState(null, null, `?${encodeURI(this.name)}`)
  }
}
</script>

<style scoped>
.column {
  padding: 0 10%;
}
.conf-card {
  font-size: 25px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: space-around;
  height: 800px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  padding: 15px;
  border-radius: 50px;
  align-items: center;
  text-align: center;
}
.conf-card div {
  max-height: 40px;
}
.conf-title h2 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.picker {
  width: 100%;
}
.conf-image {
  width: 100%;
  min-width: 250px;
  max-width: 300px;
  grid-area: image;
  border-bottom: 5px solid black;
  padding-bottom: 5px;
}
.conf-location {
  width: 100%;
}
@media only screen and (max-width: 1430px) {
  .conf-card {
    margin: 0;
    font-size: 25px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .all-conf-info {
    display: grid;
    width: 80%;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-row-gap: 20px;
    grid-template-areas:
      'title'
      'dates'
      'details'
      'deadline'
      'download';
  }
  .conf-image {
    max-width: 80%;
    grid-area: image;
  }
  .download {
    justify-content: flex-start;
    margin: 20px 5%;
  }
  .conf-dates div {
    width: 100%;
  }
}
@media only screen and (max-width: 1430px) {
}
.conf-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  grid-area: title;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.conf-dates {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  grid-area: dates;
}
.v-text-field__slot:hover {
  cursor: pointer !important;
}
.conf-deadline {
  grid-area: deadline;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.v-application p {
  margin-bottom: 0;
}
a {
  text-decoration: none;
}
.download {
  grid-area: download;
  margin: 20px 0;
  width: 100%;
}
.back-button {
  margin-top: 20px;
}
</style>