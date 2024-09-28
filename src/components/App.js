import React, { useEffect } from "react";
import "../styles/app.css";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import NewPoll from "../components/NewPoll";
import Poll from "../components/Poll";
import { connect } from "react-redux";
import Login from "../components/Login";
import { handleInitialData } from "../actions/shared";
import Leaderboard from "../components/Leaderboard";
import PageNotFound from "../components/PageNotFound";
import PrivateRoute from "../components/PrivateRoute";

function App({ dispatch, loggedIn }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-4">
      {loggedIn && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          exact
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions/:id"
          element={
            <PrivateRoute>
              <Poll />
            </PrivateRoute>
          }
        />
        <Route
          path="/new"
          exact
          element={
            <PrivateRoute>
              <NewPoll />
            </PrivateRoute>
          }
        />
        <Route path="/404" exact element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

const mapStateToProps = ({ authedUser }) => ({
  loggedIn: !!authedUser,
});

export default connect(mapStateToProps)(App);
