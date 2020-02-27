import React      from 'react';
import PropTypes  from 'prop-types';
import './Input.css';
import classNames from 'classnames';
import Icon       from '@mdi/react';

function Input(props) {
  const { icon ,type, placeholder, onChange, onSubmit, autoFocus, value, pattern } = props;
  let isValid;
  if ( pattern && value.length > 0 ) {
    isValid = pattern.test( value );
  } else {
    isValid = null;
  }
  const styles = classNames(
      'inputWrapper',
      { 'valid': isValid },
      { 'notValid': isValid === false }
  );
  return (
      <div className={styles}>
        <div className='iconWrapper'>
          <Icon path={icon}
                size='18px'
                color='rgba(0,0,0,0.4)'/>
        </div>
        <input type={type}
               value={value}
               onChange={onChange}
               placeholder={placeholder}
               onSubmit={onSubmit}
               autoFocus={autoFocus}
               className='input'/>
      </div>

  );
}

Input.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,
  pattern: PropTypes.instanceOf( RegExp )
};
export default Input;