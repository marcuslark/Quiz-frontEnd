<template>
  <div class="home">
    <header>
    </header>

    <img class="home-img" alt="City Quiz" src="../assets/city-quiz.jpg">

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
