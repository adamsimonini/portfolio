<template>
    <v-list-item @click="themeToggle()">
      <v-list-item-action>
        <v-icon>{{icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
       {{ this.isDark ? $t('lightMode') : $t('darkMode') }}
      </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    name: 'themeToggle',
    data: () => {
        return {
            isDark: true,
            icon: "mdi-white-balance-sunny",
        }
    },
    created() {
        // Check if there are cookies, and if so set everyhing up so that the truthvalue for the cooke takes precedence
        if(localStorage.getItem("appLocalStorage")){
            let darkTheme = JSON.parse(localStorage.getItem("appLocalStorage")).darkTheme;
            this.isDark = darkTheme;
            this.$vuetify.theme.dark = darkTheme;
            this.isDark = darkTheme;
            this.icon = JSON.parse(localStorage.getItem("appLocalStorage")).darkTheme ? "mdi-white-balance-sunny" : "mdi-weather-night";
        }
    },
    computed: {
    },
    methods: {
        themeToggle: function() {
            this.$store.commit('toggleTheme');
            this.$vuetify.theme.dark = this.$store.state.darkTheme;
            this.icon = this.$store.state.darkTheme ? "mdi-white-balance-sunny" : "mdi-weather-night";
            this.isDark = this.$store.state.darkTheme;
        }
    },
    components: {
    },
}
</script>