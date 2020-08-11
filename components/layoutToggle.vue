<template>
    <v-list-item @click="flipLayout()">
      <v-list-item-action>
        <v-icon>{{`mdi-page-layout-sidebar-${this.layout}`}}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        {{ $t('flipLayout') }}
      </v-list-item-content>
    </v-list-item>
</template>

<script>
// TODO: address page/language change stutter after switching layout
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
          this.$store.commit('flipLayout', currentLayout);
          currentLayout == 'default' ? $nuxt.setLayout('rightNavDrawer') : $nuxt.setLayout('defaut');
        }
    },
    created() {
      // Check if there are cookies, and if so set everyhing up so that the truthvalue for the cooke takes precedence
      if(localStorage.getItem("appLocalStorage")){
          let currentLayout = JSON.parse(localStorage.getItem("appLocalStorage")).layout;
          $nuxt.setLayout(currentLayout);
      }
    },
    components: {
    },
}
</script>