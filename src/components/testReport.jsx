import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { quesConst } from "../constants";
import { getAnsweredChoices } from "../utils/questionsUtil";
import { cleanSession, getTestState } from "../utils/sessionManag";

const TestReport = () => {
  const [hrefFile, setHrefFile] = useState("");

  const history = useHistory();

  function takeTestAgain() {
    cleanSession();
    history.push("/register");
  }

  useEffect(() => {
    const answeredSheet = getTestState();

    let skillLevel;

    switch (parseInt(answeredSheet.skillLevel)) {
      case quesConst.beginner:
        skillLevel = "Beginner";
        break;
      case quesConst.intermediate:
        skillLevel = "Intermediate";
        break;
      case quesConst.advance:
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
    testReport["Your-Responses"] = answeredSheet["attempts"].map((ques) => {
      const answerInfo = getAnsweredChoices(ques);
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

    const json = JSON.stringify(testReport);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    setHrefFile(href);
  }, []);

  return (
    <div className="test-report-bg">
      <div className="test-report-container">
        <h2>Test report</h2>
        <a
          href={hrefFile}
          download={"TestReport.json"}
          target="_blank"
          rel="noopener noreferrer"
          id="download-link"
        >
          Download
        </a>
        <button onClick={takeTestAgain} className="test-again">
          Take test again
        </button>
      </div>
    </div>
  );
};

export default TestReport;
