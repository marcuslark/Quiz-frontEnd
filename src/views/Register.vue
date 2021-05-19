<template>
  <div class="register">
      <h1>Register</h1>
      <form @submit.prevent="Register">
        <input type="text" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <input type="submit" value="Register"/>
        <p>Have an account? <router-link to ="/login">Login Here</router-link></p>
      </form>
  </div>
</template>

<script>
import {ref} from 'vue'
import firebase from 'firebase';

export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(user => {
            alert(user);
          })
          .catch(err => alert(err.message));
    }

    return {
      Register,
      email,
      password
    }
  }
}
</script>

<style scoped>

</style>