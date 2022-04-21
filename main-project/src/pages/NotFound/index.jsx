import { Grid, makeStyles, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function NotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h2>404</h2>
      <p>Page not found.</p>
    </div>
  );
}

export default NotFound;
