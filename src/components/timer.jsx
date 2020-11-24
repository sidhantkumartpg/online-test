import React, { useState } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";
import { EXAM_TIME_IN_MIN } from "../constants";

const CustomTimer = () => {
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const onTimerUpdate = ({ time, duration }) => {
    setTime(time);
    setDuration(duration);
  };

  const onFinish = () => {
    this.props.onTimeFinish();
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

export default CustomTimer;

// class CustomTimer extends Component {
//   state = {};

//   onTimerUpdate = ({ time, duration }) => {
//     this.setState({
//       time,
//       duration,
//     });
//   };

//   onFinish = () => {
//     this.props.onTimeFinish();
//   };

//   render() {
//     const { time, duration } = this.state;

//     return (
//       <div>
//         <Timer
//           active
//           duration={10 * 60 * 1000}
//           onTimeUpdate={this.onTimerUpdate}
//           onFinish={this.onFinish}
//         />
//         <Timecode time={duration - time} />
//       </div>
//     );
//   }
// }

// export default CustomTimer;
