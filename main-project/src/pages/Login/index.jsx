import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Login, setLogin] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

  const handleSubmitAuth = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const { data: loginData } = await api.auth.login({
        email: Email,
        password: Password,
      });

      auth.setToken(loginData.token);
      auth.setUser(loginData.user);
    } catch (error) {
      if (error.response.status === 422) {
      }
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReg = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.auth.registration({
        email: Email,
        password: Password,
        firstName: FirstName,
        lastName: LastName,
      });
      const { data: loginData } = await api.auth.login({
        email: Email,
        password: Password,
      });

      auth.setToken(loginData.token);
      auth.setUser(loginData.user);
    } catch (error) {
      if (error.response.status === 422) {
      }
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="centerplace-wrapper">
      <div className="formwrapper">
        <form
          name="auth"
          className="formwrapper-inner"
          onSubmit={(e) => handleSubmitAuth(e)}
        >
          <h1>Авторизация</h1>

          <div className="auth-block">
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                id="login"
                name="login"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder=" "
              />

              <label className="text-field__label" htmlFor="login">
                Login
              </label>
            </div>

            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="password"
                id="password"
                name="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder=" "
              />

              <label className="text-field__label" htmlFor="password">
                Password
              </label>
            </div>
          </div>

          <div className="buttonwrapper">
            <button type="submit" disabled={isLoading} className="but">
              Авторизоваться
            </button>
          </div>
        </form>

        <form
          name="reg"
          className="formwrapper-inner"
          onSubmit={(e) => handleSubmitReg(e)}
        >
          <h1>Регистрация</h1>
          <div className="reg-block">
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                id="lastname"
                name="lastname"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="lastname">
                Last Name
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                id="firstname"
                name="firstname"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="firstname">
                First Name
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                id="login"
                name="login"
                value={Login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="login">
                Login
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="text"
                id=""
                name="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="email">
                Email
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="password"
                id="password"
                name="password"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="password">
                Password
              </label>
            </div>
            <div className="text-field text-field_floating-2">
              <input
                className="text-field__input"
                type="password"
                id="password"
                name="password"
                placeholder=" "
              />
              <label className="text-field__label" htmlFor="password">
                Repeat password
              </label>
            </div>
          </div>
          <div className="buttonwrapper">
            <button className="but" type="submit" disabled={isLoading}>
              Зарегистрироваться
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
