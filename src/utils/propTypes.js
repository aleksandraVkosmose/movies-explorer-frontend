import PropTypes from "prop-types";

export const inputPT = {
    title   : PropTypes.string.isRequired,
    name    : PropTypes.string.isRequired,
    type    : PropTypes.string.isRequired,
  };

  export const searchFormPT = {
    children    : PropTypes.element.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    searchText  : PropTypes.string.isRequired,
  };

  export const filterCheckboxPT = {
    onChangeFilter  : PropTypes.func.isRequired,
    filterShortFilms: PropTypes.bool.isRequired,
  };