<template>
  <div class="home">
    <header>
      <button v-if="userState === 'default'" class="btn btn-primary-user" @click="changeUserState('edit')">Users</button>
      <button v-else class="btn btn-red-user" @click="changeUserState('default')">Back</button>
      <div v-if="userState === 'edit'">
        <form method="POST" id="formUser" class="new-user" @submit.prevent="postData('http://127.0.0.1:3000/api/users')">
        <div>
        <input type="text" id="userName" name="userName" v-model="formData.userName">
          <input
            type="submit"
            class="btn btn-primary"
            value="Add"
            placeholder="New User"
            >
       </div>
         </form>
          </div>
    </header>

    <img class="home-img" alt="City Quiz" src="../assets/city-quiz.jpg">
    <HelloWorld msg="Welcome to Our City Quiz App!"/>
    <ul>
      <h2>Top 3 Highest Scores</h2>
      <li v-for="user in user" v-bind:key="user.userId">{{ user.highScore }} {{ user.userName }}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      userState: 'default',
      newUserName: '',
      user: [],
      formData: {
        userName: ''
      }
    }
  },
  async created() {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: '',
        highScore: 0,
        userId: 0
      })
    };
    const response = await fetch('http://127.0.0.1:3000/api/users/', requestOptions);
    const data = await response.json();
    this.userName = data.userName;
  },
  mounted(){
    fetch('http://127.0.0.1:3000/api/users/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.user);
          this.user = data.user;
        });
  },
  methods: {
    changeUserState: function (newUserState) {
      this.userState = newUserState
    },

    async postData(url='') {
        await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({userName:this.formData.userName, highScore:0}) // body data type must match "Content-Type" header
      });
      //return response.json();
      location.reload();
    }
  },
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
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
