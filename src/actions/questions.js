import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { addAnswerUser, addQuestionUser } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export function handleAddQuestion({ optionOneText, optionTwoText }) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser,
    };

    return _saveQuestion(question).then((savedQuestion) => {
      dispatch(addQuestion(savedQuestion));
      dispatch(addQuestionUser(savedQuestion));
    });
  };
}

export function handleAddAnswer(questionId, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    return _saveQuestionAnswer({
      authedUser,
      qid: questionId,
      answer,
    })
      .then(() => {
        dispatch(addAnswerQuestion(authedUser, questionId, answer));
        dispatch(addAnswerUser(authedUser, questionId, answer));
      })
      .catch((e) => {
        console.error("Error in handleAddAnswer: ", e);
        alert("There was an error submitting your vote. Please try again.");
      });
  };
}
