<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Home |</router-link>
        <router-link v-if="!checkIfLoggedIn()" to="/login">Log In |</router-link>
        <router-link v-else to="/logout">Log Out |</router-link>
        <router-link to="/quiz">Quiz |</router-link>
        <router-link to="/highscore">High scores</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {firebase} from "@firebase/app";
import 'firebase/auth';
import 'firebase/firestore'

export default {
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.home-img {
  width: 500px;
  height: auto;
}

.btn {
  border: none;
  border-radius: 3px;
  margin: auto 0;
  padding: .5rem .75rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: .9rem;
  letter-spacing: .5px;
  transition: all .1s ease-in;
}

.btn-primary {
  background: #6CB2EB;
  color: #fff;
}

.btn-primary:hover {
  background: #3490DC;
}

.btn-red {
  background: #EF5753;
  color: #fff;
}

.btn-red:hover {
  background: #E3342F;
  color: #fff;
}

.activePlayer {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #E3342F;
  font-weight: 900;
}

</style>
