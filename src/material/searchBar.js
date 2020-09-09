import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import SelectQuery from './select'
import { borders } from '@material-ui/system';
import { ThemeContext } from '../style/theme.js';


export default function SearchBar(props) {
  const {theme} = React.useContext(ThemeContext);

  const useStyles = makeStyles((t) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      height: '50px',
      borderRadius: 0,
      backgroundColor: theme === 'dark' ? 'rgb(40, 40, 40)' : 'white'
    },
    input: {
      marginLeft: t.spacing(1),
      flex: 1,
      fontSize: 16,
      color: theme === 'dark' ? 'white' : 'rgb(40, 40, 40)',
    },
    iconButton: {
      padding: 10,
      color: theme === 'dark' ? 'white' : 'rgb(40, 40, 40)',
    },
    divider: {
      height: 40,
      margin: 10,
      color: theme === 'dark' ? 'white' : 'rgb(40, 40, 40)',
    },
  }));

  const classes = useStyles();
  const [featuredPlayer, setFeaturedPlayer] = useState(      
  <InputBase
    className={classes.input}
    placeholder="Enter Username (e.g. lordsheen)"
    inputProps={{ 'aria-label': 'search google maps' }}
    onChange={e => props.setName(e.target.value)}
  />);
  useEffect(() => {
    if (Math.random() > 0.5) {
      setFeaturedPlayer(      
      <InputBase
        className={classes.input}
        placeholder="Enter Username (e.g. haglar)"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => props.setName(e.target.value)}
      />);
    }
  },[]);

  
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Enter Username (e.g. haglar)"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => props.setName(e.target.value)}
      />      
      <Divider className={classes.divider} orientation="vertical" />
      <SelectQuery setServer = {props.setServer} server = {props.server} setMode = {props.setMode} mode = {props.mode}/>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}