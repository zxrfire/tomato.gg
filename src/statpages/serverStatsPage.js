import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import "../css/tankstats.css";
import WN8Waffle from './serverStatsPageComponents/WN8Waffle';
import WRWaffle from './serverStatsPageComponents/WRWaffle';
import Scatterplot from './serverStatsPageComponents/scatterplot';
import scatterdata from '../data/scatterdata.json';
import scatterdata10000 from '../data/scatterdata10000.json';

export default function ServerStatsPage(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

  const grid = {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '500px',
  }

  return (
      <div style = {{padding: '2em', paddingTop: '5em'}}>
        <div style={{margin: '1rem 0 1rem 0'}}>
          <Paper className={useStyles.paper}>
            <div style={{padding: '1rem', color: 'rgb(50,50,50)'}}>
              <span style={{fontSize: '1.6rem', fontWeight: '500'}}>NA Server Stats</span><br/>
              <span style={{fontSize: '0.8rem', lineHeight: '1.3rem', color: 'rgb(100,100,100)'}}>UPDATED 8/26/2020</span> <br/>
              <span style={{fontSize: '0.9rem'}}>Just a collection of experimental charts and graphs. I have no idea what the final version of this page will look like.<br/>
              </span>
            </div>
          </Paper>
        </div>
        <div style={{margin: '1rem 0 1rem 0'}}>
          <Paper style={{ padding: '0rem 0rem 2rem 0rem'}}>
            <div style={{padding: '1rem', color: 'rgb(50,50,50)'}}>
              <span style={{fontSize: '1.2rem', fontWeight: '500'}}>NA WN8 Distribution</span><br/>
              <span style={{fontSize: '0.8rem', lineHeight: '1.3rem', color: 'rgb(100,100,100)'}}>MINIMUM 100 BATTLES | EACH SQUARE REPRESENTS 0.1% OF POPULATION</span> <br/>
            </div>
            <WN8Waffle/>
            <div style={{padding: '1rem', color: 'rgb(50,50,50)'}}>
              <span style={{fontSize: '1.2rem', fontWeight: '500'}}>NA Winrate Distribution</span><br/>
              <span style={{fontSize: '0.8rem', lineHeight: '1.3rem', color: 'rgb(100,100,100)'}}>MINIMUM 100 BATTLES | EACH SQUARE REPRESENTS 0.1% OF POPULATION</span> <br/>
            </div>
            <WRWaffle/>
          </Paper>
        </div>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Paper style={{ padding: '1rem 1rem 1rem 1rem'}}>
                    <span style={{fontSize: '1.2rem', fontWeight: '500'}}>NA Winrate/WN8 Scatterplot | Min. 2500 Battles </span><br/>
                    <span style={{fontSize: '0.8rem', lineHeight: '1.3rem', color: 'rgb(100,100,100)'}}>1000 DATAPOINTS</span> <br/>
                    <Scatterplot data={scatterdata} color={'rgb(167, 167, 232)'}/>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ padding: '1rem 1rem 1rem 1rem'}}>
                    <span style={{fontSize: '1.2rem', fontWeight: '500'}}>NA Winrate/WN8 Scatterplot | Min. 10000 Battles</span><br/>
                    <span style={{fontSize: '0.8rem', lineHeight: '1.3rem', color: 'rgb(100,100,100)'}}>1000 DATAPOINTS</span> <br/>
                    <Scatterplot data={scatterdata10000} color={'rgb(217, 167, 232)'}/>
                </Paper>
            </Grid>
        </Grid>
      </div>
  );
}
