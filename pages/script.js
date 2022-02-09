class Question { //creation d'une class Question pour pouvoir creation simplement une question
    constructor(text, choices, answer) {// Une Question sera composer du text, des choices et une answer
      this.text = text;//la question posé
      this.choices = choices;//les choix de réponses
      this.answer = answer;// la réponse
    }
    isCorrectAnswer(choice) {// une fonction pour vérifer si le choix est la réponse
      return this.answer === choice;// renvoie True si la réponse de l'utilisateur est bonne sinon False
    }
  }
  let questions = [//tableau avec toutes les questions avec le text, les choix, la réponse
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
  
  class Quiz {//class pour le fonctionnement du Quiz
    constructor(questions) {
      this.score = 0;// le score (+1 si choix=réponse)
      this.questions = questions;// les questions
      this.currentQuestionIndex = 0;// la question acatuelle
    }
    getCurrentQuestion() {//la question affiché est la question acutelle
      return this.questions[this.currentQuestionIndex];
    }
    guess(answer) {//vérifier la réponse de l'utilisateur
      if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
        // vérifie si la question actuelle, le choix de l'utilisateur est la bonne réponse
        this.score++;// si True alors le score +1
      }
      this.currentQuestionIndex++;//on passe à la question suivante
    }
    hasEnded() {
      return this.currentQuestionIndex >= this.questions.length;
      //si la question actuelle est égale ou plus grand aux nombres de questions alors c'est fini
    }
  }
  // toutes les fonctions en rapport avec l'affichage (html)
  const display = {
    elementShown: function(id, text) {// fonction pour pouvoir implémenter un élement dans le html
      let element = document.getElementById(id);// l'id de l'élément implémenté
      element.innerHTML = text;// text = le text implémenté
    },
    endQuiz: function() {// Ce qui est affiché quand le quiz est terminé
      endQuizHTML = `
        <h1>Quiz terminé !</h1>
        <h1>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h1>`;
      this.elementShown("quest", endQuizHTML);//on remplace tout l'écran par endQuizHTML
    },
    question: function() {
      this.elementShown("question", quiz.getCurrentQuestion().text);//On affiche la question actuelle sur l'écran
    },
    score : function() {
        this.elementShown("score",`Score : ${quiz.score} / ${quiz.questions.length} `);// affiche le score
    },
    scorenot : function() {
        this.elementShown("score", ` `);//quand le quiz est fini enlèvele score (en haut à droite)
    },
    choices: function() {
      let choices = quiz.getCurrentQuestion().choices;
  
      guessHandler = (id, guess) => {
        document.getElementById(id).onclick = function() {//Quand l'utilisateur clique alors
          quiz.guess(guess);// interroger si la réponse est bonne
          quizApp();
        }
      }
      for(let i = 0; i < choices.length; i++) {// boucle for pour le faire à chaque question
        this.elementShown("choice" + i, choices[i]);
        guessHandler("guess" + i, choices[i]);
      }
    },
    progress: function() {// la progression
      let currentQuestionNumber = quiz.currentQuestionIndex + 1;
      //on ajoute 1 car dans le code le premier élément commence par 0
      this.elementShown("progress", "Question " + currentQuestionNumber + " sur " + quiz.questions.length);
    },
  };
  
  //Sert à afficher les choses en fonction que le quiz avance
  quizApp = () => {
    if (quiz.hasEnded()) {
      // si le jeux est fini alors
      display.endQuiz();
      display.scorenot();
    } else {// sinon le quiz se déroule
      display.question();//affichage des questions
      display.choices();//affichages des choix
      display.progress();// la progression (question actuelle)
      display.score();//affichages du score en direct
    } 
  }
  let quiz = new Quiz(questions);//Création du Quiz
  quizApp();
  
  //console.log(quiz); // suprimez les "//" devant console pour vérifier l'état du quiz
  
  
