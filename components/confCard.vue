<template>
  <div class="conf-card">
    <div class="conf-title">
      <h3>{{name}}</h3>
    </div>
    <nuxt-link
      class="conf-image"
      :to="localePath('confFullView')"
      v-on:click.native="updateConferenceSelection()"
    >
      <img :src="image" @error="imgPlaceholder" />
    </nuxt-link>
    <div class="conf-dates">
      <v-icon>mdi-calendar-month</v-icon>
      <span>
        <b>{{ $t('start') }}</b>
        : {{startDate}}
      </span>
    </div>
    <div class="conf-dates">
      <v-icon>mdi-calendar-month</v-icon>
      <span>
        <b>{{ $t('end') }}</b>
        : {{endDate}}
      </span>
    </div>
    <div class="conf-details">
      <div class="details-item conf-location">
        <v-icon>mdi-map-marker</v-icon>
        <span>{{location.city}}, {{location.country}}</span>
      </div>
      <!-- TODO: Add disabled when no link is provided  -->
      <div class="details-item conf-website">
        <v-btn :href="`//${this.website}`" target="_blank" :disabled="disabled">
          <v-icon>mdi-link-variant</v-icon>
          <span>{{ $t('website')}}</span>
        </v-btn>
      </div>
    </div>
    <div class="deadline">{{ $t("deadline") }}: {{deadline}}</div>
  </div>
</template>

<script>
export default {
  name: 'confCard',
  data: () => ({
    disabled: false
  }),
  props: {
    // TODO: can I set default value to trigger when field is left blank? At the moment it never triggers
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: 'not provided'
    },
    image: {
      type: String,
      default: '/images/no-image-found.png'
    },
    startDate: {
      type: String,
      default: 'not provided'
    },
    endDate: {
      type: String,
      default: 'not provided'
    },
    location: {
      type: Object,
      default: {
        city: 'not provided',
        countey: 'not provided'
      }
    },
    website: {
      type: String,
      default: 'not provided'
    },
    deadline: {
      type: String,
      default: 'not provided'
    }
  },
  methods: {
    imgPlaceholder(e) {
      e.target.src = '/images/no-image-found.png'
    },
    updateConferenceSelection() {
      this.$store.commit('updateConferenceSelection', this.id)
    }
  },
  components: {},
  created() {
    this.website == '' ? (this.disabled = true) : (this.disabled = false)
  }
}
</script>

<style scoped>
.conf-card {
  max-width: 350px;
  margin: 40px 20px;
}
.conf-title {
  max-width: 100%;
  margin-bottom: 10px;
}
.conf-title h3 {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  margin-bottom: 10px;
}
.conf-dates {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.conf-details {
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.conf-details div {
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
  width: 350px;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  height: 175px;
}
.conf-image img:hover {
  transform: scale(0.95);
  box-shadow: 2px 7px 23px -4px rgba(0, 0, 0, 0.75);
}
a {
  text-decoration: none;
}
.details-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  max-height: 60px;
}
</style>