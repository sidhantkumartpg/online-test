import React, { useEffect, useState } from "react";
import { getAllQuestions } from "../utils/questionsUtil.js";
import { getUserInfo, setTestState } from "../utils/sessionManag.js";
import { writeTestResponse } from "../utils/testRespUtil.js";
import Question from "./question.jsx";
import CustomTimer from "./timer.jsx";

const TakeTest = (props) => {
  const [quesList, setQuesList] = useState([]);
  const [currentQues, setCurrentQues] = useState(0);

  const totalQuestion = quesList.length;

  if (!props.location.state) {
    props.history.replace("/exam-info");
  }

  const quesCount = quesList.length;

  function mapToQuesModel(ques) {
    const { title, choices, multipleAns } = ques;

    const mapChoices = choices.map((choice) => {
      return { value: choice, selected: false };
    });

    return {
      title,
      choices: mapChoices,
      multipleAns,
      state: { answered: false, seen: false },
    };
  }

  function submitTest() {
    // stop the timer
    // prompt for confirmation
    // save responses to json
    // navigate to test report screen
    // calculate score
    setTestState(quesList);
    props.history.replace("/test-report");
  }

  function onTimeFinish() {
    // save responses to json
    // navigate to test report screen
  }

  const onCheckAnswer = (quesIndex, choiceIndex, e) => {
    const selected = e.target.checked;

    if (e.target.type === "radio") {
      setQuesList([
        ...quesList.slice(0, quesIndex),
        {
          ...quesList[quesIndex],
          choices: [
            ...quesList[quesIndex]["choices"].slice(0, choiceIndex).map((q) => {
              return { ...q, selected: false };
            }),
            { ...quesList[quesIndex]["choices"][choiceIndex], selected: true },
            ...quesList[quesIndex]["choices"]
              .slice(choiceIndex + 1)
              .map((q) => {
                return { ...q, selected: false };
              }),
          ],
        },
        ...quesList.slice(quesIndex + 1),
      ]);
    } else {
      setQuesList([
        ...quesList.slice(0, quesIndex),
        {
          ...quesList[quesIndex],
          choices: [
            ...quesList[quesIndex]["choices"].slice(0, choiceIndex),
            {
              ...quesList[quesIndex]["choices"][choiceIndex],
              selected: selected,
            },
            ...quesList[quesIndex]["choices"].slice(choiceIndex + 1),
          ],
        },
        ...quesList.slice(quesIndex + 1),
      ]);
    }
  };

  function renderQuestion() {
    if (!quesList.length) return;
    else
      return (
        <Question
          key={currentQues}
          ques={{ ...quesList[currentQues] }}
          onCheckAnswer={onCheckAnswer}
          quesIndex={currentQues}
        />
      );
  }

  function moveToPrev() {
    const quesListConst = quesList;
    let isAnswered = false;
    if (
      quesList[currentQues].choices.filter((choice) => choice.selected)
        .length !== 0
    ) {
      isAnswered = true;
    }
    quesListConst[currentQues].state = {
      ...quesListConst[currentQues].state,
      answered: isAnswered,
      seen: true,
    };
    setQuesList(quesListConst);

    if (currentQues === 0) return;
    setCurrentQues(currentQues - 1);
  }

  function moveToNext() {
    const quesListConst = quesList;
    let isAnswered = false;
    if (
      quesList[currentQues].choices.filter((choice) => choice.selected)
        .length !== 0
    ) {
      isAnswered = true;
    }
    quesListConst[currentQues].state = {
      ...quesListConst[currentQues].state,
      answered: isAnswered,
      seen: true,
    };
    setQuesList(quesListConst);

    if (currentQues >= quesCount) return;
    setCurrentQues(currentQues + 1);
  }

  useEffect(() => {
    const { state } = props.location;
    let questions = getAllQuestions(!state ? 1 : state.skillLevel);

    const quesConst = [];

    questions.forEach((q, index) => {
      const mappedQues = mapToQuesModel(q);
      // if (index === 0)
      //   mappedQues.state.seen = true;
      quesConst.push(mappedQues);
    });

    setQuesList(quesConst);
  }, []);

  useEffect(() => {
    const interval = setInterval(function () {
      console.log(quesList);
      setTestState(quesList);
    }, 5000);

    return () => {
      clearInterval(interval);
      console.log("component-unmounted");
    };
  }, [quesList]);

  return (
    <>
      <div id="test-container">
        <CustomTimer />
        {renderQuestion()}
      </div>

      <button onClick={moveToPrev} disabled={currentQues === 0}>
        Prev
      </button>
      <button onClick={moveToNext} disabled={currentQues >= quesCount - 1}>
        Next
      </button>
      {currentQues >= quesCount - 1 && (
        <button type="button" onClick={submitTest}>
          Submit
        </button>
      )}
    </>
  );
};

export default TakeTest;
