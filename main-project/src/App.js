// import {
//     AppBar,
//     Toolbar,
//     Typography,
//     Button,
//   makeStyles,
// } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routes";
import useAuth from "./hooks/useAuth";
import logo from "./logo.svg";

function App() {
  const auth = useAuth();
  const navigate = useNavigate();

  const onLogOut = () => {
    auth.logOut();
    navigate("/login");
  };

  return (
    <div>
      <div className="split taskbar">
        <div className="circle-column">
          <img src={logo} alt="logo" id="logo" />
          <div
            className="round"
            style={{ background: "rgb(234, 76, 137, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(234, 76, 137, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(234, 76, 137, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgba(228, 72, 72, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(228, 72, 72, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(228, 72, 72, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(18, 122, 189, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(18, 122, 189, 0.3)" }}
          ></div>
          <div
            className="round"
            style={{ background: "rgb(18, 122, 189, 0.3)" }}
          ></div>
          {auth.isLoaded &&
            (auth.user ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/profile">
                  {auth.user.firstName} {auth.user.lastName}
                </Link>
                <button onClick={onLogOut}>Log out</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/registration">Registration</Link>
              </>
            ))}
        </div>
      </div>

      <div className="split mainspace">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
