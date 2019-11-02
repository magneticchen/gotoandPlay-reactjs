import React, { Component } from "react"
import PlayCircleFilledIcon from '@material-ui/icons/PlayArrow';
import PauseCircleFilledIcon from '@material-ui/icons/Pause';
import Fab from '@material-ui/core/Fab';

import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';

class Stream extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="stream">
        <div className="bar"><marquee scrollamount="4" startvisable="true">{this.props.localize.header_title+' Online Radio'}</marquee></div>
        {this.props.playing?
          <Tooltip title={this.props.localize.pause_playing?this.props.localize.pause_playing:'continue'}>
            <Fab size="medium" onClick={this.props.onClick}>
              <PauseCircleFilledIcon />
            </Fab>
          </Tooltip>
          :
          <Tooltip title={this.props.localize.continue_playing?this.props.localize.continue_playing:'pause'}>
            <Fab size="medium" onClick={this.props.onClick}>
              <PlayCircleFilledIcon />
            </Fab>
          </Tooltip>
          }
      </div>
    );
  }
}

export default Stream;
