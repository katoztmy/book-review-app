import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignUp } from "./SignUp.jsx";
import { SignIn } from "./Signin.jsx";
import { Books } from "./Books.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<SignIn />} />
        <Route path="books" element={<Books />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
