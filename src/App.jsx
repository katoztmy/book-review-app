import { useState } from "react";
import "./App.css";

const emailRegex =
  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("email required");
    } else if (!emailRegex.test(email)) {
      setEmailError("不正なメール形式");
    }
    if (!password) setPasswordError("password required");
  };

  return (
    <>
      <form className="signin-form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="email-error">{emailError}</p>}
        <input
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {passwordError && <p className="password-error">{passwordError}</p>}
        <button type="submit">サインイン</button>
      </form>
    </>
  );
}

export default App;
