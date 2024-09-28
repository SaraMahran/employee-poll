import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/authedUser";

const Navbar = ({ dispatch, authedUserId }) => {
  const logout = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
  };

  return (
    <nav className="flex justify-center space-x-4">
      <Link
        to="/"
        className="font-medium px-3 py-2 dark:text-teal-500 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Home
      </Link>
      <Link
        to="/leaderboard"
        className="font-medium px-3 py-2 dark:text-teal-500 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Leaderboard
      </Link>
      <Link
        to="/new"
        className="font-medium px-3 py-2 dark:text-teal-500 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        New Poll
      </Link>
      <span
        className="font-medium px-3 py-2 dark:text-teal-500"
        data-testid="user-information"
      >
        User: {authedUserId}
      </span>
      <button
        onClick={logout}
        className="font-medium px-3 py-2 dark:text-teal-500 rounded-lg hover:bg-slate-100 hover:text-slate-900"
      >
        Logout
      </button>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => {
  const user = users[authedUser];
  return {
    authedUserId: user ? user.id : null,
    authedUserName: user ? user.name : "Guest",
  };
};

export default connect(mapStateToProps)(Navbar);
