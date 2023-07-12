import PropTypes from "prop-types";

export const inputPT = {
    title   : PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name    : PropTypes.string.isRequired,
    type    : PropTypes.string.isRequired,
    error   : PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired,
  };