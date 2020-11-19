const json = require("./questionBank.json");

export function getAllQuestions(level) {
  if (!level) return json["questions"];

  var ques = json["questions"].filter((ques) =>
    ques.level.find((l) => l === parseInt(level))
  );

  return ques;
}

export function calculateTestReport(testAttempts) {
  console.log();
}

export function getSkillLevelName(skillLevel) {}

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

  let status = "Incorrect";

  if (correctAnsCount === answers.length) {
    status = "Correct";
  } else if (correctAnsCount > 0 && correctAnsCount < answers.length)
    status = "Partially correct";
  else status = "Incorrect";

  let score = correctAnsCount / answers.length;

  return { realAns, yourAns, isAnswered, status, score };
}
