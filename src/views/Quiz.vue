<template>
  <div>
    <div class="activePlayer">
      Player: {{ activePlayer }}
    </div>
    <form>
      <div v-if="questionIndex < questions.length">
        <img v-bind:src="question.img" class="img">
        <p></p>
        <label>{{ question.question }}</label>
        <div v-for="c of question.choices" :key="c">
          <input type="radio" name="choice" v-model="answer" :value="c" />
          {{ c }}
        </div>
      </div>
      <div v-else>
        <button type="button" @click="restart">restart</button>
        <button type="button" @click="addHighScore()">addHighScore</button>
      </div>
      <button type="button" @click="submit">check</button>
    </form>


    <p>score: {{ score }}</p>

    <div v-if="correctBool === true" class="rightAnswer">
    <p>{{"Right Answer!"}}</p>
    </div>
    <div v-else-if="correctBool === false" class="wrongAnswer">
    <p> {{"Wrong Answer!"}} </p>
      {{correct}}
    </div>

  </div>
</template>

<script>

export default {
  name: "quiz",

  mounted() {
    fetch('data/questions.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
        let currentIndex = data.questions.length, temporaryValue, randomIndex;
        
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = data.questions[currentIndex];
          data.questions[currentIndex] = data.questions[randomIndex];
          data.questions[randomIndex] = temporaryValue;

          this.answerChoices = data.questions[currentIndex].choices
          console.log('NOT Shuffled = ' + this.answerChoices)

          let newPos;
          let temp;
          for (let i = this.answerChoices.length -1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = this.answerChoices[i];
            this.answerChoices[i] = this.answerChoices[newPos];
            this.answerChoices[newPos] = temp;
          }
          console.log('Shuffled =  ' + this.answerChoices)
        }

      console.log(data.questions);
      this.question = data.questions[0]
      this.questions = data.questions;
      console.log('this.questions = ' + this.questions[0].question);

    })
  },
  data() {
    return {
      questions: [],
      score: 0,
      questionIndex: 10,
      question: '',
      answer: "",
      activePlayer: localStorage.getItem('activePlayer'),
      dbHighScoreActivePlayer: localStorage.getItem('dbHighScoreActivePlayer'),
      correct: "",
      correctBool: '',
      answerChoices: []
    }
  },
  methods: {
    submit() {
      const { answer, question, questions, questionIndex } = this;
      if (answer === question.rightAnswer) {
        this.score++;
        this.correctBool = true;
        this.correct = this.question.rightAnswer;
        console.log(question.rightAnswer)
        console.log("Rätt svar");
      }
      else {
        this.correctBool = false;
        this.correct = this.question.rightAnswer;
        console.log(question.rightAnswer)
        console.log("fel svar")

      }
      if (questionIndex < this.questions.length) {
        this.questionIndex++;
        this.question = { ...questions[this.questionIndex] };
      }
    },
    restart() {
      this.question = this.questions[0];
      this.answer = "";
      this.questionIndex = 10;
      this.score = 0;
    },
    addHighScore() {
      if (this.score > this.dbHighScoreActivePlayer) {
        this.putData('http://127.0.0.1:3000/api/users')
        console.log('this.putData() triggered')
      }
    },
    arrayShuffle(arr) {
      let newPos;
      let temp;
      for (let i = arr.length -1; i > 0; i--) {
        newPos = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
      }
      return arr;
    },
    async putData(url = '') {

      localStorage.setItem('highScore', this.score)
      console.log('LOCAL STORAGE : ' + localStorage.getItem('highScore'))

      await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({userName: localStorage.getItem('activePlayer'), highScore: localStorage.getItem('highScore')}) // body data type must match "Content-Type" header
      });

      localStorage.clear();
      //indexedDB.clear();
      //return response.json();
      location.reload();
  }
 }
}

</script>

<style scoped>
.question-data {
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
  border-bottom: 2px solid #ccc;
  padding: 20px;
}

.quest-icon {
  flex-grow: 1;
}

.question-stats {
  flex-grow: 8;
  text-align: left;
  padding-left: 20px;
}

.question-stats .location {
  font-size: 30px;
}

.question-temp {
  flex-grow: 1;
  font-size: 35px;
}

img {
  width: 70px;
}

button {
  padding:10px;
  background-color: #1aa832;
  color: white;
  border: 1px solid #ccc;
}

.rightAnswer{
  color: #1aa832;
}
.wrongAnswer{
  color: #E3342F;
}

.img{
/*  max-width: 100%;*/
/*  height: auto;*/
height: 335px;
width: 500px;
position: center;
}


</style>-->
