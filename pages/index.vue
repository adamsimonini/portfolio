<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <LangToggle />
      <nuxt-link :to="localePath('inspire')">inspire</nuxt-link>-->
      <h2 class="text-center">{{ $t('allConferencesTitle')}}</h2>
      <div class="all-conferneces">
        <ConfCard
          v-for="(conf) in conferences"
          :id="conf.id"
          :key="conf.title"
          :image="conf.image"
          :name="conf.name"
          :startDate="conf.startDate"
          :endDate="conf.endDate"
          :location="conf.location"
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

export default {
  name: 'index',
  data: function() {
    return {
      conferences: []
    }
  },
  layout: 'default',
  components: {
    ConfCard
  },
  computed: {},
  created() {
  },
  mounted() {
    firebase
      .firestore()
      .collection('conferences')
      .onSnapshot(data => {
        this.conferences = []
        data.forEach(conference => {
          this.conferences.push({
            id: conference.id,
            name: conference.data().name,
            location: {
              city: conference.data().city,
              country: conference.data().country
            },
            website: conference.data().website,
            startDate: conference.data().startDate,
            endDate: conference.data().endDate,
            deadline: conference.data().deadline
          })
        })
      })
  },
  methods: {}
}
</script>

<style scoped>
.container {
  max-width: 1250px;
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
@media only screen and (max-width: 1400px) {
  .all-conferneces {
    display: flex;
    justify-content: center;
    align-content: space-evenly;
    flex-wrap: wrap;
  }
}
</style>