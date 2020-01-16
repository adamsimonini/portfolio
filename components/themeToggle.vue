<template>
    <v-list-item v-on:click="themeToggle()">
      <v-list-item-action>
        <v-icon>{{icon}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
       {{mode}}
      </v-list-item-content>
    </v-list-item>
</template>

<script>
const modes = [
    {
        name: "Light Mode",
        icon: "mdi-white-balance-sunny"
    },
    {
        name: "Dark Mode",
        icon: "mdi-weather-night",
    }
];
export default {
    name: 'themeToggle',
    data: () => {
        return {
            mode: modes[1].name,
            icon: modes[1].icon,
        }
    },
    created() {
        this.mode = this.$vuetify.theme.dark ? modes[0].name : modes[1].name;
        this.icon =  this.$vuetify.theme.dark ? modes[0].icon : modes[1].icon;
    },
    methods: {
        themeToggle: function() {
            this.$vuetify.theme.dark = this.$vuetify.theme.dark == true ? false : true;
            this.mode = this.$vuetify.theme.dark ? modes[0].name : modes[1].name;
            this.icon = this.$vuetify.theme.dark ? modes[0].icon : modes[1].icon;
        }
    },
    components: {
    },
}
</script>