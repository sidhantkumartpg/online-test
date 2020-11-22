import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../styling/common.css";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo } from "../utils/sessionManag";
import { quesConst } from "../constants";
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

  return (
    <>
      <Header />
      <div className="exam-info content">
        {/* replace with utility method */}
        <p className="text-center">
          Hello <strong>{getUserInfo() ? getUserInfo().name : ""}</strong>
        </p>
        <p>{`Let's have a look at examination information first`}</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
          minus eos similique nam ipsum magnam sapiente facere exercitationem,
          nemo distinctio nobis adipisci recusandae tenetur incidunt fugiat quam
          nesciunt quod omnis?
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
      <ToastContainer />
    </>
  );
};

export default ExamInfo;
