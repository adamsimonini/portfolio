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
    <h2>{{ $t('allConferencesTitle')}}</h2>
    <!-- <LangToggle />
    <nuxt-link :to="localePath('inspire')">inspire</nuxt-link> -->
    <div class="all-conferneces">
      <ConfCard 
        v-for="(conf, i) in conferences" 
        :key="i" 
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

export default {
  name: 'Index',
  data: function () {
    return {
      layout: this.$store.state.layout,
      conferences: [],
    }
  },
  layout: 'default',
  components: {
    LangToggle,
    ThemeToggle,
    ConfCard,
  },
  computed: {
  },
  created () {
    this.conferences = conferences;
  },
  methods: {
    flipLayout: function () {
      // console.log(getCookie("i18n_redirected"));
      console.log(this.$getCookie("i18n_redirected"));

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
.all-conferneces {
  display: flex;
  justify-content: space-evenly;
  align-content: space-evenly;
  flex-wrap: wrap;
}
</style>