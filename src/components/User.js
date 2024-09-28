import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLoginUsers } from "../actions/shared";

const User = (props) => {
  const navigate = useNavigate();

  const { avatarURL, name, authorAvatarURL } = props;

  const logout = () => {
    props.dispatch(handleLoginUsers(null));
    navigate("/");
  };

  return (
    <div className="user">
      <img
        src={authorAvatarURL || avatarURL}
        alt="author avatar"
        width="35"
        height="35"
      />
      <button
        data-testid="test-logout"
        className="logout-button"
        onClick={logout}
      >
        Logout
      </button>
      <div className="user-name">{name}</div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }, { questionId }) => {
  const user = users[authedUser];
  const { avatarURL, name } = user;

  const question = questions[questionId];
  const authorId = question.author;

  const authorAvatarURL = users[authorId]?.avatarURL || "";

  return {
    avatarURL, 
    authorAvatarURL, =
  };
};

export default connect(mapStateToProps)(User);
