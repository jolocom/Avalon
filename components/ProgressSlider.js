import React from 'react';
import throttle from 'lodash.throttle';

class ProgressSlider extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentStepPosition: this.getCurrentStepPosition(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setCurrentStepPosition);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      this.setState({ currentStepPosition: this.getCurrentStepPosition() });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setCurrentStepPosition);
  }

  setCurrentStepPosition = () => {
    return throttle(
      () => this.setState({ currentStepPosition: this.getCurrentStepPosition() }),
      1500,
      { trailing: false }
    );
  }

  getCurrentStepPosition = () => {
    const dotsPosition = ['0%', '20%', '27%', '33.5%', '40.5%', '47%', '54%'];
    const currentStepPosition = dotsPosition[this.props.progress] || 0;

    return currentStepPosition || 0;
  }

  render() {
    return (
      <div className="ProgressSlider">
        <div className="ProgressSlider__Active" style={{ top: this.state.currentStepPosition }} />

        <style jsx>{`
          .ProgressSlider {
            position: relative;
            width: 10px;
            height: 100%;
            background: url('/static/images/timeline.svg');
            background-size: cover;
          }

          .ProgressSlider__Active {
            position: absolute;
            top: 0;
            background-image: url('/static/images/glow-checkbox.svg');
            background-size: cover;
            width: 51px;
            height: 51px;
            border-radius: 50%;
            transition: all 1s ease 0s;
            transform: translate(-42%, -42%);
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default ProgressSlider;
