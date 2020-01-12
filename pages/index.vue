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
    <h1>{{ $t('welcome')}}</h1>
    <LangToggle />
    <h2>Current language: {{this.$store.state.langCookie.language}}</h2>
    <h3 v-on:click="test()">test state</h3>
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import { mapState } from 'vuex'

export default {
  name: 'Index',
  data: function () {
    return {
      myNewLayout: 'layoutTest'
    }
  },
  layout () {
    return false ? 'layoutTest' : 'default';
  },
  components: {
    LangToggle,
  },
  computed: {
    ...mapState({
      newLayout: state => state.layout
    }),
  },
  methods: {
    test: function () {
      console.log(this.newLayout);
    }
  }
}
</script>
