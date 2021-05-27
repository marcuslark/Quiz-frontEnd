<template>
  <div class="about">
    <h1 v-html="logout()">Logout</h1>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
