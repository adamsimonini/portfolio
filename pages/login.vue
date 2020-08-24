<template>
  <ValidationObserver class="form-box" ref="observer" v-slot="{ validate, reset }">
    <v-form @submit.prevent="submit">
      <v-textarea
        v-if="error"
        readonly
        error-messages="Please try again"
        label="Error"
        outlined
        v-model="errorMessage"
        height="100"
      ></v-textarea>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          prepend-icon="mdi-email"
          v-model="email"
          :error-messages="errors"
          :label="$t('email')"
          required
          @focus="reset()"
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="password"
          :error-messages="errors"
          :label="$t('password')"
          :type="showPass ? 'text' : 'password'"
          required
          @click:append="showPass = !showPass"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @focus="reset()"
        ></v-text-field>
        <v-btn color="primary" class="mr-4" type="submit">{{$t('login')}}</v-btn>
      </ValidationProvider>
    </v-form>
    <span>
      {{$t('accountDontHave')}}
      <v-btn @click="goToRegistration">{{$t('registerHere')}}</v-btn>
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
  message: 'Password cannot be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  name: 'Login',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    email: '',
    password: '',
    error: false,
    errorMessage: '',
    showPass: false
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
      const info = {
        email: this.email,
        password: this.password
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(info.email, info.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          this.errorMessage = error.message
          this.error = true
        })
    },
    goToRegistration() {
      this.$router.push('registration')
    },
    reset() {
      this.error = false
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