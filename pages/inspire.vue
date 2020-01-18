<template>
  <v-layout>
    <v-flex class="text-center">
      <img
        src="/v.png"
        alt="Vuetify.js"
        class="mb-5"
      >
      <blockquote class="blockquote">
        &#8220;where there is a will, there is a hue!&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import { mapState } from 'vuex'

  export default {
    name: 'Index',
    data: function () {
      return {
        layout: this.$store.state.layout,
      }
    },
    layout: 'default',
    components: {
      LangToggle,
      ThemeToggle,
    },
    computed: {
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