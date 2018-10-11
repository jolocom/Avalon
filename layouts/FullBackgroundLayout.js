import { Component } from 'react';
import throttle from 'lodash.throttle';

import { ProgressSlider, Header } from 'components';

class FullBackgroundLayout extends Component {
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

  nextSection = () => {
    const { sectionIndex } = this.state;
    const { items } = this.props;
    const newSectionIndex = sectionIndex + 1;

    if (newSectionIndex >= 0 && newSectionIndex < items.length) {
      this.setState({ sectionIndex: newSectionIndex });
    }
  }

  prevSection = () => {
    const { sectionIndex } = this.state;
    const { items } = this.props;
    const newSectionIndex = sectionIndex - 1;

    if (newSectionIndex >= 0 && newSectionIndex < items.length) {
      this.setState({ sectionIndex: newSectionIndex });
    }
  }

  render() {
    const { items } = this.props;
    const { sectionIndex } = this.state;

    return (
      <div className="FullBackgroundLayout">
        <div className="FullBackgroundLayout__Container">
          <Header brandVersion="secondary" />

          <main>
            <ProgressSlider count={items.length} progress={sectionIndex} />
            <div
              ref={this.listRef}
              className="FullBackgroundLayout__List__Section"
              style={{
                top: -(this.getListHeight()) * sectionIndex + 'px',
              }}
            >
              {items.map((item, index) => (
                <section
                  className={`
                    FullBackgroundLayout__Section
                    ${item.className ? item.className : ''}
                    ${index !== sectionIndex ? 'hidden' : ''}
                  `}
                  style={item.style}
                >
                  {item.content({
                    nextSection: this.nextSection,
                    prevSection: this.prevSection,
                  })}
                </section>
              ))}
            </div>
          </main>
        </div>

        <style jsx>{`
          /* Prefetch images for all sections */
          .FullBackgroundLayout:before {
            content: '';
            content: ${items.map(item => item.bgImage ? `url(${item.bgImage})` : '').join(' ')};
            position:absolute;
            width:0;
            height:0;
            overflow:hidden;
            z-index:-1;
          }
          .FullBackgroundLayout {
            background-image: url(${items[sectionIndex].bgImage || ''});
            background-repeat: no-repeat;
            background-size: cover;
            overflow: hidden;
            min-height: 100vh;
            height: 100vh;
          }
          .FullBackgroundLayout__Container {
            display: flex;
            flex-direction: column;
            padding: 65px 0 0 65px;
            height: 100%;
            width: 100%;
          }
          main {
            display: flex;
            height: 100%;
          }
          .FullBackgroundLayout__List__Section {
            position: absolute;
            top: 0;
            height: 100%;
            width: 100%;
            margin-left: 50px;
            margin-right: -17px;
            transition: all 1s ease 0s;
          }
          .FullBackgroundLayout__Section {
            height: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .FullBackgroundLayout__Section.hidden {
            visibility: hidden;
          }

          :global(.ProgressSlider) {
            height: 100%;
            max-height: 100%;
            position: relative;
          }
        `}</style>
      </div>
    );
  }
}

export default FullBackgroundLayout;
