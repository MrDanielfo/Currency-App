import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ message }) => (
  <div className="alert alert-dismissible alert-danger py-1">
    <p className="text-primary">{message}</p>
  </div>
);

Error.propTypes = {
    message: PropTypes.string.isRequired
}

export default Error;
