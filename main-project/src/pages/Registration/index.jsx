import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

function Registration() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [LastName, setLastName] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [Login, setLogin] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();

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
    } catch (e) {
      if (e.response.status === 422) {
        // Object.keys(e.response.data.errors).forEach((key) => {
        //   setError(key, {
        //     type: "manual",
        //     message: e.response.data.errors[key],
        //   });
        // });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <form onSubmit={(e) => handleSubmitReg(e)}>
        <input
          type="text"
          value={LastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          value={FirstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          value={Login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="text" onChange={(e) => {}} />

        <button type="submbit" disabled={isLoading}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default Registration;
