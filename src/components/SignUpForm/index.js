import React, { Component } from 'react';
import _                    from 'lodash';
import Input                from '../Input';
import {
  USER_NAME_PATTERN,
  PASSWORD_PATTERN,
  EMAIL_PATTERN
}                           from '../../constants';

class SignUpForm extends Component {
  constructor(props) {
    super( props );
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isPasswordMatch: null,
      correctFields: new Map()
    };
    this.state.correctFields
        .set( 'firstName', false )
        .set( 'lastName', false )
        .set( 'email', false )
        .set( 'password', false )
        .set( 'confirmPassword', false );
  }

  submitHandler = (e) => {
    const { data, correctFields } = this.state;
    const body = JSON.stringify( _.omit( data, 'confirmPassword' ) );
    const isPasswordMatch = data.confirmPassword === data.password && data.password;
    let isEveryCorrect = true;
    correctFields.forEach( field => {
      if ( !field ) {
        isEveryCorrect = false;
        return;
      }
    } );
    if ( isPasswordMatch && isEveryCorrect ) {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body,
      };
      fetch( 'http://192.168.0.106:3000/authorization/sign_up', options )
          .then( response => console.log( response ) );
      this._devClearInputs();
    } else {
      const state = _.clone( this.state );
      state.isPasswordMatch = false;
      this.setState( state );
    }
    e.preventDefault();
  };

  handleChange(field, pattern = /.*/) {
    return (e) => {
      const state = _.clone( this.state );
      const { value } = e.currentTarget;
      state.data[field] = value;
      state.correctFields.set( field, pattern.test( value ) );
      this.setState( state );
    };
  }

  _devClearInputs() {
    const correctFields = new Map();
    correctFields
        .set( 'firstName', false )
        .set( 'lastName', false )
        .set( 'email', false )
        .set( 'password', false )
        .set( 'confirmPassword', false );
    this.setState( {
                     data: {
                       firstName: '',
                       lastName: '',
                       email: '',
                       password: '',
                       confirmPassword: '',
                       correctFields
                     },
                     isPasswordMatch: true,
                   } );
  }

  render() {
    let text;
    if ( this.state.isPasswordMatch === null ) {
      text = '';
    } else if ( this.state.isPasswordMatch ) {
      text = 'OK';
    } else {
      text = 'Not match or not correct data';
    }
    return (
        <form action="POST" onSubmit={this.submitHandler}>
          <Input type="text"
                 value={this.state.data.firstName}
                 onChange={this.handleChange( 'firstName', USER_NAME_PATTERN )}
                 placeholder="First Name"
                 autoFocus={true}
                 pattern={USER_NAME_PATTERN}/>
          <Input type="text"
                 value={this.state.data.lastName}
                 pattern={USER_NAME_PATTERN}
                 placeholder="Last Name"
                 onChange={this.handleChange( 'lastName', USER_NAME_PATTERN )}/>
          <Input type="text"
                 value={this.state.data.email}
                 pattern={EMAIL_PATTERN}
                 placeholder="E-mail"
                 onChange={this.handleChange( 'email', EMAIL_PATTERN )}
          />
          <Input type="password"
                 value={this.state.data.password}
                 pattern={PASSWORD_PATTERN}
                 placeholder="Password"
                 onChange={this.handleChange( 'password', PASSWORD_PATTERN )}/>
          <Input type="password"
                 value={this.state.data.confirmPassword}
                 pattern={PASSWORD_PATTERN}
                 onChange={this.handleChange(
                     'confirmPassword',
                     PASSWORD_PATTERN
                 )}
                 placeholder="Verify Password"/>
          <Input type="submit"
                 onSubmit={this.submitHandler}
                 value="Sign Up"/>
          <h1>Hello {text}</h1>
        </form>
    );
  }
}

export default SignUpForm;