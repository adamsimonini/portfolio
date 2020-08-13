<template>
  <nuxt-link class="nuxt-link" :to="switchLocalePath(toggleLanguage())">
    <!-- empty on click is sufficient to apply vuetify theme styles applied to this item -->
    <v-list-item @click="()=>{}">
      <v-list-item-action>
        <v-icon>mdi-translate</v-icon>
      </v-list-item-action>
      <v-list-item-content>{{language}}</v-list-item-content>
    </v-list-item>
  </nuxt-link>
</template>

<script>
export default {
  name: 'langToggle',
  data: () => {
    return {
      language: 'English'
    }
  },
  methods: {
    toggleLanguage: function() {
      const newLocale = this.$i18n.getLocaleCookie() == 'en' ? 'fr' : 'en'
      this.language = newLocale == 'en' ? 'English' : 'Française'
      return newLocale
    }
  },
  components: {}
}
</script>