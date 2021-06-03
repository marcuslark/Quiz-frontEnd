<template>
  <v-app>
    <v-col cols="12">
      <v-card rounded class="mx-auto mt-6" max-width="400">
        <v-list color="orange lighten-1" >
        <h1 class="text-center">High score Top 10</h1>
          <ol class="center">
          <li v-for="highScore in highScores" v-bind:key="highScore"> {{ highScore }} </li>
          </ol>
        </v-list>
      </v-card>
     </v-col>
  </v-app>
</template>


<script>

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
    let localStorageList = localStorage.getItem('HighScores')
    // console.log(localStorageList) // for debuggning

    this.tempArray = localStorageList.split(',', 11)
    this.highScores = this.tempArray.splice(1)
  }

}
</script>

<style scoped>

ol{
  font-size: 25px;
  margin: 40px;
  line-height: 50px;
}
.center
{
  list-style-position: inside;
}

@media screen and (min-width: 1200px){

  ol{
    font-size: 35px;
    margin: 40px;
    line-height: 65px;
  }
  .center
  {
    list-style-position: inside;
  }
}
</style>