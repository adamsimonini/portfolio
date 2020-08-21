<template>
   <v-layout column class="column">
    <div v-if="loaded && imageUrl" class="conf-card">
      <img class="conf-image" :src="imageUrl" @error="imgPlaceholder" alt="Conference image" />
      <div class="all-conf-info">
        <div class="conf-title">
          <h2>{{this.name}}</h2>
        </div>
        <div class="conf-dates">
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
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatDate(picker.start.date)"
                label="Start Date"
                prepend-icon="mdi-calendar-month"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="picker.start.date"
              no-title
              scrollable
              readonly
              color="green"
              :locale="locale"
              show-current="false"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="picker.start.menu = false">{{ $t("close") }}</v-btn>
            </v-date-picker>
          </v-menu>
          <!-- <span>End Date</span> -->
          <v-menu
            ref="menu"
            v-model="picker.end.menu"
            :close-on-content-click="false"
            :return-value.sync="picker.end.date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="formatDate(picker.end.date)"
                label="End Date"
                prepend-icon="mdi-calendar-month"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="picker.end.date"
              no-title
              scrollable
              readonly
              color="red"
              :locale="locale"
              show-current="false"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="picker.end.menu = false">{{ $t("close") }}</v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <div class="conf-details">
          <div class="details-item conf-location">
            <v-icon>mdi-map-marker</v-icon>
            <span>{{city}}, {{country}}</span>
          </div>
          <!-- TODO: Add disabled when no link is provided  -->
          <div class="details-item conf-website">
            <v-btn :href="`//${website}`" target="_blank" large :disabled="disabled">
              <v-icon>mdi-link-variant</v-icon>
              <span>{{ $t('website')}}</span>
            </v-btn>
          </div>
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
      </div>
    </div>
    <div v-if="loaded && imageUrl" class="back-button">
      <v-btn large @click="$router.push('/')">
        <v-icon>mdi-arrow-left-circle</v-icon>
        <span>{{ $t('back')}}</span>
      </v-btn>
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
      website: null,
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
      console.log('There was an error accessing the locale cookie. Reverint to English')
      return 'en'
    }
  },
  mounted() {
    const selectedConf = this.$store.getters.getSelectedConf
    this.id = selectedConf.id
    this.name = selectedConf.name
    this.deadline = selectedConf.deadline
    this.picker.end.date = selectedConf.endDate
    this.imageRef = selectedConf.imageRef
    this.city = selectedConf.location.city
    this.country = selectedConf.location.country
    this.picker.start.date = selectedConf.startDate
    this.website = selectedConf.website

    this.getImageUrl()
    this.loaded = true
  }
}
</script>

<style scoped>
.column {
  padding: 0 10%
}
.conf-card {
  font-size: 25px;
  display: flex;
  margin-top: 50px;
}
.conf-title h2 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.all-conf-info {
  display: grid;
  width: 60%;
  grid-template-columns: 5% 1fr 5%;
  grid-template-rows: auto;
  grid-template-areas:
    '. title .'
    '. dates .'
    '. details .'
    '. deadline .'
    '. download .';
}
.conf-image {
  width: 100%;
  min-width: 250px;
  max-width: 400px;
  grid-area: image;
  border-radius: 10px;
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
.conf-details {
  display: flex;
  justify-content: space-between;
  align-content: center;
  grid-area: details;
}
.conf-details div {
  width: 50%;
  padding: 0 10% 0 0;
}
.details-item {
  width: 33%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  text-align: center;
}
</style>