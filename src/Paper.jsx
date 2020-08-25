import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Finance from "./finance/Index";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    width: '100%',
  },
}));

export default function SpacingGrid() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={3}>
                  <Grid  item>
                      <Paper className={classes.paper} >
                        <Finance></Finance>
                      </Paper>
                  </Grid>
                  <Grid  item>
                      <Paper className={classes.paper} />
                  </Grid>
                  <Grid  item>
                      <Paper className={classes.paper} />
                  </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
