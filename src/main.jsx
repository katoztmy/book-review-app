import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Test from "./Test.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignUp } from "./SignUp.jsx";
import { SignIn } from "./Signin.jsx";
import { BooksList } from "./BooksList.jsx";
import { Provider, useSelector } from "react-redux";
import { store } from "./store.js";
import { Profile } from "./Profile.jsx";
import { NewBook } from "./NewBook.jsx";
import { BookDetail } from "./BookDetail.jsx";
import { BookEdit } from "./BookEdit.jsx";

const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Navigate to="/books" replace /> : children;
};

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
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
            path="profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="new"
            element={
              <PrivateRoute>
                <NewBook />
              </PrivateRoute>
            }
          />
          <Route
            path="detail/:id"
            element={
              <PrivateRoute>
                <BookDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="edit/:id"
            element={
              <PrivateRoute>
                <BookEdit />
              </PrivateRoute>
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
