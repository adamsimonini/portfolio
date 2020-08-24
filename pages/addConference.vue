<template>
  <v-layout>
    <v-flex class="text-center">
      <h2>{{ $t("addConference") }}</h2>
      <v-text-field
        id="success"
        v-if="success"
        background-color="rgba(34, 139, 34, 1)"
        color="rgba(34, 139, 34, 1)"
        readonly
        outlined
        height="50"
        value="Success! Your conference has been added to the database."
      >
        <template slot="append">
          <v-btn
            id="success-button"
            fab
            height="20"
            width="20"
            color="rgba(34, 139, 34, 1)"
            text
            @click="close()"
          >
            <v-icon>mdi-close-box</v-icon>
          </v-btn>
        </template>
      </v-text-field>
      <ValidationObserver class="form-box" ref="observer" v-slot="{ validate, reset }">
        <v-form @submit.prevent="addConference">
          <v-textarea
            v-if="errorMessage"
            readonly
            error-messages="Please try again"
            label="Error"
            outlined
            v-model="errorMessage"
            height="100"
          ></v-textarea>
          <ValidationProvider v-slot="{ errors }" name="name" rules="required">
            <v-text-field
              @focus="reset()"
              prepend-icon="mdi-format-title"
              v-model="name"
              :error-messages="errors"
              :label="$t('conferenceName')"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="city" rules="required">
            <v-text-field
              @focus="reset()"
              prepend-icon="mdi-map-marker"
              v-model="city"
              :error-messages="errors"
              :label="$t('city')"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="country" rules="required">
            <v-text-field
              @focus="reset()"
              prepend-icon="mdi-earth"
              v-model="country"
              :error-messages="errors"
              :label="$t('country')"
              required
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="website" rules="required">
            <v-text-field
              @focus="reset()"
              prepend-icon="mdi-laptop"
              v-model="website"
              :error-messages="errors"
              :label="$t('website')"
              required
            ></v-text-field>
          </ValidationProvider>
          <v-row>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="startMenu"
                v-model="startMenu"
                :close-on-content-click="false"
                :return-value.sync="startDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    @focus="reset()"
                    v-model="startDate"
                    :label="$t('startDate')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title scrollable color="green lighten-1">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startMenu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.startMenu.save(startDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="endMenu"
                v-model="endMenu"
                :close-on-content-click="false"
                :return-value.sync="endMenu"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    @focus="reset()"
                    v-model="endDate"
                    :label="$t('endDate')"
                    prepend-icon="mdi-calendar-today"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" no-title scrollable color="blue darken-1">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="endMenu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.endMenu.save(endDate)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-menu
                ref="deadlineMenu"
                v-model="deadlineMenu"
                :close-on-content-click="false"
                :return-value.sync="deadline"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    @focus="reset()"
                    v-model="deadline"
                    :label="$t('deadline')"
                    prepend-icon="mdi-calendar-remove"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="deadline" no-title scrollable color="red darken-2">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="deadlineMenu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.deadlineMenu.save(deadline)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-combobox
            v-model="tags"
            :items="items"
            chips
            clearable
            :label="$t('tags')"
            multiple
            prepend-icon="mdi-tag-plus"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <strong>{{ item }}</strong>&nbsp;
              </v-chip>
            </template>
          </v-combobox>
          <ValidationProvider v-slot="{ errors }" name="file" rules="required">
            <v-file-input
              :rules="imageRules"
              required
              show-size
              accept="image/png, image/jpeg, image/bmp"
              :label="$t('addImage')"
              prepend-icon="mdi-camera"
              v-model="imageFile"
            ></v-file-input>
          </ValidationProvider>
          <v-btn color="primary" class="mr-4" type="addConference">{{$t('addConference')}}</v-btn>
        </v-form>
      </ValidationObserver>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, max } from 'vee-validate/dist/rules'
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from 'vee-validate'
import firebase from 'firebase'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'This field cannot be empty'
})

export default {
  name: 'AddConference',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: null,
    city: null,
    country: null,
    website: null,
    startDate: new Date().toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    deadline: new Date().toISOString().substr(0, 10),
    imageFile: null,
    startMenu: false,
    endMenu: false,
    deadlineMenu: null,
    errorMessage: null,
    success: false,
    error: false,
    tags: [],
    items: ['Mental Health', 'Healthy Eating', 'Tabacco', 'Physical Activity'],
    imageRules: [
      value =>
        !value ||
        value.size < 4000000 ||
        'Avatar size should be less than 4 MB!'
    ]
  }),
  methods: {
    addConference: function() {
      if (this.imageFile === null) {
        this.error = true
        this.errorMessage = 'An image is required'
        setTimeout(() => {
          this.error = false
          this.errorMessage = null
        }, 5000)
        return false
      }
      // check validation
      this.$refs.observer.validate()
      const confInfo = {
        name: this.name,
        city: this.city,
        country: this.country,
        website: this.website,
        startDate: this.startDate,
        endDate: this.endDate,
        deadline: this.deadline,
        tags: this.tags,
        image: this.imageFile
      }
      if (
        !this.errorMessage &&
        confInfo.name &&
        confInfo.city &&
        confInfo.country &&
        confInfo.website &&
        confInfo.image
      ) {
        try {
          // create a storage reference
          var newConfImageRef = firebase
            .storage()
            .ref()
            .child(`conferences/${confInfo.name}-${confInfo.startDate}`)

          var newConfImage = this.imageFile
          // upload the image file
          newConfImageRef.put(newConfImage).then(function(snapshot) {
            console.log('Image has been uploaded to storage')
          })
          // push conference data to conferences
          firebase
            .firestore()
            .collection('conferences')
            .doc(confInfo.name)
            .set({
              name: confInfo.name,
              city: confInfo.city,
              country: confInfo.country,
              website: confInfo.website,
              startDate: confInfo.startDate,
              endDate: confInfo.endDate,
              deadline: confInfo.deadline,
              tags: confInfo.tags,
              timeAdded: firebase.firestore.FieldValue.serverTimestamp(),
              // add the reference for the stored image to the document
              imageRef: newConfImageRef.fullPath
            })
            // the callback below only works with an arrow function, as it causes Vue to make "this" refer to the component instance
            .then(() => {
              // reset values
              this.success = true
              setTimeout(() => {
                this.success = false
              }, 8000)
              // reset validation
              this.$refs.observer.reset()
            })
            .catch(function(error) {
              console.error('Error writing document: ', error)
            })
        } catch (err) {
          this.errorMessage = err.message
        }
      }
    },
    reset() {
      this.error = false
      this.errorMessage = null
      this.success = false
    },
    close() {
      this.success = false
    },
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    }
  },
  watch: {}
}
</script>

<style>
.form-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80vh;
}
form {
  width: 100%;
  max-width: 500px;
}
#success {
  color: white;
}
#success-button {
  color: white;
}
</style>