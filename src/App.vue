<template>
  <v-app>

    <Navbar />

    <v-main>
      <router-view/>
    </v-main>

  </v-app>

</template>

<script>

import Navbar from '@/components/Navbar'


// <!--import {firebase} from "@firebase/app";-->
// <!--import 'firebase/auth';-->
// <!--import 'firebase/firestore'-->
//
export default {
  name: 'App',
  components: {Navbar}
}
//
// <!--  methods: {-->
// <!--    logout() {-->
// <!--      this.$store.dispatch('logout')-->
// <!--    },-->
//
// <!--    checkIfLoggedIn() {-->
// <!--      const auth = firebase.auth().currentUser-->
//
// <!--      if (auth) {-->
// <!--        return true-->
// <!--      } else {-->
// <!--        return false-->
// <!--      }-->
// <!--    },-->
// <!--  }-->
// <!--}-->
</script>
