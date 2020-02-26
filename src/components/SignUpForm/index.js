import React, {Component} from 'react';
import _                  from 'lodash';
import Input              from '../Input';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isPasswordMatch: null,
    };
  }

  submitHandler = (e) => {
    const {data} = this.state;
    const body = JSON.stringify(_.omit(data, 'confirmPassword'));
    const isPasswordMatch = data.confirmPassword === data.password &&
        data.confirmPassword && data.password;
    if (isPasswordMatch) {
      const options = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body,
      };
      fetch('http://192.168.0.106:3000/authorization/sign_up', options)
          .then(response => console.log(response));
      this.setState({
                      data: {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                      },
                      isPasswordMatch: true,
                    });
    } else {
      console.log('Not match');
      const state = _.clone(this.state);
      state.isPasswordMatch = false;
      this.setState(state);
    }
    e.preventDefault();
  };

  handleChange(field) {
    return (e) => {
      const state = _.clone(this.state);
      state.data[field] = e.currentTarget.value;
      this.setState(state);
    };
  }

  render() {
    let text;
    if (this.state.isPasswordMatch === null) {
      text = '';
    } else if (this.state.isPasswordMatch) {
      text = 'OK';
    } else {
      text = 'Not match';
    }
    return (
        <form action="POST" onSubmit={this.submitHandler}>
          <Input type="text"
                 value={this.state.data.firstName}
                 onChange={this.handleChange('firstName')}
                 placeholder="First Name"
                 autoFocus={true}
                 pattern={/^[A-Z][a-z]{0,63}$/}/>
          <Input type="text"
                 value={this.state.data.lastName}
                 placeholder="Last Name"
                 onChange={this.handleChange('lastName')}/>
          <Input type="text"
                 value={this.state.data.email}
                 placeholder="E-mail"
                 onChange={this.handleChange('email')}
          />
          <Input type="password"
                 value={this.state.data.password}
                 placeholder="Password"
                 onChange={this.handleChange('password')}/>
          <Input type="password"
                 value={this.state.data.confirmPassword}
                 onChange={this.handleChange('confirmPassword')}
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