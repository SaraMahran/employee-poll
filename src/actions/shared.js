import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { _getInitialData } from "../utils/_DATA";

export function handleInitialData() {
  return (dispatch) => {
    return _getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
