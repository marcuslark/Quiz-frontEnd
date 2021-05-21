<template>
  <div>
    <h1>High score</h1>

    <p>{{ test }}</p>
    <p>{{ user }}</p>
    <p>{{ users }}</p>
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
      user: [],
      test: 'test',
      users: []
    }
  },
  mounted() {
    console.log('i Highscore.vue i mounted')

    this.$store.dispatch('fetchAllHighScores', {
      users: this.users !== '' ? this.users : this.highScores
    })
    /*createStore.highScore*/
    console.log('*******mounted********')
    console.log(localStorage.getItem('Test'))
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