<template>

  <v-app id="inspire">
    <v-container>
      <v-row>
        <v-col  >
<!--    <v-card :loading="loading" class="mx-auto my-12" max-width="600">-->
        <v-card class="mx-auto my-12" max-width="600">
  <div>
    <div class="activePlayer">
    </div>
    <form>
      <div v-if="questionIndex < questions.length">
        <v-img
            v-bind:src="question.img"
            max-height="400"
            max-width="600"
        ></v-img>
        <p></p>
        <v-flex>
              <p class="text-wrap">
                {{ question.question }}
              </p>
        </v-flex>

        <v-divider class="mx-4"></v-divider>

<!--        <div v-for="c of question.choices" :key="c">-->
<!--          <input type="radio" name="choice" v-model="answer" :value="c" />-->
<!--            {{ c }}-->
<!--        </div>-->

        <v-radio-group v-model="answer" :value="c">
          <v-radio
              color="blue"
              v-for="c of question.choices"
              :key="c"
              :label="`${c}`"
              :value="c"
          ></v-radio>
        </v-radio-group>

        <v-btn class="ma-2 white--text" color="blue" elevation="2" @click="submit">check</v-btn>
      </div>
      <div v-else-if="questionIndex === questions.length">
<!--        <v-btn class="ma-2 white--text" color="success" elevation="2" @click="restart">restart</v-btn>-->
        <v-btn class="ma-2 white--text" tile outlined color="success" elevation="2" @click="restart">
          <v-icon left>mdi-cached</v-icon> Restart
        </v-btn>
        <div v-html="updateProfile()"></div>
      </div>

    </form>

    <p>score: {{ score }}</p>

    <div v-if="correctBool === true" class="rightAnswer">
    <v-chip color = "green" outlined>{{"Right Answer!"}}</v-chip>
    </div>
    <div v-else-if="correctBool === false" class="wrongAnswer">
    <v-chip color = "red" outlined> {{"Wrong Answer!"}} </v-chip>
      {{correct}}
    </div>

  </div>
    </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import * as fb from "@/firebase";
let jsonFile = '';

export default {
  name: "quiz",

  mounted() {
    this.activeLevel = localStorage.getItem('ActivePlayerLevel')
    if (this.activeLevel < 2) {
      jsonFile = 'data/questions.json'
      console.log("Lätt "  + this.activeLevel)
    }
    else{
      jsonFile = 'data/svar.json'
      console.log("Svår "  + this.activeLevel)
    }
    fetch(jsonFile)
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

          let newPos;
          let temp;
          for (let i = this.answerChoices.length -1; i > 0; i--) {
            newPos = Math.floor(Math.random() * (i + 1));
            temp = this.answerChoices[i];
            this.answerChoices[i] = this.answerChoices[newPos];
            this.answerChoices[newPos] = temp;
          }
        }

      this.question = data.questions[0]
      this.questions = data.questions;

    })
  },
  data() {
    return {
      // loading: '',
      c: '',
      radios: '',
      questions: [],
      score: 0,
      questionIndex: 10,
      question: '',
      answer: "",
      //activePlayer: localStorage.getItem('activePlayer'),
      //dbHighScoreActivePlayer: localStorage.getItem('dbHighScoreActivePlayer'),
      correct: "",
      correctBool: '',
      answerChoices: [],
      activeLevel: 0
    }
  },
  methods: {
    submit() {
      const { answer, question, questions, questionIndex } = this;
      console.log('------------question.rightAnswer: ' + question.rightAnswer)
      console.log('------------answer: ' + answer)
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
    updateProfile() {
      /*console.log(this.$store.fb.auth.currentUser.highScore)*/
      console.log('score: ' + this.score)
      console.log('userId: ' + fb.auth.currentUser.uid)

        console.log('updateProfile körs')

        this.$store.dispatch('updateProfile', {
          highScore: this.score !== '' ? this.score : this.userProfile.score
        })

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
 }
}

</script>

<!--<style scoped>
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
