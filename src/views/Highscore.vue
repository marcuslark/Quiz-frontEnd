<template>
  <div>
    <h1>High score Top 10</h1>
    <ol>
      <li v-for="highScore in highScores" v-bind:key="highScore"> {{ highScore }} </li>
    </ol>
<!--    <ul>
      <li v-for="user in user" v-bind:key="user.userId">{{ user.highScore }} {{ user.userName }}</li>
    </ul>-->
  </div>
</template>

<script>
/*import { createStore } from '@/store/index.js'*/


export default {
  name: 'Highscore',
  data() {
    return {
      highScores: [],
      tempArray: []
    }
  },
  async mounted() {
    console.log('i Highscore.vue i mounted')

    await this.$store.dispatch('fetchAllHighScores', {
      users: this.users !== '' ? this.users : this.highScores
    })
    console.log('*******mounted********')

    let localStorageList = localStorage.getItem('HighScores')
    console.log(localStorageList)

    this.tempArray = localStorageList.split(',', 11)
    console.log(this.tempArray)
    this.highScores = this.tempArray.splice(1)

    /*this.activePlayer = tempInput[0]
    this.highScores = tempInput[1]*/

    console.log('*******mounted********')
  }
  /*mounted() {
    fetch('http://127.0.0.1:3000/api/users/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.user);
          this.user = data.user;
        });
  }*/
}
</script>

<style scoped>

</style>