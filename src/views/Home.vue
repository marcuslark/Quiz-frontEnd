<template>
  <div class="home">
    <header>
    </header>

    <img class="home-img" alt="City Quiz" src="../assets/city-quiz.jpg">
<!--    <ul>
      <h2>Top 3 Highest Scores</h2>
      <li v-for="user in topThree" v-bind:key="user.userId" @load="topThreeHighScores">{{ user.highScore }} {{ user.userName }}</li>
    </ul>-->
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'Home',
  data() {
    return {
      userState: 'default',
      newUserName: '',
      topThree: [2]
    }
  },
 /* mounted(){
    fetch('http://127.0.0.1:3000/api/users/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.user);
          this.user = data.user

          let i;
          for (i = 0; i < 3; i++) {
            this.topThree.push(data.user[i]);
          }
        });
  },*/
  methods: {
    topThreeHighScores: function () {

    },
  },
  components: {
  }
}
</script>


<style scoped>
li {
  list-style: none;
}

.btn-primary-user {
  position: absolute;
  top: 0;
  right: 0;
  background: #6CB2EB;
}

.btn-primary-user:hover {
  background: #3490DC;
  color: #fff;
}

.btn-red-user {
  position: absolute;
  top: 0;
  right: 0;
  background: #EF5753;
}

.btn-red-user:hover {
  background: #E3342F;
  color: #fff;
}

.new-user {
  position: absolute;
  top: 0;
  right: 60px;
}
</style>
