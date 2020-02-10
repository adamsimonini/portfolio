<template>
    <div>
        <!-- <v-select
          :items="items"
          label="language"
        ></v-select> -->
        <p>Font size picker</p>
        <span>Font size: {{fontSize}}</span>
        </br>
        <v-btn @click="fontChange('+')">+</v-btn>
        <v-btn @click="fontChange('-')">-</v-btn>
    </div>
</template>

<script>
export default {
    name: 'fontSizePicker',
    data: () => ({
        fontSize: 16,
    }),
    methods: {
        fontChange(operator) {
            let root = document.documentElement;
            if(operator == "+") {
                root.style.setProperty('--base-font-size', (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0])+1)+"px");
            } else {
                root.style.setProperty('--base-font-size', (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0])-1)+"px");
            }
            console.log((parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0])+1)+"px");
            this.fontSize = (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--base-font-size').match(/\d+/)[0]));
        },
    },
    components: {
    },
}
</script>