<template>
    <v-list-item @click="flipLayout()">
      <v-list-item-action>
        <v-icon>{{`mdi-page-layout-sidebar-${this.layout}`}}</v-icon>
        <!-- <v-icon>mdi-page-layout-sidebar-right</v-icon> -->
      </v-list-item-action>
      <v-list-item-content>
        {{ $t('flipLayout') }}
      </v-list-item-content>
    </v-list-item>
</template>

<script>

export default {
    name: 'layoutToggle',
    data: () => {
        return {
            layout: "left",
        }
    },
    methods: {
        flipLayout: function () {

        // this functional changes which layout the component is using, as seen in the :root/layout folder
        let currentLayout = this.$nuxt.$data.layoutName;
        // either way works, though the 2nd one is harder to understand
        currentLayout == 'default' ? $nuxt.setLayout('flippedLayout') : $nuxt.setLayout('defaut');
        }
    },
    components: {
    },
}
</script>