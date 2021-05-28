
<template>

  <nav>
    <v-toolbar color="indigo">
      <v-toolbar-title class="text-uppercase black&#45;&#45;text">
        <span class="font-weight-bold">City </span>
        <span>Quiz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

        <v-btn color="orange" to="/">Home</v-btn>
        <v-btn color="orange" v-if="!checkIfLoggedIn()" to="/login">Log In</v-btn>
        <v-btn color="orange" v-if="checkIfLoggedIn()" to="/logout">Log Out</v-btn>
        <v-btn color="orange" to="/quiz">Quiz</v-btn>
        <v-btn color="orange" v-if="checkIfLoggedIn()" to="/myprofile">My Profile</v-btn>
        <v-btn color="orange" to="/highscore">High scores</v-btn>

    </v-toolbar>
  </nav>



</template>


<script>

import {firebase} from "@firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

 export default {
   name: 'Navbar',

  methods: {
    logout() {
      this.$store.dispatch('logout')
    },

    checkIfLoggedIn() {
      console.log('*******************checkIfLoggedIn*******************')
      const auth = firebase.auth().currentUser
      console.log('*******************auth******************* ' + auth)
      return !!auth;
    }
  }
}

</script>