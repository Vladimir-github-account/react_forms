import React      from 'react';
import PropTypes  from 'prop-types';
import styles     from './Input.css';
import classNames from 'classnames';

function Input(props) {
  const {type, placeholder, onChange, onSubmit, autoFocus, value, pattern} = props;
  let isValid;
  if (pattern &&  value.length > 2) {
    isValid = pattern.test(value);
  } else {
    isValid = null;
  }

  const styles = classNames('input', {'valid': isValid}, {'notValid': isValid === false});
  console.log(isValid, 'isValid');
  return (
      <input type={type}
             value={value}
             onChange={onChange}
             placeholder={placeholder}
             onSubmit={onSubmit}
             autoFocus={autoFocus}
             pattern={pattern}
             className={styles}/>
  );
}

Input.propTypes = {
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,
  pattern: PropTypes.instanceOf(RegExp)
};
export default Input;