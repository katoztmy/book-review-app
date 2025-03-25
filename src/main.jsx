import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Test from "./Test.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { SignUp } from "./SignUp.jsx";
import { SignIn } from "./Signin.jsx";
import { BooksList } from "./BooksList.jsx";
import { Provider, useSelector } from "react-redux";
import { store } from "./store.js";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Navigate to="/books" replace /> : children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="test" element={<Test />} />
            <Route path="books" element={<BooksList />} />
          </Route>
          <Route
            path="login"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            path="signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
