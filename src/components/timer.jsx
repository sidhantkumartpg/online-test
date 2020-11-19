import React, { Component } from "react";
import Timer from "react-timer-wrapper";
import Timecode from "react-timecode";

class CustomTimer extends Component {
  state = {};

  onTimerUpdate = ({ time, duration }) => {
    this.setState({
      time,
      duration,
    });
  };

  onFinish = () => {
    this.props.onTimeFinish();
  };

  render() {
    const { time, duration } = this.state;

    return (
      <div>
        <Timer
          active
          duration={10 * 60 * 100}
          onTimeUpdate={this.onTimerUpdate}
          onFinish={this.onFinish}
        />
        <Timecode time={duration - time} />
      </div>
    );
  }
}

export default CustomTimer;
