class Question {
    constructor(text, choices, answer) {
      this.text = text;
      this.choices = choices;
      this.answer = answer;
    }
    isCorrectAnswer(choice) {
      return this.answer === choice;
    }
  }
  let questions = [
    new Question("Parmis ces waifus, laquelle est dans l'anime Sword art online", ["Mai Sakurajima", "Zero Two", "Rem", "Asuna Yuuki"], "Asuna Yuuki"),
    new Question("Dans quel épisode Zoro rejoint-il Luffy ?", ["Episode 1","Episode 2", "Episode 3", "Episode 4"], "Episode 3"),
    new Question("Quelle est l'expression favorite de Naruto ?", ["Oh ma gâté !","Le J c'est le S", "Dattebayo", "Skusku !"], "Dattebayo"),
    new Question("Dans quel épisode voit-on pour la première fois les yeux de Satoru Gojo ?", ["Épisode 6","Épisode 7", "Épisode 8", "Épisode 9"], "Épisode 7"),
    new Question("Enfin, quelle est la raison de l'alliance entre Luffy et Trafalgar Law ? ", ["Pour vaincre les 4 Empereurs","Pour vaincre la Marine","Pour agrandir leurs équipages", "Pour s'amuser"], "Pour vaincre les 4 Empereurs"),
    new Question("Par qui Vegeta a-t-il été tué ? ", ["Par Buu","Par Raditz", "Par Cell", "Par Freezer"], "Par Freezer"),
    new Question("Combien de temps dura la 4ème grande guerre ninja ? (Naruto)", ["10 jours","1 semaine", "4 jours", "2 jours"], "2 jours"),
    new Question("Qui tua Madara lors de la 4ème grande guerre ninja ? ", ["Kaguya","Zetsu", "Tobi", "Naruto et Sasuke"], "Zetsu"),
    new Question("Charlotte Katakuri est le combien-tième fils de la famille Charlotte ?", ["1er","2ème", "3ème", "4ème"], "2ème"),
    new Question("Durant le tournoi en équipes opposant la seconde A et la seconde B, combien de matchs ont lieu ? ", ["3","4", "5", "6"], "5"),
    new Question("Qui a dit « Avec de l'entrainement, même un raté peut devenir un génie ! »", ["Jiraya","Rock Lee", "Gaï", "Naruto"], "Rock Lee")
  ];
  
  console.log(questions);
  
  class Quiz {
    constructor(questions) {
      this.score = 0;
      this.questions = questions;
      this.currentQuestionIndex = 0;
    }
    getCurrentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        this.score++;
      }
      this.currentQuestionIndex++;
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
    }
  }
  
  // Regroup all  functions relative to the App Display
  const display = {
    elementShown: function(id, text) {
      let element = document.getElementById(id);
      element.innerHTML = text;
    },
    endQuiz: function() {
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h1>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h1>`;
      this.elementShown("quest", endQuizHTML);
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);
    },
    score : function() {
        this.elementShown("score",`Score : ${quiz.score} / ${quiz.questions.length} `);
    },
    scorenot : function() {
        this.elementShown("score", ` `);
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {
          quiz.guess(guess);
          quizApp();
        }
      }
      // display choices and handle guess
      for(let i = 0; i < choices.length; i++) {
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  // Game logic
  quizApp = () => {
    if (quiz.hasEnded()) {
      display.endQuiz();
      display.scorenot();
    } else {
      display.question();
      display.choices();
      display.progress();
      display.score();
    } 
  }
  // Create Quiz
  let quiz = new Quiz(questions);
  quizApp();
  
  console.log(quiz);
  
  
