import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import SmallSelectQuery from './smallSelect'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '400px',
    height: '30px',

  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: '12',
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SmallSearchBar(props) {
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Stats Lookup"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={e => props.setName(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <SmallSelectQuery setServer = {props.setServer} server = {props.server} setMode = {props.setMode} mode = {props.mode}/>
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}