import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AnswerStatus, quesConst } from "../constants";
import { getAnsweredChoices, getAttemptCount } from "../utils/questionsUtil";
import {
  cleanSession,
  getTestState,
  isRegistered,
} from "../utils/sessionManag";
import MemoizedHeader from "./header";

const TestReport = () => {
  const [hrefFile, setHrefFile] = useState("");
  const [testSummary, setTestSummary] = useState({});

  const history = useHistory();

  function takeTestAgain() {
    cleanSession();
    history.push("/register");
  }

  useEffect(() => {
    const answeredSheet = getTestState();

    let skillLevel;

    switch (parseInt(answeredSheet.skillLevel)) {
      case quesConst.BEGINNER:
        skillLevel = "Beginner";
        break;
      case quesConst.INTERMEDIATE:
        skillLevel = "Intermediate";
        break;
      case quesConst.ADVANCE:
        skillLevel = "Advance";
        break;
      default:
        skillLevel = "Beginner";
    }

    let testReport = {
      "Test-Level": skillLevel,
      "Total-Score": 0,
      "Your-Responses": [],
    };

    testReport["Ques-Attempted"] = getAttemptCount(answeredSheet["attempts"]);
    testReport["Truly-Correct"] = 0;
    testReport["Partially-Correct"] = 0;
    testReport["Incorrect"] = 0;
    testReport["Your-Responses"] = answeredSheet["attempts"].map((ques) => {
      const answerInfo = getAnsweredChoices(ques);

      if (answerInfo.status === AnswerStatus.CORRRECT) {
        testReport["Truly-Correct"]++;
        answerInfo.status = "Truly correct";
      } else if (answerInfo.status === AnswerStatus.PARTIALLY_CORRECT) {
        testReport["Partially-Correct"]++;
        answerInfo.status = "Partially correct";
      } else {
        testReport["Incorrect"]++;
        answerInfo.status = "Incorrect";
      }

      testReport["Total-Score"] += answerInfo.score;
      return {
        Question: ques["title"],
        "Your-Answers": answerInfo.yourAns,
        "Correct-Answers": answerInfo.realAns,
        Answered: answerInfo.isAnswered ? "Yes" : "No",
        Status: answerInfo.status,
        Score: answerInfo.score,
      };
    });

    setTestSummary(testReport);

    const json = JSON.stringify(testReport);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    setHrefFile(href);
  }, []);

  return (
    <>
      <MemoizedHeader isRegistered={isRegistered()} />
      <div className="test-report-bg">
        <div className="test-report-container">
          <h2>Test result</h2>
          <div className="summary">
            <div className="row">
              <p className="label">Test Level:</p>
              <p>{testSummary["Test-Level"]}</p>
            </div>
            <div className="row">
              <p className="label">Your score:</p>
              <p>{testSummary["Total-Score"]}</p>
            </div>
            <div className="row">
              <p className="label">Max score:</p>
              <p>
                {Object.keys(testSummary).length > 0 &&
                  testSummary["Your-Responses"].length}
              </p>
            </div>
            <div className="row">
              <p className="label">Questions attempted:</p>
              <p>{testSummary["Ques-Attempted"]}</p>
            </div>
            <div className="row">
              <p className="label">Truly correct answers:</p>
              <p>{testSummary["Truly-Correct"]}</p>
            </div>
            <div className="row">
              <p className="label">Paritally correct answers:</p>
              <p>{testSummary["Partially-Correct"]}</p>
            </div>
            <div className="row">
              <p className="label">Incorrect answers:</p>
              <p>{testSummary["Incorrect"]}</p>
            </div>
          </div>
          <a
            href={hrefFile}
            download={"TestReport.json"}
            target="_blank"
            rel="noopener noreferrer"
            id="download-link"
          >
            Download test result
          </a>
          <button onClick={takeTestAgain} className="test-again">
            Take test again
          </button>
        </div>
      </div>
    </>
  );
};

export default TestReport;
