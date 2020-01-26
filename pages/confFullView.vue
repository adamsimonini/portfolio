<template>
<div>
    <div class="conf-card">
        <img class="conf-image" :src="image" @error="imgPlaceholder" alt="Conference image"/>
        <div class="all-conf-info">
            <div class="conf-title">
                <h2>{{title}}</h2>
            </div>
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
                    <v-btn :href="`//${this.website}`" target="_blank" large>
                        <v-icon>mdi-link-variant</v-icon>
                        <span>{{ $t('website')}}</span>
                    </v-btn>
                </div>
            </div>
            <div class="conf-deadline">
                Deadline to express interest: {{deadline}}
            </div>
        </div>
    </div>
    <v-row>
        <v-col cols="12" md="2" sm="6">
            <v-menu
                ref="menu"
                v-model="picker.start.menu"
                :close-on-content-click="false"
                :return-value.sync="picker.start.date"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="picker.start.date"
                    label="Start Date"
                    prepend-icon="mdi-calendar-month"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker v-model="picker.start.date" no-title scrollable readonly>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="picker.start.menu = false">{{ $t("close") }}</v-btn>
                </v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="2" sm="6">
            <v-menu
                ref="menu"
                v-model="picker.end.menu"
                :close-on-content-click="false"
                :return-value.sync="picker.end.date"
                transition="scale-transition"
                offset-y
                min-width="290px"
            >
                <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="picker.end.date"
                    label="End Date"
                    prepend-icon="mdi-calendar-month"
                    readonly
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker v-model="picker.end.date" no-title scrollable readonly>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="picker.end.menu = false">{{ $t("close") }}</v-btn>
                </v-date-picker>
            </v-menu>
        </v-col>
    </v-row>
    <div class="download">
        <v-btn href="https://cdn.hswstatic.com/gif/water-life-crop.jpg" large>
            <span>View {{reports.name}}'s Report</span>
            <v-icon>mdi-file-document</v-icon>
        </v-btn>
    </div>
</div>
</template>

<script>
import LangToggle from '@c/langToggle.vue';
import ThemeToggle from '@c/themeToggle.vue';
import { mapState } from 'vuex';
import {conferences} from '@@/static/conferences.js';
import moment from 'moment'

  export default {
    name: 'confFullView',
    data: function () {
      return {
        layout: this.$store.state.layout,
        picker: {
            start: {
                menu: false,
                date: moment().format("Do MMM YY"),
                // date: new Date().toISOString().substr(0, 10),
                modal: false,
                menu2: false,
            },
            end: {
                menu: false,
                date: new Date().toISOString().substr(0, 10),
                modal: false,
                menu2: false,
            },
        },
      }
    },
    props: {
        // TODO: can I set default value to trigger when field is left blank? At the moment it never triggers
        title: {
            type: String,
            default: conferences[0].title,
        },
        image: {
            type: String,
            default: conferences[0].image,
        },
        startDate: {
            type: String,
            default: conferences[0].startDate,
        },
        endDate: {
            type: String,
            default: conferences[0].endDate,
        },
        location: {
            type: Object,
            default: function () { 
                return {
                    city: conferences[0].location.city,
                    country: conferences[0].location.country,
                }
            }
        },
        website: {
            type: String,
            default: conferences[0].website,
        },
        deadline: {
            type: String,
            default: conferences[0].deadline,
        },
        reports: {
            type: Object,
            default: function () { 
                return {
                    name: conferences[0].reports.name,
                    url: conferences[0].reports.url,
                }
            }
        }
    },
    layout: 'default',
    components: {
    },
    computed: {
    },
    methods: {
        imgPlaceholder(e) {
            e.target.src = "/images/no-image-found.png"
        }
    },
  }
</script>

<style scoped>
.conf-card {
    font-size: 25px;
    display: flex;
}
.all-conf-info {
    display: grid;
    width: 60%;
    grid-template-columns: 10% 1fr 10%;
    grid-template-rows: auto;
    grid-template-areas: 
        ". title ."
        ". dates ."
        ". details ."
        ". deadline .";
}
.conf-image {
    width: 100%;
    min-width: 250px;
    max-width: 50%;
    grid-area: image;
    border-radius: 10px;
}
@media only screen and (max-width: 1050px) {
    .conf-card {
        margin: 0 5%;
        font-size: 25px;
        display: flex;
        flex-wrap: wrap;
    }
    .all-conf-info {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-row-gap: 20px;
        grid-template-areas: 
            "title"
            "dates"
            "details"
            "deadline";
    }
    .conf-image {
        width: 100%;
        max-width: 100%;
        grid-area: image;
    }
    .download {
        justify-content: flex-start;
        margin: 20px 5%;
    }
}
.conf-title {
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
    max-width: 500px;
    grid-area: title;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.conf-dates {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    grid-area: dates;
}
.conf-dates p {
    width: 50%;
}
.conf-details {
    display: flex;
    justify-content: space-between;
    align-content: center;
    grid-area: details;
}
.conf-details div{
    width: 50%;
}
.details-item {
    width: 33%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.conf-deadline {
    grid-area: deadline;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.v-application p {
    margin-bottom: 0;
}
a {
    text-decoration: none;
}
.download {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    width: 100%;
}
</style>