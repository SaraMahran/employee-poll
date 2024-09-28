import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Nav from "./Nav";
import { handleLogout } from "../actions/authedUser";

const mockStore = configureStore([]);

describe("Nav Component", () => {
  let store;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    store = mockStore({
      authedUser: { id: "user1" },
    });

    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);
  });

  test("renders navigation links and user information", () => {
    render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
    expect(screen.getByText(/New Poll/i)).toBeInTheDocument();

    expect(screen.getByTestId("user-information")).toHaveTextContent(
      "User: user1"
    );
  });

  test("calls logout function when Logout button is clicked", () => {
    render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Logout/i));

    expect(mockDispatch).toHaveBeenCalledWith(handleLogout());
  });

  test("navigates to correct links", () => {
    const { container } = render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    const links = container.querySelectorAll("a");
    expect(links.length).toBe(3);
    expect(links[0].getAttribute("href")).toBe("/");
    expect(links[1].getAttribute("href")).toBe("/leaderboard");
    expect(links[2].getAttribute("href")).toBe("/new");
  });
});
