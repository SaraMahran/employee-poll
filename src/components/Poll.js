import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { handleAddAnswer } from "../actions/questions";
import "../styles/Poll.css";

const Poll = ({ dispatch, authedUser, question, author }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!question || !authedUser || !author) {
    if (!questions || !users || !authedUser) {
      return <div>Loading...</div>;
    }

    if (!question) {
      return <Navigate to="/404" />;
    }

    if (!authedUser || !author) {
      return <Navigate to="/404" />;
    }
  }

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleOptionOne = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionOne"));
    setSubmissionMessage("Your vote has been submitted!");
    navigate("/");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    dispatch(handleAddAnswer(question.id, "optionTwo"));
    setSubmissionMessage("Your vote has been submitted!");
    navigate("/");
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    return option === "optionOne"
      ? (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
      : (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Poll by {author.id}</h1>

      <div className="flex justify-center">
        <img src={author.avatarURL} alt="Profile" className="h-24 w-24" />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <button
          onClick={handleOptionOne}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (hasVotedForOptionOne ? "bg-lime-400" : "")
          }
        >
          <div className={hasVotedForOptionOne ? "chosen" : ""}>
            <p className="font-bold mb-2">{question.optionOne.text}</p>
            {!hasVoted && (
              <p className="underline underline-offset-4 mb-3">Click</p>
            )}
            {hasVoted && (
              <p className="text-xs">
                Votes: {question.optionOne.votes.length} (
                {calcPercentage("optionOne", question)})
              </p>
            )}
          </div>
        </button>

        <button
          onClick={handleOptionTwo}
          disabled={hasVoted}
          className={
            "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
            (hasVotedForOptionTwo ? "bg-lime-400" : "")
          }
        >
          <p className="font-bold mb-2">{question.optionTwo.text}</p>
          {!hasVoted && (
            <p className="underline underline-offset-4 mb-3">Click</p>
          )}
          {hasVoted && (
            <p className="text-xs">
              Votes: {question.optionTwo.votes.length} (
              {calcPercentage("optionTwo", question)})
            </p>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  const { id } = useParams();
  const question = questions[id];
  const author = question ? users[question.author] : null;
  console.log("Mapped question:", question);
  console.log("Mapped author:", author);
  return { authedUser, question, author };
};

export default connect(mapStateToProps)(Poll);
