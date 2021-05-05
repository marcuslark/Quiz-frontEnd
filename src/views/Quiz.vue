<template>
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
      this.answer = "";
      this.questionIndex = 10;
      this.score = 0;
    },
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

</style>-->
