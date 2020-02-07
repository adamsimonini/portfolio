<template>
    <v-list-item v-on:click="themeToggle()">
      <v-list-item-action>
        <v-icon>{{icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
       {{ this.lightMode ? $t('darkMode') : $t('lightMode') }}
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: 'themeToggle',
    data: () => {
        return {
            lightMode: false,
            mode: '',
            icon: "mdi-white-balance-sunny",
        }
    },
    created() {
        this.mode = this.$vuetify.theme.dark ? this.$t('lightMode') : this.$t('darkMode');
        this.icon =  this.$vuetify.theme.dark ? "mdi-white-balance-sunny" : "mdi-weather-night";
    },
    computed: {
    },
    methods: {
        themeToggle: function() {
            this.$vuetify.theme.dark = this.$vuetify.theme.dark == true ? false : true;
            this.lightMode = !this.$vuetify.theme.dark
            this.icon = this.$vuetify.theme.dark ? "mdi-white-balance-sunny" : "mdi-weather-night";
            // this.lightMode = this.$t('lightMode');
            // this.lightMode = this.$t('darkMode');
            // console.log(this.lightMode);
        }
    },
    components: {
    },
}
</script>