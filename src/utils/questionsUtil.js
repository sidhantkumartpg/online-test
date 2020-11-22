import { AnswerStatus } from "../constants";

const json = require("./questionBank.json");

export function getAllQuestions(level) {
  if (!level) return json["questions"];

  var ques = json["questions"].filter((ques) =>
    ques.level.find((l) => l === parseInt(level))
  );

  return ques;
}

function isQuestionAnswered(ques) {
  let ansCount = 0;

  ques.choices.forEach((choice) => {
    if (choice.selected) ansCount++;
  });

  return ansCount;
}

export function getAttemptCount(quesList) {
  let quesAttempt = 0;
  quesList.forEach((q) => {
    if (isQuestionAnswered(q)) quesAttempt++;
  });

  return quesAttempt;
}

export function getAnsweredChoices(answeredQues) {
  let realAns = [];
  let yourAns = [];
  let isAnswered = false;
  let correctAnsCount = 0;
  const answers = answeredQues.answer;

  answeredQues.choices.forEach((choice, index) => {
    if (answers.includes(index)) {
      realAns.push(choice.value);
      if (choice.selected) correctAnsCount++;
    }
    if (choice.selected) {
      yourAns.push(choice.value);
      isAnswered = true;
    }
  });

  let status = AnswerStatus.INCORRECT;

  if (correctAnsCount === answers.length) {
    status = AnswerStatus.CORRRECT;
  } else if (correctAnsCount > 0 && correctAnsCount < answers.length) {
    status = AnswerStatus.PARTIALLY_CORRECT;
  } else {
    status = AnswerStatus.INCORRECT;
  }

  let score = correctAnsCount / answers.length;

  return {
    realAns,
    yourAns,
    isAnswered,
    status,
    score,
  };
}
