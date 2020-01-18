<template>
  <v-layout class="conf-card">
    <v-flex class="text-center">
        <div class="conf-title">
            <h3>{{title}}</h3>
        </div>
        <nuxt-link class="conf-image" :to="localePath('confFullView')">
            <!-- TODO: make image link to website as well -->
            <img :src="image" />
        </nuxt-link>
        <div class="conf-dates">
            <p><b>Start</b>: {{startDate}}</p>
            <p><b>End</b>: {{endDate}}</p>
        </div>
        <div class="conf-details">
            <div class="details-item conf-location">
                <v-icon>mdi-map-marker</v-icon>
                <span>{{location.city}}, {{location.country}}</span>
            </div>
            <!-- TODO: Add disabled when no link is provided  -->
            <div class="details-item conf-website">
                <v-btn :href="`//${this.website}`" target="_blank">
                    <v-icon>mdi-link-variant</v-icon>
                    <span>{{ $t('website')}}</span>
                </v-btn>
            </div>
        </div>
        <div class="deadline">
            Deadline to express interest: {{deadline}}
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
import LangToggle from '@c/langToggle.vue'
import ThemeToggle from '@c/themeToggle.vue'
import { mapState } from 'vuex'

  export default {
    name: 'confFullView',
    data: function () {
      return {
        layout: this.$store.state.layout,
      }
    },
    props: {
        // TODO: can I set default value to trigger when field is left blank? At the moment it never triggers
        title: {
            type: String,
            default: "not provided"
        },
        image: {
            type: String,
            default: "/images/no-image-found.png",
        },
        startDate: {
            type: String,
            default: "not provided"
        },
        endDate: {
            type: String,
            default: "not provided"
        },
        location: {
            type: Object,
            default: {
                city: "n/a",
                countey: "n/a"
            }
        },
        website: {
            type: String,
            default: "not provided"
        },
        deadline: {
            type: String,
            default: "not provided"
        },
    },
    layout: 'default',
    components: {
    },
    computed: {
      },
    methods: {
    }
  }
</script>

<style scoped>
.conf-card {
    margin: 0 10%;
    margin: 20px 20px;
}
.conf-title {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width: 300px;
}
.conf-dates {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.conf-dates p {
    width: 50%;
}
.conf-details {
    display: flex;
    justify-content: space-between;
    align-content: center;
}
.conf-details div{
    width: 50%;
}
.details-item {
    width: 33%;
    min-height: 70px;
}
.conf-image {
    text-align: center;
}
.conf-image img {
    max-width: 350px;
}
a {
    text-decoration: none;
}
</style>