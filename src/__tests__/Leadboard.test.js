import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);

const initialState = {
  users: {
    user1: {
      id: "user1",
      name: "User 1",
      answers: {
        q1: "optionOne",
        q2: "optionTwo",
      },
      questions: ["q1"],
    },
    user2: {
      id: "user2",
      name: "User 2",
      answers: {},
      questions: [],
    },
  },
};

describe("Leaderboard Functionality", () => {
  test("displays the leaderboard correctly", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Leaderboard/i));

    expect(screen.getByText(/User 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Questions Asked:/i)).toBeInTheDocument();
    expect(screen.getByText(/Questions Answered:/i)).toBeInTheDocument();
  });
});
