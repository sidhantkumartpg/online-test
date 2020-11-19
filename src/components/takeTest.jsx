import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllQuestions } from "../utils/questionsUtil.js";
import { hasGivenTest, saveTestState } from "../utils/sessionManag.js";
import Question from "./question.jsx";
import CustomTimer from "./timer.jsx";

const TakeTest = ({ location, history }) => {
  const [quesList, setQuesList] = useState([]);
  const [currentQues, setCurrentQues] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timesUp, setTimesUp] = useState(false);

  const quesCount = quesList.length;

  if (!location.state) {
    history.replace("/exam-info");
  } else if (location.state && hasGivenTest()) {
    history.replace("/test-report");
  }

  function mapToQuesModel(ques) {
    const { title, choices, multipleAns, answer } = ques;

    const mapChoices = choices.map((choice) => {
      return { value: choice, selected: false };
    });

    return {
      title,
      choices: mapChoices,
      multipleAns,
      state: { answered: false, seen: false },
      answer,
    };
  }

  function submitTest() {
    // prompt for confirmation
    // save responses to json
    setIsSubmitted(true);
    saveTestState(quesList, location.state.skillLevel, true);
  }

  function onTimeFinish() {
    setTimesUp(true);
    submitTest();
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
    const { state } = location;
    let questions = getAllQuestions(!state ? 1 : state.skillLevel);

    const quesConst = [];

    questions.forEach((q, index) => {
      const mappedQues = mapToQuesModel(q);
      // if (index === 0)
      //   mappedQues.state.seen = true;
      quesConst.push(mappedQues);
    });

    setQuesList(quesConst);
  }, [location]);

  useEffect(() => {
    const interval = setInterval(function () {
      console.log(quesList);
      saveTestState(quesList, location.state.skillLevel, false);
    }, 5000);

    return () => {
      clearInterval(interval);
      console.log("component-unmounted");
    };
  }, [quesList, location]);

  return !isSubmitted ? (
    <>
      <div id="test-container">
        <CustomTimer onTimeFinish={onTimeFinish} />
        {quesList.length > 0 && (
          <Question
            key={currentQues}
            ques={{ ...quesList[currentQues] }}
            onCheckAnswer={onCheckAnswer}
            quesIndex={currentQues}
          />
        )}
      </div>

      <button onClick={moveToPrev} disabled={currentQues === 0}>
        Prev
      </button>
      <button onClick={moveToNext} disabled={currentQues >= quesCount - 1}>
        Next
      </button>
      {currentQues >= quesCount - 1 && (
        <button type="button" onClick={submitTest}>
          Submit Test
        </button>
      )}
    </>
  ) : (
    <>
      <div id="test-container">
        <div id="question-wrapper">
          {timesUp ? <h2>Times up!</h2> : <h2>Good job!</h2>}
          <p id="submit-subtitle"> Your test is submitted successfully</p>
          <Link to="/test-report">Test analysis</Link>
        </div>
      </div>
    </>
  );
};

export default TakeTest;
