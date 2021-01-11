import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const headers = {
    'Authorization': process.env.ACCESS_TOKEN
  }

  //Search Users
  const searchUsers = async user => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${user}`, {
        headers
      }
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  //Get User
  const getUser = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}`, {
        headers
      }
    );

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //Get Repos
  const getUserRepos = async username => {
    setLoading(true);

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`, {
        headers
      }
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };
  //Clear Users
  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };

  //Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
