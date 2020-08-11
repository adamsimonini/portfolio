<template>
    <div>
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
            // this.fontSize = JSON.parse(localStorage.getItem("appLocalStorage")).fontSize;
        }
    },
    methods: {
        fontChange(operator) {
            let root = document.documentElement;
            let currentSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0]);
            if(operator == "+" && root.style.getPropertyValue('--base-font-size') != "26px") {
                currentSize++;
                root.style.setProperty('--base-font-size', (currentSize + 'px'));
                this.$store.commit('changeFontSize', currentSize);
                this.fontSize = currentSize;
            } else if (operator == "-" && root.style.getPropertyValue('--base-font-size') != "10px") {
                currentSize--;
                root.style.setProperty('--base-font-size', (currentSize + 'px'));
                this.$store.commit('changeFontSize', currentSize);
                this.fontSize = currentSize;
            }
        },
    },
    components: {
    },
}
</script>