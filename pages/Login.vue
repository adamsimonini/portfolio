<template>
  <ValidationObserver class="form-box" ref="observer" v-slot="{ validate, reset }">
    <form>
      <ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
        <v-text-field v-model="email" :error-messages="errors" label="E-mail" required></v-text-field>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" name="password" rules="required">
        <v-text-field v-model="password" :error-messages="errors" label="password" required></v-text-field>
        <v-btn class="mr-4" @click="submit">login</v-btn>
      </ValidationProvider>
    </form>
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
    password: ''
  }),

  methods: {
    submit() {
      this.$refs.observer.validate()
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