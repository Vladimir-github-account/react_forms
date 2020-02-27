import React, { Component }       from 'react';
import PropTypes                  from 'prop-types';
import './PasswordInput.css';
import classNames                 from 'classnames';
import Icon                       from '@mdi/react';
import { mdiEye } from '@mdi/js';

class PasswordInput extends Component {
  constructor(props) {
    super( props );
    this.state = {
      type: 'password'
    };
  }

  changeType = () => {
    const { type } = this.state;
    this.setState( {
      type: type === 'password' ? 'text' : 'password'
    } )
    ;
  };

  render() {
    const { icon, placeholder, onChange, onSubmit, autoFocus, value, pattern } = this.props;
    const { type } = this.state;
    let isValid;
    if ( pattern && value.length > 0 ) {
      isValid = pattern.test( value );
    } else {
      isValid = null;
    }
    const styles = classNames(
        'passwordInputWrapper',
        { 'valid': isValid },
        { 'notValid': isValid === false }
    );
    return (
        <div className={styles}>
          <div className='iconWrapper'>
            <Icon path={icon}
                  size='24px'
                  color='rgba(0,0,0,0.4)'/>
          </div>
          <input type={type}
                 value={value}
                 onChange={onChange}
                 placeholder={placeholder}
                 onSubmit={onSubmit}
                 autoFocus={autoFocus}
                 className='passwordInput'
               />
          <div className='iconWrapper changeTypeIconWrapper'>
            <Icon path={mdiEye}
                  size='18px'
                  color='rgba(0,0,0,0.7)'
                  onClick={this.changeType}/>
          </div>
        </div>

    );
  }
}

PasswordInput.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,
  pattern: PropTypes.instanceOf( RegExp )
};
export default PasswordInput;