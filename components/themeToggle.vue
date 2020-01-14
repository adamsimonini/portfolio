<template>
    <div>
        <v-btn v-on:click="themeToggle()">{{this.$vuetify.theme.dark ? 'Light' : 'Dark'}} mode</v-btn>
    </div>
</template>

<script>

export default {
    name: 'themeToggle',
    methods: {
        themeToggle: function() {
            this.$vuetify.theme.dark = this.$vuetify.theme.dark == true ? false : true;
        }
    },
    components: {
    },
}
</script>