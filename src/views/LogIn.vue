<template>
  <div id="login">
    <header>
      <button v-if="userState === 'default'" class="btn btn-primary-user" @click="changeUserState('edit')">Users
      </button>
      <button v-else class="btn btn-red-user" @click="changeUserState('default')">Back</button>

      <div id='container' style="margin:50px auto 0; width:250px;">


<!--        <select v-model="dbHighScoreActivePlayer">
          <option v-for="user in user" v-bind:value="user.highScore" v-bind:key="user.userId">
             {{ user.highScore }}
          </option>
        </select>-->


        <select v-model="activePlayer" @click="setToLocalStorage">
          <option v-for="user in user" v-bind:value="user.userName + ', ' + user.highScore" v-bind:key="user.userId">
            {{ user.userName }}
          </option>
        </select>
        <br>
        <span>Player: {{ activePlayer }}</span>

      </div>

      <div v-if="userState === 'edit'">
        <form method="POST" id="formUser" class="new-user"
              @submit.prevent="postData('http://127.0.0.1:3000/api/users')">
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
    <!--    <ul>
          <li v-for="user in user" v-bind:key="user.userId">{{ user.highScore }} {{ user.userName }}</li>
        </ul>-->

  </div>


</template>

<script>


export default {
  name: "LogIn",
  /* props: [
       'activePlayer'
   ],*/
  data() {
    return {
      userState: 'default',
      newUserName: '',
      user: [],
      formData: {
        userName: ''
      },
      activePlayer: '',
      dbHighScoreActivePlayer: '',
      highScore: ''
    }
  },
  mounted() {
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

    async postData(url = '') {
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
        body: JSON.stringify({userName: this.formData.userName, highScore: 0}) // body data type must match "Content-Type" header
      });

      //return response.json();
      location.reload();
    },

    setToLocalStorage() {
      localStorage.setItem('dbHighScoreActivePlayer', this.dbHighScoreActivePlayer)
      console.log('LOCAL STORAGE dbHighScoreActivePlayer: ' + localStorage.getItem('dbHighScoreActivePlayer'))

      localStorage.setItem('activePlayer', this.activePlayer)
      console.log('LOCAL STORAGE activePlayer: ' + localStorage.getItem('activePlayer'))
    }
  },
  components: {}
};
</script>

<style scoped>
.container {
  color: black;
}

li {
  list-style: none;
}

.btn-primary-user {
  /*position: absolute;
  top: 0;
  right: 0;*/
  background: #6CB2EB;
}

.btn-primary-user:hover {
  background: #3490DC;
  color: #fff;
}

.btn-red-user {
  /*position: absolute;
  top: 0;
  right: 0;*/
  background: #EF5753;
}

.btn-red-user:hover {
  background: #E3342F;
  color: #fff;
}

.new-user {
  /*position: absolute;
  top: 0;
  right: 60px;*/
}

</style>