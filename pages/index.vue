<template>
  <v-layout column justify-center align-center class="column">
    <!-- <div v-if="!loaded">
      <v-progress-circular :size="100" color="primary" indeterminate class="loader"></v-progress-circular>
    </div>-->
    <div class="loader-box" v-if="!loaded">
      <v-progress-circular :size="100" color="primary" indeterminate class="loader"></v-progress-circular>
    </div>
    <v-flex xs12 sm8 md6 v-if="loaded">
      <!-- <LangToggle />
      <nuxt-link :to="localePath('inspire')">inspire</nuxt-link>-->

      <h2 class="text-center">{{ $t('allConferencesTitle')}}</h2>
      <div>
        <v-row>
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-btn @click="filterDate()">
              See {{sortDateOrder == 'oldest' ? "newest" : "oldest"}} first
              <v-icon v-if="sortDateOrder == 'oldest'">mdi-arrow-up-thick</v-icon>
              <v-icon v-if="sortDateOrder == 'newest'">mdi-arrow-down-thick</v-icon>
            </v-btn>
          </v-col>
          <!-- <v-col cols="2">
            <v-select
              @click="getCities()"
              v-model="selectedCity"
              :items="cities"
              menu-props="auto"
              label="Filter By City"
              hide-details
              prepend-icon="map-marker"
              single-line
            ></v-select>
          </v-col>-->
          <v-col cols="2">
            <v-btn color="warning" @click="reset()">
              Reset
              <v-icon>mdi-circle</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="all-conferneces">
        <ConfCard
          v-for="(conf) in conferences"
          :id="conf.id"
          :key="conf.title"
          :imageRef="conf.imageRef"
          :name="conf.name"
          :startDate="conf.startDate"
          :endDate="conf.endDate"
          :city="conf.city"
          :country="conf.country"
          :deadline="conf.deadline"
        />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import ConfCard from '@c/confCard.vue'
import { mapState } from 'vuex'
// import { conferences } from '@@/static/conferences.js'
import firebase from 'firebase'
import moment from 'moment'

if ('indexedDB' in window) {
  console.log('This browser does support IndexedDB')
}

export default {
  name: 'index',
  data: function() {
    return {
      conferences: [],
      imageUrl: [],
      loaded: false,
      sortDateOrder: 'newest',
      cities: [],
      allConferences: [],
      selectedCity: null
    }
  },
  layout: 'default',
  components: {
    ConfCard
  },
  computed: {},
  created() {
    this.conferences = []
    const conferences = async () => {
      const conferenceRef = firebase.firestore().collection('conferences')
      const allConferences = await conferenceRef.get()
      for (const conference of allConferences.docs) {
        this.conferences.push({
          id: conference.id,
          name: conference.data().name,
          city: conference.data().city,
          country: conference.data().country,
          website: conference.data().website,
          startDate: conference.data().startDate,
          endDate: conference.data().endDate,
          deadline: conference.data().deadline,
          imageRef: conference.data().imageRef
        })
      }
      this.allConferences = this.conferences.slice()
      setTimeout(() => {
        this.loaded = true
      }, 1000)
    }
    conferences()
  },
  mounted() {},
  methods: {
    filterDate() {
      console.log(this.conferences)
      let sortedArray = []
      switch (this.sortDateOrder) {
        case 'newest':
          console.log('newest triggered')
          sortedArray = this.conferences.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          )
          this.sortDateOrder = 'oldest'
          break

        case 'oldest':
          console.log('oldest triggered')
          sortedArray = this.conferences.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          )
          this.sortDateOrder = 'newest'
          break
        default:
          console.log('default triggered')
          break
      }
      this.conferences = sortedArray
      // this.conferences = []
    },
    ottawaOnly() {
      this.conferences = this.conferences.filter(conf => conf.city == 'Ottawa')
    },
    getCities() {
      if (this.cities.length == 0) {
        this.cities = this.conferences.map(conf => {
          return conf.city
        })
        console.log(this.cities)
      } else {
        let filteredByCity = this.conferences.filter(conf => {
          return conf.city == this.selectedCity
        })
        this.conferences = filteredByCity
      }
    },
    reset() {
      this.conferences = this.allConferences.slice()
    }
  }
}
</script>

<style scoped>
.column {
  height: 100%;
}

.container {
  max-width: 1250px;
  display: flex;
}
.all-conferneces {
  max-width: 1555px;
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
}
h2 {
  margin: 0 6%;
}
.loader-box {
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
}
@media only screen and (max-width: 1400px) {
  .all-conferneces {
    display: flex;
    justify-content: center;
    align-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>