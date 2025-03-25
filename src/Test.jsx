import { useState } from "react";
import "./Test.css";

function Test() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="signin-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="パスワード"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
        <button type="submit">サインイン</button>
      </form>
    </>
  );
}

export default Test;
