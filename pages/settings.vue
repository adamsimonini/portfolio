<template>
  <v-layout>
    <v-flex class="text-center">
      <h2>{{ $t("settings") }}</h2>
      <LangToggle />
            <v-divider
        class="mx-4"
      ></v-divider>
      <ThemeToggle />
            <v-divider
        class="mx-4"
      ></v-divider>
      <FontSizePicker />
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import FontSizePicker from '@c/fontSizePicker.vue'

export default {
  name: 'Settings',
  data: function() {
    return {
      layout: this.$store.state.layout
    }
  },
  layout: 'default',
  components: {
    LangToggle,
    ThemeToggle,
    FontSizePicker
  },
  computed: {},
  methods: {},
  created() {
    console.log('test')
  },
}
</script>

<style>
.nuxt-link {
  text-decoration: none;
}
</style>