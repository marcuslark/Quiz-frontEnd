<template>
<!--  <div>
    <h1>Quiz questions</h1>

    <button v-on:click="checkQuestion">Check questions data</button>
    <div v-for="questionData in questions" :key="questionData.id" class="question-data">
      <div>
        <label>{{questionData.question}}</label>
        <label>{{questionData.rightAnswer}}</label>
      </div>
      <div v-for="c of questionData.choices" :key="c">
        <input type="radio" name="choice" v-model="answer" :value="c" />
          {{c}}
      </div>

    </div>
    <div >
      <button type="button" @click="restart">restart</button>
    </div>
    <div>
      <button type="button" @click="submit">check</button>
    </div>

    <p>Score: {{score}}</p>
  </div>-->

  <div>
    <form>

      <div v-if="questionIndex < questions.length">

        <label>{{ question.question }}</label>
        <div v-for="c of question.choices" :key="c">
          <input type="radio" name="choice" v-model="answer" :value="c" />
          {{ c }}
        </div>
      </div>

      <div v-else>

        <button type="button" @click="restart">restart</button>
      </div>
      <button type="button" @click="submit">check</button>
    </form>
    <p>score: {{ score }}</p>
  </div>

</template>

<script>
export default {
  name: "quiz",

  mounted() {
    fetch('data/data.json')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data.questions);
      this.questions = data.questions;
      console.log('this.questions = ' + this.questions);
    })
  },
  data() {
    return {
      questions: [],
      score: 0,
      questionIndex: 0,
      question: 'test',
      answer: "",

      /*questions: [],
      score: 0,
      //question: this.questions[0],
      answer: "",
      questionIndex: 0*/

    }
  },
  methods: {
    submit() {
      const { answer, question, questions, questionIndex } = this;
      if (answer === question.rightAnswer) {
        this.score++;
      }      if (questionIndex < this.questions.length) {
        this.questionIndex++;
        this.question = { ...questions[this.questionIndex] };
      }
    },
    restart() {
      this.question = this.questions[0];
      /*this.question = questions[0];*/
      this.answer = "";
      this.questionIndex = 0;
      this.score = 0;
    },
  }
  /*methods:{
      submit() {
        const {answer, question, questions, questionIndex,} = this;
        if (answer === question.rightAnswer) {
          this.score++;
        }
        if (questionIndex < questions.length) {
          this.questionIndex++;
          this.question = {...questions[this.questionIndex]};
        }
      },

      restart() {
        this.question = this.questions[0];
        this.answer = "";
        this.questionIndex = 0;
        this.score = 0;
      }
  }*/


}
</script>

<!--
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

</style>-->
