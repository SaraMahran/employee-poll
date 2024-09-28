import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NewPoll from "../components/NewPoll";
import rootReducer from "../reducers";

const mockStore = createStore(rootReducer, {
  authedUser: "testUser",
});

describe("NewPoll", () => {
  it("should render the component", () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display all elements", () => {
    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    expect(getByLabelText("Option One")).toBeInTheDocument();
    expect(getByLabelText("Option Two")).toBeInTheDocument();
    expect(getByText("Submit Poll")).toBeInTheDocument();
  });

  it("should allow users to input text for options", () => {
    const { getByLabelText } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll />
        </BrowserRouter>
      </Provider>
    );

    const optionOneInput = getByLabelText("Option One");
    const optionTwoInput = getByLabelText("Option Two");

    fireEvent.change(optionOneInput, { target: { value: "Texas" } });
    fireEvent.change(optionTwoInput, { target: { value: "New Hampshire" } });

    expect(optionOneInput.value).toBe("Texas");
    expect(optionTwoInput.value).toBe("New Hampshire");
  });

  it("should submit the form correctly", () => {
    const mockDispatch = jest.fn();
    const { getByLabelText, getByText } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NewPoll dispatch={mockDispatch} />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.change(getByLabelText("Option One"), {
      target: { value: "Option 1" },
    });
    fireEvent.change(getByLabelText("Option Two"), {
      target: { value: "Option 2" },
    });

    fireEvent.click(getByText("Submit Poll"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "ADD_QUESTION",
      question: {
        optionOneText: "Option 1",
        optionTwoText: "Option 2",
        author: "testUser",
      },
    });
  });
});
