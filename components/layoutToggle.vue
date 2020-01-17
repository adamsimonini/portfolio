<template>
    <v-list-item @click="flipLayout()">
      <v-list-item-action>
        <v-icon>{{`mdi-page-layout-sidebar-${this.layout + this.layout == 'left' ? 'right' : 'left'}`}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        Flip layout
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
        // console.log(getCookie("i18n_redirected"));
        console.log(this.$getCookie("i18n_redirected"));

        // this functional changes which layout the component is using, as seen in the :root/layout folder
        let currentLayout = this.$nuxt.$data.layoutName;
        // either way works, though the 2nd one is harder to understand
        currentLayout == 'default' ? $nuxt.setLayout('flippedLayout') : $nuxt.setLayout('defaut');
        // $nuxt.setLayout(currentLayout = currentLayout == 'default' ? 'flippedLayout' : 'default')
        }
    },
    components: {
    },
}
</script>