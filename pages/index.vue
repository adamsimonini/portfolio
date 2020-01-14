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
    <h3 v-on:click="flipLayout()">Flip Layout Vertically</h3>
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
      layout: 1
    }
  },
  layout () {
    return 'flippedLayout';
  },
  components: {
    LangToggle,
  },
  computed: {
  },
  methods: {
    flipLayout: function () {
      if(this.layout == 1){
        $nuxt.setLayout('flippedLayout');
        this.layout=0;
      } else if (this.layout == 0) {
        $nuxt.setLayout('test');
        this.layout=1;
      }
      // this.layout == 'default' ? (this.layout="flippedLayout", $nuxt.setLayout('flippedLayout')) : (this.layout="default", $nuxt.setLayout('default'));
      console.log(this.layout);
    }
  }
}
</script>
