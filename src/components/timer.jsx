import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { EXAM_TIME_IN_MIN } from "../constants";
import PropTypes from "prop-types";

const CustomTimer = (props) => {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onTimerUpdate = ({ time, duration }) => {
    setTime(time);
    setDuration(duration);
  };

  const onFinish = () => {
    props.onTimeFinish();
  };

  /**
   * This function returns the time configured in minutes
   */
  function getConfigTime() {
    if (!EXAM_TIME_IN_MIN) {
      return 1;
    }
    return EXAM_TIME_IN_MIN;
  }

  return (
    <div>
      <Timer
        active
        duration={getConfigTime() * 60 * 1000}
        onTimeUpdate={onTimerUpdate}
        onFinish={onFinish}
      />
      <Timecode time={duration - time} />
    </div>
  );
};

CustomTimer.propTypes = {
  onTimeFinish: PropTypes.func.isRequired,
};

export default CustomTimer;
