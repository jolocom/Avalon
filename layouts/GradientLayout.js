import { Component } from 'react';
import throttle from 'lodash.throttle';

import { ProgressSlider, Header } from 'components';

class GradientLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionIndex: 0,
    };
    this.listRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('mousewheel', throttle(this.handleScroll, 1500, { trailing: false }));
  }
  componentWillUnmount() {
    document.removeEventListener('mousewheel', throttle(this.handleScroll));
  }

  canScroll = () => {
    const { scrollValidations = {} } = this.props;
    const canScroll = scrollValidations[this.state.sectionIndex];

    return typeof canScroll === 'undefined' ? true : canScroll;
  }

  getListHeight = () => {
    const element = this.listRef.current;
    const elementInfo = element ? element.getBoundingClientRect() : {};

    return elementInfo.height || 0;
  }

  handleScroll = evt => {
    if(!this.canScroll()) {
      return;
    }
    const delta = evt.wheelDeltaY;
    const { sectionIndex } = this.state;
    const { items } = this.props;
    let newSectionIndex = 0;

    if (delta > 0) {
      newSectionIndex = sectionIndex - 1;
    } else {
      newSectionIndex = sectionIndex + 1;
    }

    if (newSectionIndex >= 0 && newSectionIndex < items.length) {
      this.setState({ sectionIndex: newSectionIndex });
    }
  }

  nextSection = () => this.setSection(this.state.sectionIndex + 1)
  prevSection = () => this.setSection(this.state.sectionIndex - 1)
  setSection = idx => this.setState({ sectionIndex: idx })

  render() {
    const { items, stepsWithoutHeader = [] } = this.props;
    const { sectionIndex } = this.state;
    // const sectionIndex = 7;
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
      <div className="GradientLayout">
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
                top: -(this.getListHeight()) * sectionIndex + 'px',
              }}
            >
              {items.map((item, index) => (
                <section
                  className={`
                  GradientLayout__Section
                  ${index !== sectionIndex ? 'hidden' : ''}
                  ${item.className ? item.className : ''}
                `}
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
            height: 100%;
            width: 100%;
            margin-left: 70px;
            margin-right: -17px;
            transition: all 1s ease 0s;
          }
          .GradientLayout__Section {
            height: 100%;
            max-width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .GradientLayout__Section.hidden {
            visibility: hidden;
          }

          .GradientLayout :global(.ProgressSlider) {
            position: relative;
            height: calc(100% - 15px);
            max-height: 100%;
            margin-left: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default GradientLayout;
