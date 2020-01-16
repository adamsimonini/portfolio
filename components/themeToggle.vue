<template>
    <v-list-item v-on:click="themeToggle()">
      <v-list-item-action>
        <v-icon>mdi-apps</v-icon>
      </v-list-item-action>
      <v-list-item-content>
       {{mode}}
      </v-list-item-content>
    </v-list-item>
</template>

<script>

export default {
    name: 'themeToggle',
    data: () => {
        return {
            mode: "",
        }
    },
    created() {
        this.mode = this.$vuetify.theme.dark ? 'Light mode' : 'Dark mode';
    },
    methods: {
        themeToggle: function() {
            this.$vuetify.theme.dark = this.$vuetify.theme.dark == true ? false : true;
            this.mode = this.$vuetify.theme.dark ? 'Light mode' : 'Dark mode';
        }
    },
    components: {
    },
}
</script>