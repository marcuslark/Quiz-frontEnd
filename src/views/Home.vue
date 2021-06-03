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
  
  methods: {
    redirect() {
      this.$router.push('Quiz')
      .catch(error => {
        console.info(error)
      })
    },
  },
}
</script>


<style scoped>
.home-img {
  max-width: 80%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
