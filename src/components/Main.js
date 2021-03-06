require('normalize.css');
require('styles/App.css');

import React from 'react';
import IframeComponent from './IframeComponent';
import MenuComponent from './MenuComponent'
import ProgressBarComponent from './ProgressBarComponent';
import ReloaderComponent from './ReloaderComponent';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevPointer: 0,
      pointer: 0,
      isPlaying: false,
      timeout: undefined
    };
  }

  componentWillReceiveProps(nextProps) {
    // Checking for out of boundary pointer after deletion of slides
    if(this.state.pointer >= (nextProps.slides.length - 1)) {
      this.setPointer(0)
    }
  }

  componentDidUpdate(prevProps) {
    // Kickstarting the application after the first slide has been added
    if(this.props.slides.length > 0 && prevProps.slides.length === 0) {
      this.play();
    }
  }

  play = () => {
    clearTimeout(this.state.timeout);
    const timeout = setTimeout(() => this.next(), this.props.slides[this.state.pointer].duration);

    this.setState({
      isPlaying: true,
      timeout: timeout
    })
  }

  stop = () => {
    clearTimeout(this.state.timeout);
    this.setState({
      isPlaying: false,
      timeout: undefined
    })
  }

  next = () => {
    let nextPointer = this.state.pointer
    if(++nextPointer >= this.props.slides.length) {
      nextPointer =  0
    }
    this.setPointer(nextPointer)

    if (this.state.isPlaying) {
      this.play();
    }
  }

  prev = () => {
    let nextPointer = this.state.pointer
    if(--nextPointer < 0) {
      nextPointer = this.props.slides.length - 1;
    }
    this.setPointer(nextPointer)

    if (this.state.isPlaying) {
      this.play();
    }
  }

  goto = (slideId) => {
    this.setPointer(this.getPointerForSlideId(slideId))

    if (this.state.isPlaying) {
      this.play();
    }
  }

  getPointerForSlideId(id) {
    for(let i in this.props.slides) {
      if(this.props.slides[i]._id == id) {
        return i;
      }
    }
  }

  setPointer(pointer) {
    this.setState({
      prevPointer: this.state.pointer,
      pointer: pointer
    })
  }

  renderIfSlidesAreDefined() {
    if (this.props.slides.length > 0) {
      return (
        <div>
          <IframeComponent
            urlOut={this.props.slides[this.state.prevPointer].url}
            urlIn={this.props.slides[this.state.pointer].url}
          />

          <ProgressBarComponent
            isPlaying={this.state.isPlaying}
            timeout={this.state.timeout}
            duration={this.props.slides[this.state.pointer].duration}
          />

          <ReloaderComponent
            pointer={this.state.pointer}
            durationLastScreen={this.props.slides[this.props.slides.length - 1].duration}
            indexOfLastSlide={this.props.slides.length - 1}
          />
        </div>
      )
    }
  }

  render() {
    const {actions, slides} = this.props;
    return (
      <div
        className='index'
      >
        {this.renderIfSlidesAreDefined()}

        <MenuComponent
          slides={slides}
          isPlaying={this.state.isPlaying}
          play={this.play}
          stop={this.stop}
          next={this.next}
          prev={this.prev}
          goto={this.goto}
          actionDeleteSlide={actions.deleteSlide}
        />

      </div>
    );
  }
}

AppComponent.displayName = 'AppComponent';
AppComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
  settings: React.PropTypes.object.isRequired
};
AppComponent.defaultProps = {
};

export default AppComponent;
