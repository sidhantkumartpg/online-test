import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styling/common.css";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../utils/sessionManag";
import { EXAM_TIME_IN_MIN, quesConst } from "../constants";
import Header from "./header";

const ExamInfo = () => {
  const [arrangeDetails, setArrangeDetails] = useState({
    terms: false,
  });

  const history = useHistory();

  function validateDetails() {
    let isValid = true;

    if (!arrangeDetails["skill-level"]) {
      toast.warn("Please choose a skill level!!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        toastId: "skill-level",
      });
      isValid = false;
    }
    if (!arrangeDetails["terms"]) {
      toast.warn("You must agree to the terms!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        toastId: "terms",
      });
      isValid = false;
    }

    return isValid;
  }

  function arrangeTest() {
    if (!validateDetails()) return;

    history.push({
      pathname: "/take-test",
      state: { skillLevel: arrangeDetails["skill-level"] },
    });
  }

  function handleChange(e) {
    let value;
    if (e.target.type === "checkbox") value = e.target.checked;
    else value = e.target.value;
    setArrangeDetails({ ...arrangeDetails, [e.target.name]: value });
  }

  function getConfigTime() {
    if (!EXAM_TIME_IN_MIN) {
      return 1;
    }
    return EXAM_TIME_IN_MIN;
  }

  return (
    <>
      <Header />
      <div className="exam-info content">
        {/* replace with utility method */}
        <p className="text-center">
          Hello{" "}
          <span className="username">
            <strong>{getUserInfo() ? getUserInfo().name : ""}</strong>
          </span>
        </p>
        <p>{`Let's have a look at examination information first`}</p>
        <ol>
          <li>This exam contains multiple choice questions</li>
          <li>
            Some questions may have <strong>multiple answers</strong> (from the
            choices given)
          </li>
          <li>
            Each question has <strong>score = 1</strong> for correct and{" "}
            <strong>0</strong> for incorrect
          </li>
          <li>There is no negative marking</li>
          <li>Questions will be according to the skill level choosen by you</li>
          <li>
            This exam will contain all the questions according to your choosen
            skill level
          </li>
          <li>
            Total time for the exam is{" "}
            <strong>{getConfigTime()} minutes</strong>
          </li>
        </ol>
        <br />
        <p>{"Attempting test instructions: "}</p>
        <ul className="exam-instructions">
          <li>
            You will get questions status summary at bottom of test screen
          </li>
          <li>
            Attempted: <span className="green-color box"></span> Not seen:{" "}
            <span className="grey-color box"></span> Seen but not attempted:{" "}
            <span className="yellow-color box"></span>
          </li>
          <li>
            You can submit the test anytime, if you have not attempted any of
            the question and attempt to submit, it will give you warning once
          </li>
        </ul>
        <br />
        <p>
          <strong>Note: </strong>Once the exam is started you{" "}
          <strong>
            should not close the tab or refresh the page, or it will start again
          </strong>
        </p>
        <div className="form-group">
          <input
            id="agree-terms"
            name="terms"
            type="checkbox"
            value="agree"
            onChange={handleChange}
            checked={arrangeDetails["terms"]}
          />
          <label htmlFor="agree-terms">
            I agree to all the terms and conditions
          </label>
        </div>
        <div className="centered form-group" id="skill-inputs-wrapper">
          <h4>Choose your skill level</h4>
          <label htmlFor="level1">
            <input
              className="select-level"
              id="level1"
              name="skill-level"
              type="radio"
              value={quesConst.BEGINNER}
              onChange={handleChange}
            />
            Beginner
          </label>
          <label htmlFor="level2">
            <input
              className="select-level"
              id="level2"
              name="skill-level"
              type="radio"
              value={quesConst.INTERMEDIATE}
              onChange={handleChange}
            />
            Intermediate
          </label>
          <label htmlFor="level3">
            <input
              className="select-level"
              id="level3"
              name="skill-level"
              type="radio"
              value={quesConst.ADVANCE}
              onChange={handleChange}
            />
            Advance
          </label>
        </div>

        <div className="centered">
          <button id="take-test-btn" onClick={arrangeTest}>
            Take test
          </button>
        </div>
      </div>
      <br />
      <br />
      <ToastContainer />
    </>
  );
};

export default ExamInfo;
