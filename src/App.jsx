import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <form className="signin-form">
        <input type="email" placeholder="メールアドレス" />
        <input type="password" placeholder="パスワード" />
        <button type="submit">サインイン</button>
      </form>
    </>
  );
}

export default App;
