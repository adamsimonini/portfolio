<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
    <!-- <LangToggle />
    <nuxt-link :to="localePath('inspire')">inspire</nuxt-link> -->
    <h2>{{ $t('allConferencesTitle')}}</h2>
    <div class="all-conferneces">
      <ConfCard 
        v-for="(conf, i) in conferences"
        :cardIndex=i
        :key="conf.title" 
        :image="conf.image"
        :title="conf.title"
        :startDate="conf.startDate"
        :endDate="conf.endDate"
        :location="conf.location"
        :website="conf.website"
        :deadline="conf.deadline"
      />
    </div>
    <!-- <v-btn @click="flipLayout()">Flip layout</v-btn> -->
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import ConfCard from '@c/confCard.vue'
import { mapState } from 'vuex'
import {conferences} from '@@/static/conferences.js'
// console.log(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));
// document.documentElement.style.setProperty('--base-font-size', '20');
// console.log(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size'));

export default {
  name: 'Index',
  data: function () {
    return {
      locale: '',
      clipped: false,
      fixed: false,
      item: 0,
      navOptions: {
        drawer: true,
        mini: false,
      },
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          path: "/"
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          path: '/inspire'
        },
      ],
      title: "PSD Conference Tracker",
    }
  },
  layout: localStorage.getItem("appLocalStorage")? JSON.parse(localStorage.getItem("appLocalStorage")).layout : this.$store.state.layout,
  components: {
    LangToggle,
    ThemeToggle,
    ConfCard,
  },
  computed: {
  },
  created () {
    this.conferences = conferences;
    console.log(this.$getCookie("i18n_redirected"));
  },
  methods: {
    flipLayout: function () {
      // console.log(getCookie("i18n_redirected"));
      // console.log(this.$getCookie("i18n_redirected"));

      // this functional changes which layout the component is using, as seen in the :root/layout folder
      let currentLayout = this.$nuxt.$data.layoutName;
      // either way works, though the 2nd one is harder to understand
      currentLayout == 'default' ? $nuxt.setLayout('flippedLayout') : $nuxt.setLayout('defaut');
      // $nuxt.setLayout(currentLayout = currentLayout == 'default' ? 'flippedLayout' : 'default')
    }
  }
}
</script>

<style scoped>
.container{
  max-width: 1250px;
}
.all-conferneces {
  display: flex;
  align-content: space-evenly;
  flex-wrap: wrap;
  margin: 0 5%;
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