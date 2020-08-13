<template>
  <ValidationObserver class="form-box" ref="observer" v-slot="{ validate, reset }">
    <v-form @submit.prevent="submit">
      <v-textarea
        v-if="errorMessage"
        @focus="reset()"
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
          prepend-icon="mdi-account"
          v-model="name"
          :error-messages="errors"
          label="First & Last Name"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="division" rules="required">
        <v-select
          @focus="reset()"
          prepend-icon="mdi-folder-account"
          v-model="selectedDivision"
          :items="divisions"
          :error-messages="errors"
          label="Division"
          required
        ></v-select>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          @focus="reset()"
          prepend-icon="mdi-email"
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>
      <!-- PASSWORD ONE -->
      <ValidationProvider v-slot="{ errors }" name="passwordOne" rules="required">
        <v-text-field
          @focus="reset()"
          prepend-icon="mdi-lock"
          v-model="passwordOne"
          :error-messages="errors"
          label="Password"
          :type="showPassOne ? 'text' : 'password'"
          required
          @click:append="showPassOne = !showPassOne"
          :append-icon="showPassOne ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>
      </ValidationProvider>
      <!-- PASSWORD TWO -->
      <ValidationProvider v-slot="{ errors }" name="passwordTwo" rules="required">
        <v-text-field
          @focus="reset()"
          prepend-icon="mdi-lock"
          v-model="passwordTwo"
          :error-messages="errors"
          label="Repeat Password"
          :type="showPassTwo ? 'text' : 'password'"
          required
          @click:append="showPassTwo = !showPassTwo"
          :append-icon="showPassTwo ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>
      </ValidationProvider>
      <v-btn :disabled=error class="mr-4" type="submit">Register</v-btn>
    </v-form>
    <span>
      Already have an account?
      <v-btn @click="goToLogin">Sign In Here</v-btn>
    </span>
  </ValidationObserver>
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

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  name: "Registration",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    name: null,
    selectedDivision: null,
    divisions: [
      'Global Health & Guidlines',
      'Partnerships & Strategies',
      'Prevention Guidelines',
      'Social Determinants of Health'
    ],
    email: null,
    passwordOne: null,
    passwordTwo: null,
    showPassOne: false,
    showPassTwo: false,
    errorMessage: null,
    error: false,
  }),
  methods: {
    submit() {
      this.$refs.observer.validate()
      const info = {
        name: this.name,
        division: this.division,
        email: this.email,
        password: this.passwordOne
      }
      if (!this.errorMessage) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(info.email, info.password)
          .then(userCredentials => {
            firebase.auth().currentUser.updateProfile({
              displayName: this.name
            })
            this.$router.push('/')
          })
          .catch(error => {
            this.errorMessage = error.message
            this.error = true
          })
      }
    },
    goToLogin() {
      this.$router.push('loginPage')
    },
    reset() {
      this.error = false
    }
  },
  watch: {
    passwordTwo: function() {
      if (
        this.passwordOne !== '' &&
        this.passwordTwo !== '' &&
        this.passwordTwo !== this.passwordOne
      ) {
        this.errorMessage = 'Passwords must match'
      } else {
        this.errorMessage = null
      }
    }
  }
}
</script>

<style>
.form-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
}
form {
  width: 100%;
  max-width: 500px;
}
</style>