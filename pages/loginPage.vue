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
        height=100
      ></v-textarea>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field
          prepend-icon="mdi-email"
          v-model="email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="password" rules="required">
        <v-text-field
          prepend-icon="mdi-lock"
          v-model="password"
          :error-messages="errors"
          label="password"
          :type="showPass ? 'text' : 'password'"
          required
          @click:append="showPass = !showPass"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        ></v-text-field>
        <v-btn class="mr-4" type="submit">login</v-btn>
      </ValidationProvider>
    </v-form>
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
  message: '{_field_} can not be empty'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
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
          this.$router.back()
        })
        .catch(error => {
          this.errorMessage = error.message
          this.error = true
        })
    }
  }
}
</script>

<style>
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}
form {
  width: 100%;
  max-width: 500px;
}
</style>