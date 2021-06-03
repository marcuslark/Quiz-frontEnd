<template>
  <v-app id="inspire">
    <v-container>
      <v-card class="mx-auto my-12" max-width="600">
        <div>
          <v-chip v-if="difficulty === 'Difficulty: Easy'" color="green" text-color="white">
            {{ difficulty }}
          </v-chip>
          <v-chip v-else color="red" text-color="white"> {{ difficulty }}</v-chip>
          <p></p>
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
              <v-btn class="ma-2 white--text" tile outlined color="success" elevation="2" @click="restart">
                <v-icon left>mdi-cached</v-icon>
                Restart
              </v-btn>
              <div v-html="updateProfile()"></div>
            </div>

          </form>

          <p>score: {{ score }}</p>

          <div v-if="correctBool === true" class="rightAnswer">
            <v-chip color="green" outlined>{{ "Right Answer!" }}</v-chip>
          </div>
          <div v-else-if="correctBool === false" class="wrongAnswer">
            <v-chip color="red" outlined> {{ "Wrong Answer!" }}</v-chip>
            {{ correct }}
          </div>

        </div>
      </v-card>
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
      this.difficulty = 'Difficulty: Easy'
    }
    else{
      jsonFile = 'data/svar.json'
      console.log("Svår "  + this.activeLevel)
      this.difficulty = 'Difficulty: Hard'
    }
    fetch(jsonFile)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
        let currentIndex = data.questions.length, temporaryValue, randomIndex;
        
        // While there remain questions to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining question...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current question.
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
      c: '',
      radios: '',
      questions: [],
      score: 0,
      questionIndex: 10, // Start on question 10, so it only shows the remaining 10
      question: '',
      answer: "",
      correct: "",
      correctBool: '',
      answerChoices: [],
      activeLevel: 0,
      difficulty: ''
    }
  },
  methods: {
    submit() {
      const { answer, question, questions, questionIndex } = this;
      console.log('answer: ' + answer)
      if (answer === question.rightAnswer) {
        this.score++;
        this.correctBool = true;
        this.correct = this.question.rightAnswer;
        console.log('question.rightAnswer: ' + question.rightAnswer)
        console.log("Rätt svar");
      }
      else {
        this.correctBool = false;
        this.correct = this.question.rightAnswer;
        console.log('question.rightAnswer: ' + question.rightAnswer)
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
      console.log('score: ' + this.score)
      console.log('userId: ' + fb.auth.currentUser.uid)

        console.log('updateProfile körs')

        this.$store.dispatch('updateProfile', {
          highScore: this.score !== '' ? this.score : this.userProfile.score
        })

    },
 }
}
</script>