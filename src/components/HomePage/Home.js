// Author noowyee
import React,
{ Component } from 'react'

import {TimetableTable} from '../commons/TimetableTable';

import { Link } from "react-router-dom"

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReactMarkdown from 'react-markdown';

import Tooltip from '@material-ui/core/Tooltip';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ShareIcon from '@material-ui/icons/Share';
import LinkIcon from '@material-ui/icons/Link';
import LaunchIcon from '@material-ui/icons/Launch';

import {InformationCard} from '../InformationCardPage/InformationCard';

import abu_tri from "../../imgs/icons/us_triggered.png"

import radio from '../../imgs/radio.png'

class Timetable extends Component {
  constructor(props){
    super(props);
  }
  render() {

    return (
      <div className="timetable">
        <div className="head">
          <img src={radio} alt=""/>
          <h2>PROGRAMS</h2><br/>
          <p>{this.props.online_count+' '+this.props.localize.n_people_listening}</p>
        </div>
        <Paper className="contain">
          {this.props.programs?<TimetableTable localize={this.props.localize} timetable={this.props.programs}/>:null}
        </Paper>
      </div>
    );
  }
}


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSuggestedCards () {
    let rows = [];
    for(let i in this.props.suggested_cards) {
      let card = this.props.cards[this.props.suggested_cards[i]];

      if(card) {
        card.card_id = this.props.suggested_cards[i];
        rows.push(
          <InformationCard {...this.props} key={i} card={card}/>
        );
      }

      }
    return rows;
  }

  render () {
    return (
      <div className="homepage" style={this.props.dark_theme?{'color': 'white', 'background': 'repeating-linear-gradient(45deg, rgba(35, 47, 52, 0.8), rgba(35, 47, 52, 0.8) 10px, rgba(47, 55, 58, 0.8) 10px, rgba(47, 55, 58, 0.8) 20px)'}:{'color': '#232f34', 'background': 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6) 10px, rgba(235, 248, 253, 0.69) 10px, rgba(235, 249, 255, 0.69) 20px)'}}>
        <div className="timetable-container">
          <div className="intro_container">
            <h1 className="slogan">{this.props.slogan}</h1>
            <div className="intro">
              <h1>{this.props.localize.news}</h1>
              <ul>
                {this.props.news.map((text)=> <a key={text} href={text[1]} target="_blank"><li>{text[0]}</li></a>)}
              </ul>
            </div>
            <div className="intro">
              <h1>{this.props.localize.pinned+' '+this.props.localize.information}</h1>
              <ul>
                {this.props.pinned_info.map((text)=> {
                  if(text)
                    return(
                      <a key={text[0]} href={text[1]} target="_blank">
                      <Tooltip title={this.props.localize.more_info}>
                      <li>{text[0]}</li>
                      </Tooltip>
                      </a>
                    );
                })}
                <li onClick={()=>{this.props.actions.pushNotification({content:'¯\\_(ツ)_/¯', variant: 'error'})}}>{"點我哈哈哈"}</li>
              </ul>
            </div>
          </div>
          <Timetable online_count={this.props.online_count} localize={this.props.localize} programs={this.props.programs}/>
        </div>

        <div className="cards" style={this.props.dark_theme?{'borderTop': 'solid 1px white'}:{'borderTop': 'solid 1px #232f34'}}>
          <div className="container">
            <h1 className="block-header">{this.props.localize.suggestion}</h1>
            <Grid style={{padding: 20}} container alignItems="flex-start" direction="row" justify="center" spacing={24}>
              {this.renderSuggestedCards()}
            </Grid>
            </div>
          </div>
      </div>
    );
  }
}

export default Home;
