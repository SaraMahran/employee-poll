import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Login from "../components/Login";

const mockStore = configureStore([]);

describe("Login Component", () => {
  test("renders login form", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
