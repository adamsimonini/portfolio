<template>
    <v-list-item>
      <v-list-item-action>
        <v-icon>mdi-translate</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        abcd
      </v-list-item-content>
    </v-list-item>
</template>

<script>

export default {
    name: 'langToggle',
    data: () => ({
      items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    }),
    methods: {
        names: function() {
            alert(this.$i18n.locales);
        },
        getCurrentRoute: function() {
            return this.$router.currentRoute
        }
    },
    computed: {
        localNames () {
            return this.$i18n.locales.filter(i => i.name)
        }
    },
}
</script>