<template>
  <div class="home">
    <header>
    </header>
    <v-img class="home-img" alt="City Quiz" src="../assets/city-quiz.jpg"></v-img>
    <v-btn @click="redirect()"  class="ma-2 white--text" color="blue" elevation="2"
    :style="{left: '50%', transform:'translateX(-50%)'}"
    >Press Here To Continue</v-btn>
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
    redirect() {
      this.$router.push('Quiz')
    },
  },
}
</script>


<style scoped>
.btn-start {
  display: block;
  margin-left: auto;
  margin-right: auto;
  background-color: white; /* Green background */
  border: 1px solid green; /* Green border */
  color: white; /* White text */
  padding: 10px 24px; /* Some padding */
  cursor: pointer; /* Pointer/hand icon */
}
.home-img {
  max-width: 60%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

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
