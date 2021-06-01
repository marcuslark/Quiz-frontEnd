<template>

  <v-app id="inspire">
    <v-container>
      <div>
        <h1>My Profile</h1>
        <p>Your current level is based on how many times you have scored 10p</p>
        <p>Current level: {{ activeLevel }}</p>
        <p>Your name: {{ activeName }}</p>
        <p>Is the questions to hard or to easy?</p>
        <v-btn class="ma-2 white--text" color="blue" elevation="2" @click="downgradeLevel">Downgrade your level
          &#9660;
        </v-btn>
        <v-btn class="ma-2 white--text" color="blue" elevation="2" @click="upgradeLevel">Upgrade your level &#9650;
        </v-btn>
      </div>
    </v-container>
  </v-app>

</template>

<script>
import * as fb from "@/firebase";

export default {
  data() {
    return {
      activeLevel: 0,
      score: 0,
      highScore: 0,
      activeName: '',
    }
  },
  mounted() {
    console.log('i mounted, i MyProfile, userId: ' + fb.auth.currentUser.uid)

    console.log('*****ActivePlayerLevel*******')
    this.activeLevel = localStorage.getItem('ActivePlayerLevel')
    console.log(this.activeLevel)
    console.log('*****ActivePlayerLevel*******')
    this.activeName = localStorage.getItem('ActivePlayerName')
  },
  methods: {
    downgradeLevel() {
      this.$store.dispatch('updateProfile', {
        highScore: -1
      })
      this.activeLevel--
    },
    upgradeLevel() {
      this.$store.dispatch('updateProfile', {
        highScore: 10
      })
      this.activeLevel++
    }
  }
}

</script>
