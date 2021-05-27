<template>
  <div>
    <h1>My Profile</h1>
    {{ activeLevel }}
  </div>

</template>

<script>
import * as fb from "@/firebase";

export default {
  data() {
    return {
      activeLevel: 0
    }
  },
  mounted() {
    console.log('i mounted, i MyProfile, userId: ' + fb.auth.currentUser.uid)

    console.log('*****ActivePlayerLevel*******')
    this.activeLevel = localStorage.getItem('ActivePlayerLevel')
    console.log(this.activeLevel)
    console.log('*****ActivePlayerLevel*******')
  }
}

</script>
