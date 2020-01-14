<template>
    <div>
        <nuxt-link :to="switchLocalePath('en')">English</nuxt-link>
        <nuxt-link :to="switchLocalePath('fr')">Français</nuxt-link>
        <nuxt-link :to="switchLocalePath('jp')">日本語</nuxt-link>
    </div>
</template>

<script>

export default {
    name: 'langToggle',
    methods: {
        matchCookieWithStore: function() {
            // this.$store.langCookie.mutations('matchCookie');
        }
    },
    components: {
    },
}
</script>