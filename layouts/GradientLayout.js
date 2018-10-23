import { Component } from 'react';
import classnames from 'classnames';
import throttle from 'lodash.throttle';

import { ProgressSlider, Header } from 'components';

class GradientLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionIndex: 0,
      direction: 0,
      containerTopPosition: 0,
    };
    this.listRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('mousewheel', throttle(this.handleScroll, 1500, { trailing: false }));
    window.addEventListener('resize', this.setContainerTopPosition());
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sectionIndex !== this.state.sectionIndex) {
      this.setState({ containerTopPosition: this.containerTopPosition });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('mousewheel', throttle(this.handleScroll));
    window.removeEventListener('resize', this.setContainerTopPosition());
  }
  get containerTopPosition() {
    return -(this.getListHeight()) * this.state.sectionIndex + 'px';
  }

  setContainerTopPosition = () => {
    return throttle(
      () => this.setState({ containerTopPosition: this.containerTopPosition }),
      1500,
      { trailing: false }
    );
  }

  canScroll = delta => {
    const { scrollValidations = {} } = this.props;
    const validators = scrollValidations[this.state.sectionIndex] || {};
    let canScroll;

    if (delta > 0) {
      canScroll = validators.back;
    } else {
      canScroll = validators.forward;
    }

    return typeof canScroll === 'undefined' ? true : canScroll;
  }

  getListHeight = () => {
    const element = this.listRef.current;
    const elementInfo = element ? element.getBoundingClientRect() : {};

    return elementInfo.height || 0;
  }

  handleScroll = evt => {
    const delta = evt.wheelDeltaY;
    if (!this.canScroll(delta)) {
      return;
    }

    if (delta > 0) {
      this.prevSection();
    } else {
      this.nextSection();
    }
  }

  nextSection = () => this.setSection(this.state.sectionIndex + 1, {
    direction: 'bottom',
  })
  prevSection = () => this.setSection(this.state.sectionIndex - 1, {
    direction: 'top',
  })
  setSection = (idx, otherState = {}) => {
    const { items } = this.props;
    const isInItemsRange = idx >= 0 && idx < items.length;

    if (isInItemsRange) {
      this.setState({
        sectionIndex: idx,
        ...otherState,
      });
    }
  }

  render() {
    const { items, stepsWithoutHeader = [] } = this.props;
    const { sectionIndex, direction, containerTopPosition } = this.state;
    const isFirstSlide = sectionIndex === 0;
    const hideHeader = stepsWithoutHeader.includes(sectionIndex);
    const imagesToPrefetch = items
      .map((item = {}) => item.bgImage ? `url(${item.bgImage})` : '').join(' ');
    const currentSection = items[sectionIndex] || {};
    if (currentSection < 0) {
      throw Error('Current section canoot be less than 0');
    }
    const currentImage = currentSection.bgImage || '';

    return (
      <div className={classnames(
        'GradientLayout animate',
        { [`slide-from-${direction}`]: direction }
      )}>
        <div className="GradientLayout__Container">
          {!hideHeader && (
            <Header brandVersion={isFirstSlide ? 'primary' : 'secondary'} />
          )}

          <main>
            <ProgressSlider count={items.length} progress={sectionIndex} />
            <div
              ref={this.listRef}
              className="GradientLayout__List__Section"
              style={{
                top: containerTopPosition,
              }}
            >
              {items.map((item, index) => (
                <section
                  className={classnames(
                    'GradientLayout__Section',
                    { hidden: index !== sectionIndex },
                    item.className
                  )}
                  style={item.style}
                >
                  {typeof item.content === 'function'
                    ? React.createElement(item.content, {
                      nextSection: this.nextSection,
                      prevSection: this.prevSection,
                      mainSectionIndex: sectionIndex,
                      setSection: this.setSection,
                    })
                    : item.content
                  }
                </section>
              ))}
            </div>
          </main>
        </div>

        <style jsx>{`
          /* Prefetch images for all sections */
          .GradientLayout:before {
            content: '';
            content: ${imagesToPrefetch};
            position:absolute;
            width:0;
            height:0;
            overflow:hidden;
            z-index:-1;
          }
          .GradientLayout {
            background-image: url(${currentImage});
            background-position: top right;
            background-repeat: no-repeat;
            background-color: #000;
            background-size: 100%;
            overflow: hidden;
            min-height: 100vh;
            height: 100vh;
          }
          .GradientLayout__Container {
            display: flex;
            flex-direction: column;
            background-image: radial-gradient(circle at top left, rgba(148, 47, 81, 0.5), rgba(6,6,16,0) 45%);
            padding: 40px 0 0 40px;
            height: 100%;
            width: 100%;
          }
          main {
            display: flex;
            flex: 1;
          }
          .GradientLayout__List__Section {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            height: 100%;
            margin-right: -17px;
            transition: all 1s ease 0s;
          }
          .GradientLayout__Section {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            max-height: 100vh;
            overflow-y: auto;
            max-width: 50%;
          }
          .GradientLayout__Section.hidden {
            visibility: hidden;
          }
          .GradientLayout__Section.center {
            margin: auto;
          }
          .GradientLayout__Section.left {
            margin-left: 120px;
          }

          .GradientLayout :global(.ProgressSlider) {
            position: relative;
            height: calc(100% - 15px);
            max-height: 100%;
            margin-left: 10px;
          }

          .animate.slide-from-top {
            animation: slide-from-top 1s;
          }
          .animate.slide-from-bottom {
            animation: slide-from-bottom 1s;
          }
          @keyframes slide-from-bottom {
            0% {
              background-position: 0% -100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
          @keyframes slide-from-top {
            0% {
              background-position: 0% 100%;
            }
            100% {
              background-position: 0% 0%;
            }
          }
        `}</style>
      </div>
    );
  }
}

export default GradientLayout;
