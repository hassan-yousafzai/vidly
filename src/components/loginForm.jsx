import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { login } from './../services/authService';
class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await login(username, password);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;

        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;

// old way of accessing form data in vanilla javascript
// const username = document.getElementById('username').value;

// if you really have to work with the 'document'. you can use the ref
// 1. username = React.createRef(); 2.  <input ref={this.username}.../> 3. const u = this.username.current.value

// to auto focus on load
//   componentDidMount() {
//     this.username.current.focus();
//   }
