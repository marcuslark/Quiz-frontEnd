<template>
  <div id="login">
    <header>
      <button v-if="userState === 'default'" class="btn btn-primary-user" @click="changeUserState('edit')">Users
      </button>
      <button v-else class="btn btn-red-user" @click="changeUserState('default')">Back</button>

      <div id='container' style="margin:50px auto 0; width:250px;">
        <ejs-dropdownlist id='dropdownlist' :dataSource='usersData' placeholder='Select a game'></ejs-dropdownlist>
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
    <ul>
      <li v-for="user in user" v-bind:key="user.userId">{{ user.highScore }} {{ user.userName }}</li>
    </ul>

  </div>


</template>

<script>

import Vue from 'vue';
import {DropDownListPlugin} from "@syncfusion/ej2-vue-dropdowns";

Vue.use(DropDownListPlugin);

export default Vue.extend({
  name: "LogIn",
  data: function () {
    return {
      usersData: ['Marcus', 'Joakim', 'Hans'],
      userState: 'default',
      newUserName: '',
      user: [],
      formData: {
        userName: ''
      }
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
    }
  },
  components: {}
});
</script>

<style scoped>
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

<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
</style>