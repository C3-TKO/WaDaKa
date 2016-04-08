'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AvSkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import AvPause from 'material-ui/lib/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/lib/svg-icons/av/skip-next';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  componentDidMount() {
    this.props.play(setTimeout(() => this.props.next(), this.props.slides[this.props.control.pointer].duration));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.slides.isPlaying && this.props.slides.pointer != nextProps.slides.pointer) {
      this.props.play(setTimeout(() => this.props.next(), nextProps.slides[nextProps.control.pointer].duration));
    }
  }

  render() {
    return (
      <div className="controls-component">

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.previous()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={!this.props.control.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.control.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.play(setTimeout(() => this.props.next(), this.props.slides[this.props.control.pointer].duration))}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';

ControlsComponent.propTypes = {
  slides:   React.PropTypes.array.isRequired,
  control:  React.PropTypes.object.isRequired,
  previous: React.PropTypes.func.isRequired,
  stop:     React.PropTypes.func.isRequired,
  play:     React.PropTypes.func.isRequired,
  next:     React.PropTypes.func.isRequired
};

export default ControlsComponent;
