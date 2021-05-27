<template>
  <v-app>

    <Navbar />

    <v-content>
      <router-view/>
    </v-content>

  </v-app>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Home |</router-link>
        <router-link v-if="!checkIfLoggedIn()" to="/login">Log In |</router-link>
        <router-link v-else to="/logout">Log Out |</router-link>
        <router-link to="/quiz">Quiz |</router-link>
        <router-link v-if="checkIfLoggedIn()" to="/myprofile">My Profile |</router-link>
        <router-link to="/highscore">High scores</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'


import {firebase} from "@firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

export default {
  name: 'App',
  components: {Navbar},

  methods: {
    logout() {
      this.$store.dispatch('logout')
    },

    checkIfLoggedIn() {
      const auth = firebase.auth().currentUser

      if (auth) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>
