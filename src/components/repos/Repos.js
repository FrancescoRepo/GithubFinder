import React from "react";
import RepoItem from "./RepoItem";
import PropTypes from "prop-types";

const Repos = ({ repos }) => {
  return repos.map(repo => <RepoItem key={repo.id} repo={repo} />);
};

export default Repos;
Repos.propTypes = {
  repos: PropTypes.array.isRequired
};
