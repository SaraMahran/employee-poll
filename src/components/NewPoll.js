import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

function NewPoll({ dispatch, authedUser }) {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (optionOneText && optionTwoText && authedUser) {
      dispatch(
        handleAddQuestion({
          optionOneText,
          optionTwoText,
          author: authedUser,
        })
      );

      setOptionOneText("");
      setOptionTwoText("");

      navigate("/");
    } else {
      console.error("Please provide optionOneText, optionTwoText, and author");
    }
  };

  return (
    <div className="new-poll">
      <h2 className="dark:text-teal-800 text-3xl">Create New Poll</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="optionOne" className="dark:text-teal-500 text-xl">
            Option One
          </label>
          <br />
          <input
            type="text"
            id="optionOne"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            placeholder="Enter first option"
          />
        </div>

        <div>
          <label htmlFor="optionTwo" className="dark:text-teal-500 text-xl">
            {" "}
            Option Two
          </label>
          <br />
          <input
            type="text"
            id="optionTwo"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            placeholder="Enter second option"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary bg-teal-600  border-2 border-red-200  rounded-lg px-4 py-2 text-red-200"
        >
          Submit Poll
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewPoll);
