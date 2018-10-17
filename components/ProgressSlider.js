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
    window.addEventListener('resize', throttle(this.setCurrentStepPosition, 1500, { trailing: false }));
  }
  getSnapshotBeforeUpdate(prevProps) {
    if (prevProps.progress !== this.props.progress) {
      return this.getCurrentStepPosition();
    }
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.setState({ currentStepPosition: snapshot });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', throttle(this.setCurrentStepPosition, 1500, { trailing: false }));
  }

  setCurrentStepPosition = () => {
    this.setState({ currentStepPosition: this.getCurrentStepPosition() });
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
      <div className="ProgressSlider">
        <ul
          ref={this.listContainerRef}
          className="ProgressSlider__Items"
        >
          <div className="ProgressSlider__Line" />
          <div className="ProgressSlider__Active" style={{ top: this.state.currentStepPosition + 'px' }} />
          {Array(count).fill().map((item, index) => {
            return (
              <li
                key={index}
                ref={this[`${index}Ref`]}
                className="ProgressSlider__Item"
              />
            );
          })}
        </ul>

        <style jsx>{`
          .ProgressSlider {
            display: inline-block;
          }

          .ProgressSlider__Line {
            position: absolute;
            height: 100%;
            left: 50%;
            background-color: #fff;
            opacity: .2;
            width: 1px;
            transform: translateX(-50%);
          }

          .ProgressSlider__Items {
            position: relative;
            list-style: none;
            display: inline-flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0;
            padding: 0;
            height: 100%;
          }

          .ProgressSlider__Item {
            position: relative;
            background: #684653;
            opacity: 1;
            width: 7px;
            height: 7px;
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
            background-color: #fff;
            box-shadow: 0 0 20px 5px #f6b362;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            transition: all 1s ease 0s;
            z-index: 2;
          }
        `}</style>
      </div>
    );
  }
}

export default ProgressSlider;
