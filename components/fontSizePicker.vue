<template>
  <v-list-item>
    <v-list-item-action>
      <v-icon>mdi-apps</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      {{ $t("fontSize") }} {{fontSize}}
      <v-btn
        width="50"
        class="ml-5 mr-5 size-button"
        :color="fontSize == '14px' ? 'primary' : 'none'"
        :depressed="fontSize == '14px' ? true : false"
        @click="fontChange('S')"
      >
        <b>S</b>
      </v-btn>
      <v-btn
      
        width="50"
        class="mr-5 size-button"
        :color="fontSize == '18px' ? 'primary' : 'none'"
        :depressed="fontSize == '18px' ? true : false"
        @click="fontChange('M')"
      >
        <b>M</b>
      </v-btn>
      <v-btn
        width="50"
        class="mr-5 size-button"
        :color="fontSize == '22px' ? 'primary' : 'none'"
        :depressed="fontSize == '22px' ? true : false"
        @click="fontChange('L')"
      >
        <b>L</b>
      </v-btn>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: 'fontSizePicker',
  data: () => ({
    fontSize: '',
    sizeLabels: ['Small', 'Medium', 'Large']
  }),
  created() {
    // Check if there are cookies, and if so set everyhing up so that the truthvalue for the cooke takes precedence
    if (localStorage.getItem('appLocalStorage')) {
      let root = document.documentElement
      let currentSize = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--base-font-size')
          .match(/\d+/)[0]
      )
      if (currentSize) {
        root.style.setProperty(
          '--base-font-size',
          JSON.parse(localStorage.getItem('appLocalStorage')).fontSize
        )
        this.fontSize = JSON.parse(
          localStorage.getItem('appLocalStorage')
        ).fontSize
      } else {
        this.fontSize = '18px'
        root.style.setProperty('--base-font-size', '18px')
      }
      // this.fontSize = JSON.parse(localStorage.getItem("appLocalStorage")).fontSize;
    }
  },
  methods: {
    fontChange(size) {
      let root = document.documentElement
      let currentSize = parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--base-font-size')
          .match(/\d+/)[0]
      )
      let newSize = null
      switch (size) {
        case 'S':
          newSize = '14px'
          root.style.setProperty('--base-font-size', newSize)
          this.$store.commit('changeFontSize', newSize)
          this.fontSize = newSize
          break
        case 'M':
          newSize = '18px'
          root.style.setProperty('--base-font-size', newSize)
          this.$store.commit('changeFontSize', newSize)
          this.fontSize = newSize
          break
        case 'L':
          newSize = '22px'
          root.style.setProperty('--base-font-size', newSize)
          this.$store.commit('changeFontSize', newSize)
          this.fontSize = newSize
          break
        // default:
        //   newSize = 18
        //   root.style.setProperty('--base-font-size', newSize)
        //   this.$store.commit('changeFontSize', newSize)
        //   this.fontSize = newSize
        //   break
      }
      //   if (
      //     size == '+' &&
      //     root.style.getPropertyValue('--base-font-size') != '26px'
      //   ) {
      //     currentSize++
      //     root.style.setProperty('--base-font-size', currentSize + 'px')
      //     this.$store.commit('changeFontSize', currentSize)
      //     this.fontSize = currentSize
      //   } else if (
      //     size == '-' &&
      //     root.style.getPropertyValue('--base-font-size') != '10px'
      //   ) {
      //     currentSize--
      //     root.style.setProperty('--base-font-size', currentSize + 'px')
      //     this.$store.commit('changeFontSize', currentSize)
      //     this.fontSize = currentSize
      //   }
    }
  },
  components: {}
}
</script>

<style scoped>
.size-button {
  max-width: 50px;
}
</style>