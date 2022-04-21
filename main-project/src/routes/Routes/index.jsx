import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import Registration from "../../pages/Registration";
import Profile from "../../pages/Profile";
import NotFound from "../../pages/NotFound";
import useAuth from "../../hooks/useAuth";
import PrivateRoute from "../components/PrivateRoute";
import GuestRoute from "../components/GuestRoute";
import {
  CircularProgress,
  makeStyles,
  Container,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function AppRoutes() {
  const classes = useStyles();
  const auth = useAuth();
  console.log(auth.user);

  return auth.isLoaded ? (
    <Routes>
      <Route
        path="/"
        element={true ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <GuestRoute>
            <Registration />
          </GuestRoute>
        }
      />

      <Route path="/not-found-404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found-404" />} />
      <Route
        path="/home"
        element={
          //   <PrivateRoute>
          <Home />
          //   </PrivateRoute>
        }
      />
    </Routes>
  ) : (
    <Container className={classes.root}>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
          <CircularProgress color="inherit" />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AppRoutes;
