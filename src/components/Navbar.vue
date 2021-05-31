
<template>

  <nav>
    <v-toolbar color="indigo">
      <v-app-bar-nav-icon v-if="mobile" class="orange--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase black&#45;&#45;text">
        <span class="font-weight-bold">City </span>
        <span>Quiz</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn v-if="!mobile" color="orange" to="/">Home</v-btn>
        <v-btn color="orange" v-if="!checkIfLoggedIn() && !mobile" to="/login">Log In</v-btn>
        <v-btn color="orange" v-if="checkIfLoggedIn() && !mobile" to="/logout">Log Out</v-btn>
        <v-btn v-if="!mobile" color="orange" to="/quiz">Quiz</v-btn>
        <v-btn color="orange" v-if="checkIfLoggedIn() && !mobile" to="/myprofile">My Profile</v-btn>
        <v-btn v-if="!mobile" color="orange" to="/highscore">High scores</v-btn>
    </v-toolbar>

    <v-navigation-drawer v-if="mobile" v-model="drawer" app class="secondary">
      <v-list v-if="!checkIfLoggedIn()">
        <v-list-item v-for="link in linksLogin" :key="link.text" router :to="link.route">
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="checkIfLoggedIn()">
        <v-list-item v-for="link in linksLogout" :key="link.text" router :to="link.route">
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  </nav>

</template>

<script>

import {firebase} from "@firebase/app"
import 'firebase/auth'
import 'firebase/firestore'

 export default {
   data: () => ({
     name: 'Navbar',
     drawer: false,
     linksLogin: [
       { text: 'Home', route: '/'},
       { text: 'Log In', route: '/login'},
       { text: 'Quiz', route: '/quiz'},
       { text: 'High scores', route: '/highscore'},
     ],
     linksLogout: [
       { text: 'Home', route: '/'},
       { text: 'Log Out', route: '/logout'},
       { text: 'Quiz', route: '/quiz'},
       { text: 'My Profile', route: '/myprofile'},
       { text: 'High scores', route: '/highscore'},
     ]

   }),

   computed: {
     mobile() {
       return this.$vuetify.breakpoint.mobile
     },
   },

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