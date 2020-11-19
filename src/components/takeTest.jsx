import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { getAllQuestions, getAttemptCount } from "../utils/questionsUtil.js";
import { hasGivenTest, saveTestState } from "../utils/sessionManag.js";
import Question from "./question.jsx";
import CustomTimer from "./timer.jsx";
import "react-confirm-alert/src/react-confirm-alert.css";

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
    setIsSubmitted(true);
    saveTestState(quesList, location.state.skillLevel, true);
  }

  function handleSubmit() {
    // prompt for confirmation
    // save responses to json

    const attemptCount = getAttemptCount(quesList);

    if (attemptCount < quesCount)
      confirmAlert({
        title: "Submit test",
        message: `You have not attempted ${
          quesCount - attemptCount
        } questions. Still want to submit ?`,
        buttons: [
          {
            label: "Yes",
            onClick: () => submitTest(),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
    else {
      submitTest();
    }
  }

  function onTimeFinish() {
    setTimesUp(true);
    submitTest();
  }

  function othersAnswered(choices, currentChoice) {
    return choices.filter((ch, index) => index !== currentChoice && ch.selected)
      .length;
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
          state: {
            ...quesList[quesIndex].state,
            answered: true,
          },
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
          state: {
            ...quesList[quesIndex].state,
            answered:
              othersAnswered(quesList[quesIndex].choices, choiceIndex) ||
              selected,
          },
        },
        ...quesList.slice(quesIndex + 1),
      ]);
    }
  };

  function moveToPrev() {
    const quesListConst = quesList;

    quesListConst[currentQues].state = {
      ...quesListConst[currentQues].state,
      seen: true,
    };
    setQuesList(quesListConst);

    if (currentQues === 0) return;
    setCurrentQues(currentQues - 1);
  }

  function moveToNext() {
    const quesListConst = quesList;

    quesListConst[currentQues].state = {
      ...quesListConst[currentQues].state,
      seen: true,
    };
    setQuesList(quesListConst);

    if (currentQues >= quesCount) return;
    setCurrentQues(currentQues + 1);
  }

  function navigateToQues(quesNo) {
    const quesListConst = quesList;
    quesListConst[currentQues].state = {
      ...quesListConst[currentQues].state,
      seen: true,
    };
    quesListConst[quesNo].state = {
      ...quesListConst[quesNo].state,
      seen: true,
    };
    setCurrentQues(quesNo);
  }

  function getQuesState(ques, quesNo) {
    if (currentQues === quesNo) return "current";
    else if (ques.state.answered) return "answered";
    else if (ques.state.seen) return "seen";
    else return "unseen";
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
        <div id="timer-area">
          <CustomTimer onTimeFinish={onTimeFinish} />
        </div>
        <div id="question-area">
          <button
            onClick={moveToPrev}
            disabled={currentQues === 0}
            className="navigate-ques prev"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          {quesList.length > 0 && (
            <Question
              key={currentQues}
              ques={{ ...quesList[currentQues] }}
              onCheckAnswer={onCheckAnswer}
              quesIndex={currentQues}
            />
          )}
          <button
            onClick={moveToNext}
            disabled={currentQues >= quesCount - 1}
            className="navigate-ques next"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="attempt-summary">
          {quesList.map((ques, quesNo) => (
            <button
              className={`navigate-ques-${getQuesState(ques, quesNo)}`}
              onClick={() => navigateToQues(quesNo)}
              key={quesNo}
            >
              {quesNo + 1}
            </button>
          ))}
        </div>
        {currentQues >= quesCount - 1 && (
          <button
            type="button"
            onClick={handleSubmit}
            className="submit-test-btn"
          >
            Submit Test
          </button>
        )}
      </div>
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
