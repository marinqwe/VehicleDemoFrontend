import React from 'react';
import PropTypes from 'prop-types';
import { StyledInput } from '../layouts';

function VehicleInput({ value, storeKey, ...restProps }) {
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    storeKey[name] = value;
  };
  return (
    <StyledInput value={value || ''} onChange={handleOnChange} {...restProps} />
  );
}

VehicleInput.defaultProps = {
  type: 'text',
  placeholder: 'Text goes here',
};

VehicleInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  storeKey: PropTypes.object.isRequired,
};

export default VehicleInput;
