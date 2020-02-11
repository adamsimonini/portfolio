<template>
    <div>
        <!-- <v-select
          :items="items"
          label="language"
        ></v-select> -->
        <span>Font size: {{fontSize}}px</span>
        <br/>
        <v-btn @click="fontChange('+')"><b>+</b></v-btn>
        <v-btn @click="fontChange('-')"><b>-</b></v-btn>
    </div>
</template>

<script>
export default {
    name: 'fontSizePicker',
    data: () => ({
        fontSize: '',
    }),
    created() {
      // Check if there are cookies, and if so set everyhing up so that the truthvalue for the cooke takes precedence
        if(localStorage.getItem("appLocalStorage")){
            let root = document.documentElement;
            let currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0])
            if (currentSize > 7 && currentSize < 40){
                root.style.setProperty('--base-font-size', (JSON.parse(localStorage.getItem("appLocalStorage")).fontSize+ 'px'));
                this.fontSize = JSON.parse(localStorage.getItem("appLocalStorage")).fontSize;
            } else {
                this.fontSize = 18;
                root.style.setProperty('--base-font-size', "18px")
            }
                //   this.fontSize = JSON.parse(localStorage.getItem("appLocalStorage")).fontSize;
        }
    },
    methods: {
        fontChange(operator) {
            let root = document.documentElement;
            let currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0]);
            if(operator == "+") {
                currentSize++;
                root.style.setProperty('--base-font-size', (currentSize + 'px'));
                this.$store.commit('changeFontSize', currentSize);
                this.fontSize = currentSize;
                // this.fontSize
            } else {
                currentSize--;
                root.style.setProperty('--base-font-size', (currentSize + 'px'));
                this.$store.commit('changeFontSize', currentSize);
                this.fontSize = currentSize;
            }
            // console.log((parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0])+1)+"px");
            // this.fontSize = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0]));
        },
    },
    components: {
    },
}
</script>