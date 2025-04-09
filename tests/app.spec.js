import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import App from "../src/Test";

describe("App", () => {
  // React Testing LibraryはRTLと訳されるらしい
  // RTLのrender関数による出力が不明なときは screen.debug()を使う
  test("renders App component", () => {
    render(<App />);
    screen.debug();
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "サインイン" })
    ).toBeInTheDocument();
  });
});
