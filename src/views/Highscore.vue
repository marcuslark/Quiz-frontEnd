<template>
  <div>
    <h1>High score</h1>

<!--    <ul>
      <li v-for="user in user" v-bind:key="user.userId">{{ user.highScore }} {{ user.userName }}</li>
    </ul>-->
  </div>
</template>

<script>
export default {
  name: 'Highscore',
  data() {
    return {
      user: []
    }
  },
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