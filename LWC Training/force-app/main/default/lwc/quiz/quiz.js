import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class Quiz extends LightningElement {
  @track
  questions = [
    {
      id: "question-1",
      question: "What is the capital of France?",
      answers: [
        { label: "London", value: "London" },
        { label: "Paris", value: "Paris" },
        { label: "Madrid", value: "Madrid" },
        { label: "Berlin", value: "Berlin" }
      ],
      rightAnswer: "Paris",
      selectedAnswer: "",
      isAnswerWrong: false
    },
    {
      id: "question-2",
      question: "Who wrote the play 'Romeo and Juliet'?",
      answers: [
        { label: "William Shakespeare", value: "William Shakespeare" },
        { label: "Charles Dickens", value: "Charles Dickens" },
        { label: "Jane Austen", value: "Jane Austen" },
        { label: "F. Scott Fitzgerald", value: "F. Scott Fitzgerald" }
      ],
      rightAnswer: "William Shakespeare",
      selectedAnswer: "",
      isAnswerWrong: false
    },
    {
      id: "question-3",
      question: "Who painted the 'Mona Lisa'?",
      answers: [
        { label: "Leonardo da Vinci", value: "Leonardo da Vinci" },
        { label: "Vincent van Gogh", value: "Vincent van Gogh" },
        { label: "Pablo Picasso", value: "Pablo Picasso" },
        { label: "Michelangelo", value: "Michelangelo" }
      ],
      rightAnswer: "Leonardo da Vinci",
      selectedAnswer: "",
      isAnswerWrong: false
    },
    {
      id: "question-4",
      question: "What is the largest planet in the Solar System?",
      answers: [
        { label: "Earth", value: "Earth" },
        { label: "Mars", value: "Mars" },
        { label: "Jupiter", value: "Jupiter" },
        { label: "Venus", value: "Venus" }
      ],
      rightAnswer: "Jupiter",
      selectedAnswer: "",
      isAnswerWrong: false
    },
    {
      id: "question-5",
      question: "What is the chemical symbol for the element oxygen?",
      answers: [
        { label: "O", value: "O" },
        { label: "Ox", value: "Ox" },
        { label: "Oi", value: "Oi" },
        { label: "Og", value: "Og" }
      ],
      rightAnswer: "O",
      selectedAnswer: "",
      isAnswerWrong: false
    }
  ];

  isQuizUnsubmitted = true;

  onSelectAnswer(event) {
    const selectedAnswer = event.detail.value;
    const answeredComboboxId = event.originalTarget.dataset.question;
    const answeredQuestionReference = this.questions.find(
      (question) => question.id === answeredComboboxId
    );

    const rightAnswer = answeredQuestionReference.rightAnswer;
    const isAnswerWrong = selectedAnswer !== rightAnswer;

    answeredQuestionReference.selectedAnswer = selectedAnswer;
    answeredQuestionReference.isAnswerWrong = isAnswerWrong;
  }

  get isSomeQuestionUnaswered() {
    const unasweredQuestions = this.questions.filter(
      (question) => question.selectedAnswer === ""
    );

    return unasweredQuestions.length !== 0;
  }

  onSubmitAnswers(event) {
    event.preventDefault();

    this.isQuizUnsubmitted = false;

    if (!this.isSomeAnswerWrong) {
      this.showCongratsToast();
    }
  }

  get isSomeAnswerWrong() {
    const isSomeAnswerWrong = this.questions.some(
      (question) => question.rightAnswer !== question.selectedAnswer
    );

    return isSomeAnswerWrong;
  }

  showCongratsToast() {
    const congratsToast = new ShowToastEvent({
      message: "Congrats! You got all the quiz questions right!",
      variant: "success"
    });

    this.dispatchEvent(congratsToast);
  }
}
