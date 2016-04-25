'use strict';

import React from 'react';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import AvSkipPrevious from 'material-ui/lib/svg-icons/av/skip-previous';
import ActionLaunch from 'material-ui/lib/svg-icons/action/launch';
import AvPause from 'material-ui/lib/svg-icons/av/pause';
import AvPlayArrow from 'material-ui/lib/svg-icons/av/play-arrow';
import AvSkipNext from 'material-ui/lib/svg-icons/av/skip-next';

import FlatButton from 'material-ui/lib/flat-button';
import Dialog from 'material-ui/lib/dialog';
import ScreenLauncher from './ScreenLauncherComponent';

require('styles//Controls.scss');

class ControlsComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screenLauncherModalOpen: false
    };
  }

  componentDidMount() {
    this.props.play();
  }

  handleOpen = () => {
    this.setState({
      screenLauncherModalOpen: true
    })
  }

  handleClose = () => {
    this.setState({
      screenLauncherModalOpen: false
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];

    return (
      <div className="controls-component">

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.previous()} >
            <AvSkipPrevious />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onTouchTap={() => this.handleOpen()} >
            <ActionLaunch />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.isPlaying ? {display: 'block'} : {display: 'none'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.stop()}>
            <AvPause />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container" style={this.props.isPlaying ? {display: 'none'} : {display: 'block'}}>
          <FloatingActionButton mini={true} onMouseDown={() => this.props.play()}>
            <AvPlayArrow />
          </FloatingActionButton>
        </div>

        <div className="controls-button-container">
          <FloatingActionButton mini={true} onMouseDown={() => this.props.next()}>
            <AvSkipNext />
          </FloatingActionButton>
        </div>

        <Dialog
          title="Go to screen"
          actions={actions}
          modal={false}
          open={this.state.screenLauncherModalOpen}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <ScreenLauncher
            slides={this.props.slides}
          />
        </Dialog>

      </div>
    );
  }
}

ControlsComponent.displayName = 'ControlsComponent';
ControlsComponent.propTypes = {
  slides: React.PropTypes.array.isRequired,
  isPlaying: React.PropTypes.bool.isRequired,
  play: React.PropTypes.func.isRequired,
  stop: React.PropTypes.func.isRequired,
  next: React.PropTypes.func.isRequired,
  previous: React.PropTypes.func.isRequired
};

export default ControlsComponent;
