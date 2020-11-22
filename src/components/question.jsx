import React from "react";
import PropTypes from "prop-types";

const Question = (props) => {
  const { title, multipleAns, choices } = props.ques;

  const { quesIndex } = props;

  const renderChoices = (choices, isMultiple) => {
    if (isMultiple) {
      return (
        <>
          {choices.map((choice, choiceIndex) => {
            return (
              <li key={`${choiceIndex}-${quesIndex}`}>
                <label htmlFor={`${choice["value"]}-${quesIndex}-id`}>
                  <input
                    id={`${choice["value"]}-${quesIndex}-id`}
                    className="option"
                    name={title + quesIndex}
                    type="checkbox"
                    value={quesIndex}
                    checked={choice["selected"]}
                    onChange={(e) =>
                      props.onCheckAnswer(quesIndex, choiceIndex, e)
                    }
                  />
                  {choice["value"]}
                </label>
              </li>
            );
          })}
        </>
      );
    } else {
      return (
        <>
          {choices.map((choice, choiceIndex) => {
            return (
              <li key={`${choiceIndex}-${quesIndex}`}>
                <label htmlFor={`${choice["value"]}-${quesIndex}-id`}>
                  <input
                    id={`${choice["value"]}-${quesIndex}-id`}
                    className="option"
                    name={title + quesIndex}
                    type="radio"
                    value={quesIndex}
                    checked={choice["selected"]}
                    onChange={(e) =>
                      props.onCheckAnswer(quesIndex, choiceIndex, e)
                    }
                  />
                  {choice["value"]}
                </label>
              </li>
            );
          })}
        </>
      );
    }
  };
  return (
    <div id="question-wrapper">
      <p id="question">{title}</p>
      <ul>{renderChoices(choices, multipleAns)}</ul>
    </div>
  );
};

Question.propTypes = {
  ques: PropTypes.shape({
    title: PropTypes.string.isRequired,
    multipleAns: PropTypes.bool.isRequired,
    choices: PropTypes.array.isRequired,
  }).isRequired,
  onCheckAnswer: PropTypes.func.isRequired,
  quesIndex: PropTypes.number.isRequired,
};

export default Question;
