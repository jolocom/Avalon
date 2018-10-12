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

  getListHeight = () => {
    const element = this.listRef.current;
    const elementInfo = element ? element.getBoundingClientRect() : {};

    return elementInfo.height || 0;
  }

  handleScroll = evt => {
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

  nextSection = () => this.setState({ sectionIndex: this.state.sectionIndex + 1 })
  prevSection = () => this.setState({ sectionIndex: this.state.sectionIndex - 1 })

  render() {
    const { items, stepsWithoutHeader = [] } = this.props;
    const { sectionIndex } = this.state;
    const isFirstSlide = sectionIndex === 0;
    const hideHeader = stepsWithoutHeader.includes(sectionIndex);

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
                    })
                    : item.content
                  }
                </section>
              ))}
            </div>
          </main>

          <footer>
            scroll
          </footer>
        </div>

        <style jsx>{`
          /* Prefetch images for all sections */
          .GradientLayout:before {
            content: '';
            content: ${items.map(item => item.bgImage ? `url(${item.bgImage})` : '').join(' ')};
            position:absolute;
            width:0;
            height:0;
            overflow:hidden;
            z-index:-1;
          }
          .GradientLayout {
            background-image: url(${items[sectionIndex].bgImage || ''});
            background-position: top right;
            background-repeat: no-repeat;
            background-color: #000;
            background-size: 100%;
            overflow: hidden;
            min-height: 100vh;
            height: 100vh;
          }
          .GradientLayout__Container {
            background-image: radial-gradient(circle at top left, rgba(148, 47, 81, 0.5), rgba(6,6,16,0) 45%);
            padding: 65px 0 0 65px;
            height: 100%;
            width: 100%;
          }
          main {
            display: flex;
            height: 100%;
          }
          .GradientLayout__List__Section {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            margin-left: 50px;
            margin-right: -17px;
            transition: all 1s ease 0s;
          }
          .GradientLayout__Section {
            height: 100%;
            overflow: hidden;
            max-width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .GradientLayout__Section.hidden {
            visibility: hidden;
          }

          :global(.ProgressSlider) {
            height: 100%;
            max-height: 100%;
            position: relative;
          }

          footer {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            text-transform: uppercase;
            font-size: 10px;
            letter-spacing: 2px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          footer:after {
            content: '';
            width: 1px;
            height: 60px;
            background-image: linear-gradient(to bottom,rgba(255,241,223,0),rgba(255, 222, 188, 0.7));
          }
        `}</style>
      </div>
    );
  }
}

export default GradientLayout;
