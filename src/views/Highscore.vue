<template>
  <div>
    <h1>High score Top 10</h1>
    <ol>
      <li v-for="highScore in highScores" v-bind:key="highScore"> {{ highScore }} </li>
    </ol>
  </div>
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
    console.log('*******mounted********')

    let localStorageList = localStorage.getItem('HighScores')
    console.log(localStorageList)

    this.tempArray = localStorageList.split(',', 11)
    console.log(this.tempArray)
    this.highScores = this.tempArray.splice(1)

    console.log('*******mounted********')
  }

}
</script>

<style scoped>

</style>