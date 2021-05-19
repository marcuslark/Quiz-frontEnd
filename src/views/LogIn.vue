<template>
  <div id="login">
    <header>

      <div :class="{ 'signup-form': !showLoginForm }" class="col2">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>
          <div class="col2">
            <label for="email1">Email</label>
            <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1" />
          </div>
          <div>
            <label for="password1">Password</label>
            <input v-model.trim="loginForm.password" type="password" placeholder="******" id="password1" />
          </div>
          <button @click="login()" class="button">Log In</button>

          <div class="extras">
            <a>Forgot Password </a>
            <a @click="toggleForm()">Create an Account</a>
          </div>
        </form>


        <form v-else @submit.prevent>
          <h1>Get Started</h1>
          <div>
            <label for="name">Name</label>
            <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name" />
          </div>
          <div>
            <label for="title">Title</label>
            <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title" />
          </div>
          <div>
            <label for="email2">Email</label>
            <input v-model.trim="signupForm.email" type="text" placeholder="you@email.com" id="email2" />
          </div>
          <div>
            <label for="password2">Password</label>
            <input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2" />
          </div>
          <button @click="signup()" class="button">Sign Up</button>
          <div class="extras">
            <a @click="toggleForm()">Back to Log In</a>
          </div>
        </form>
      </div>


      <button v-if="userState === 'default'" class="btn btn-primary-user" @click="changeUserState('edit')">Users
      </button>
      <button v-else class="btn btn-red-user" @click="changeUserState('default')">Back</button>

      <div id='container' style="margin:50px auto 0; width:250px;">
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
  </div>


</template>

<script>


export default {
  name: "LogIn",
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
      loginForm: {
        email: '',
        password: ''
      },
      // add signup form to data()
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true
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
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    },
    signup() {
      this.$store.dispatch('signup', {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
        title: this.signupForm.title
      })
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
      let tempInput = this.activePlayer.split(',')
      this.activePlayer = tempInput[0]
      this.dbHighScoreActivePlayer = tempInput[1]


      localStorage.setItem('dbHighScoreActivePlayer', this.dbHighScoreActivePlayer)
      console.log('LOCAL STORAGE dbHighScoreActivePlayer: ' + localStorage.getItem('dbHighScoreActivePlayer'))

      localStorage.setItem('activePlayer', this.activePlayer)
      console.log('LOCAL STORAGE activePlayer: ' + localStorage.getItem('activePlayer'))
    },
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    }
  },
  components: {}
};

</script>

