<template>
  <v-container class>
    <v-row>
      <div class="loader-box" v-if="!loaded">
        <v-progress-circular :size="100" color="primary" indeterminate class="loader"></v-progress-circular>
      </div>
      <v-col cols="10" md="10" v-if="loaded">
        <!-- <LangToggle />
        <nuxt-link :to="localePath('inspire')">inspire</nuxt-link>-->

        <h2 class="text-center">{{ $t('allConferencesTitle')}}</h2>

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
      </v-col>
      <v-col cols="2">
        <v-navigation-drawer
          v-model="filter.drawer"
          :mini-variant="filter.mini"
          :clipped="clipped"
          floating
          :mobile-break-point="1400"
          id="filter-drawer"
        >
          <h3>{{ $t('filters')}}</h3>
          <span>
            <b>{{ $t('year')}}</b>
          </span>
          <v-select
            class="filter-item mb-5"
            @change="applyFilters()"
            v-model="filters.year"
            :items="years"
            menu-props="auto"
            hide-details
            append-icon="mdi-calendar"
            single-line
            solo
          ></v-select>
          <span>
            <b>{{ $t('city')}}</b>
          </span>
          <v-select
            class="filter-item"
            @change="applyFilters()"
            v-model="filters.city"
            :items="cities"
            menu-props="auto"
            hide-details
            append-icon="mdi-map-marker"
            single-line
            solo
          ></v-select>
          <v-btn class="filter-item mt-5" @click="filterDate()">
            {{sortDateOrder == 'oldest' ? $t('showNewest') : $t('showOldest')}}
            <v-icon>mdi-clock</v-icon>
          </v-btn>
          <v-btn class="filter-item mt-5" color="primary" @click="reset()">{{ $t('clearFilters')}}</v-btn>
        </v-navigation-drawer>
      </v-col>
    </v-row>
  </v-container>
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
      allConferences: [],
      imageUrl: [],
      loaded: false,
      sortDateOrder: 'newest',
      cities: [],
      years: [],
      filters: {
        city: 'All',
        year: 'All'
      },
      clipped: false,
      fixed: false,
      filter: {
        drawer: true,
        mini: false
      }
    }
  },
  layout: 'default',
  components: {
    ConfCard
  },
  computed: {},
  created() {
    this.conferences = []
    let unsortedCities = []
    let unsortedYears = []
    const conferences = async () => {
      const conferenceRef = firebase.firestore().collection('conferences')
      const allConferences = await conferenceRef.get()
      for await (const conference of allConferences.docs) {
        this.conferences.push({
          id: conference.id,
          name: conference.data().name,
          city: conference.data().city,
          country: conference.data().country,
          website: conference.data().website,
          year: parseInt(conference.data().startDate.substring(0, 4)),
          startDate: conference.data().startDate,
          endDate: conference.data().endDate,
          deadline: conference.data().deadline,
          imageRef: conference.data().imageRef
        })
        // populate year filter
        if (
          !this.years.includes(
            parseInt(conference.data().startDate.substring(0, 4))
          )
        ) {
          unsortedYears.push(
            parseInt(conference.data().startDate.substring(0, 4))
          )
        }
        // populate city filter
        if (!this.cities.includes(conference.data().city)) {
          unsortedCities.push(conference.data().city)
        }
      }
      // sort the cities, then add an "All" option
      this.cities = unsortedCities.sort()
      this.cities.unshift('All')

      // sort the years, then add an "All" option
      this.years = unsortedYears.sort(function(a, b) {
        return b - a
      })
      this.years.unshift('All')

      this.allConferences = this.conferences.slice()
      setTimeout(() => {
        this.loaded = true
      }, 500)
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
          sortedArray = this.conferences.sort(
            (a, b) => new Date(a.startDate) - new Date(b.startDate)
          )
          this.sortDateOrder = 'oldest'
          break

        case 'oldest':
          sortedArray = this.conferences.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          )
          this.sortDateOrder = 'newest'
          break
        default:
          console.log('error with filtering by date')
          break
      }
      this.conferences = sortedArray
      // this.conferences = []
    },
    applyFilters() {
      let filters = this.filters
      this.conferences = this.allConferences.filter(conf => {
        let counter = 0
        for (let key in filters) {
          if (filters[key] == 'All') {
            counter++
          } else if (conf[key] == filters[key]) {
            // if the value of a given filter key matches the value of the same key in the conference, add to the counter
            counter++
          }
        }
        // if the counter has the same length as the number of filters, then the given conference should be shown
        if (counter == Object.keys(filters).length) {
          return true
        }
        // no matter the result, reset counter for the next conference
        counter = 0
      })
    },
    reset() {
      this.filters.city = 'All'
      this.filters.year = 'All'
      this.conferences = this.allConferences.slice()
    }
  }
}
</script>

<style scoped>
.column {
  height: 100%;
}
.all-conferneces {
  max-width: 1555px;
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  flex-wrap: wrap;
}
.filter-item {
  width: 100%;
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