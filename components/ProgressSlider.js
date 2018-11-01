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
    const dotsPosition = ['0%', '19.5%', '26.5%', '33.2%', '40.1%', '46.7%', '53.5%'];
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
            height: 55rem;
            width: 7px;
            background: url('/static/images/timeline.svg');
            background-repeat: no-repeat;
            z-index: 1;
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
            transform: translate(-43%,-41%);
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default ProgressSlider;
