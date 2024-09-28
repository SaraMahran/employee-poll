import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import App from "./App";

const mockStore = configureStore([]);
const store = mockStore({
  []
});

describe("Application Setup", () => {
  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.getByText(/Would You Rather/i)).toBeInTheDocument();
  });

  test("has correct README with installation instructions", () => {
   
  });
});

describe("Application Functionality", () => {
  test("displays unanswered polls by default", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText(/Unanswered Polls/i)).toBeInTheDocument();
    expect(screen.queryByText(/Answered Polls/i)).toBeNull();
  });

  test("shows correct poll details", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(/View Poll/i)); 

    expect(await screen.findByText(/Would You Rather/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Option 2/i)).toBeInTheDocument();
  });

  test("allows user to vote on a poll", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(/View Poll/i));
    fireEvent.click(screen.getByText(/Option 1/i)); 

    expect(
      await screen.findByText(/Your vote has been recorded/i)
    ).toBeInTheDocument();
  });

  test("new polls can be added", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Create Poll/i));
    fireEvent.change(screen.getByPlaceholderText(/Option 1/i), {
      target: { value: "New Option 1" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Option 2/i), {
      target: { value: "New Option 2" },
    });
    fireEvent.click(screen.getByText(/Submit/i));

    expect(screen.getByText(/New Poll Created/i)).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("changes poll option when clicked", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.click(screen.getByText(/View Poll/i));
    const option = screen.getByText(/Option 1/i);
    fireEvent.click(option);

    expect(option).toHaveClass("selected"); 
  });
});
