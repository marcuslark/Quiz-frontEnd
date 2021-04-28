<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Log In</router-link> |
      <router-link to="/quiz">Quiz</router-link> |
      <router-link to="/highscore">High scores</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.home-img {
  width: 500px;
  height: auto;
}

.btn {
  border: none;
  border-radius: 3px;
  margin: auto 0;
  padding: .5rem .75rem;
  flex-shrink: 0;
  cursor: pointer;
  font-size: .9rem;
  letter-spacing: .5px;
  transition: all .1s ease-in;
}

.btn-primary {
  background: #6CB2EB;
  color: #fff;
}

.btn-primary:hover {
  background: #3490DC;
}

.btn-red {
  background: #EF5753;
  color: #fff;
}

.btn-red:hover {
  background: #E3342F;
  color: #fff;
}



</style>
