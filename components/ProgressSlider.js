import React from 'react';
import throttle from 'lodash.throttle';

class ProgressSlider extends React.PureComponent {
  constructor(props) {
    super(props);

    Array(this.props.count).fill().forEach((item, index) => {
      this[`${index}Ref`] = React.createRef();
    });

    this.listContainerRef = React.createRef();

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
    const currentStepEl = this[`${this.props.progress}Ref`].current;
    const listContainerEl = this.listContainerRef.current;

    const currentStepInfo = currentStepEl ? currentStepEl.getBoundingClientRect() : {};
    const currentStepPosition = currentStepInfo.y || 0;
    const listContainerInfo = listContainerEl ? listContainerEl.getBoundingClientRect() : {};
    const listContainerPosition = listContainerInfo.y || 0;
    const currentStepRelativePosition = currentStepPosition - listContainerPosition;

    return currentStepRelativePosition || 0;
  }

  render() {
    const { count } = this.props;

    return (
      <ul
        ref={this.listContainerRef}
        className="ProgressSlider"
      >
        <div className="ProgressSlider__Active" style={{ top: this.state.currentStepPosition + 'px' }} />
        <div className="ProgressSlider__opacity">
          <div className="ProgressSlider__Line" />
          {Array(count).fill().map((item, index) => {
            return (
              <li
                key={index}
                ref={this[`${index}Ref`]}
                className="ProgressSlider__Item"
              />
            );
          })}
        </div>

        <style jsx>{`
          .ProgressSlider {
            position: relative;
            list-style: none;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            height: 100%;
            z-index: 1;
          }

          .ProgressSlider__opacity {
            opacity: .2;
          }

          .ProgressSlider__Line {
            position: absolute;
            height: 100%;
            left: 50%;
            background-color: #fff;
            width: 1px;
            transform: translateX(-50%);
          }

          .ProgressSlider__Item {
            position: relative;
            background-color: #fff;
            opacity: 1;
            width: 7px;
            min-width: 7px;
            height: 7px;
            min-height: 7px;
            border-radius: 50%;
            z-index: 1;
          }

          .ProgressSlider__Item + .ProgressSlider__Item {
            margin-top: 20px;
          }

          .ProgressSlider__Item:first-of-type {
            margin-bottom: 100px;
          }

          .ProgressSlider__Item:last-of-type {
            margin-top: 100px !important;
            margin-bottom: 70px
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
      </ul>
    );
  }
}

export default ProgressSlider;
