import React from 'react';
import fire from '../config/Fire';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgotPass from './ForgotPass';
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      password2: '',
      signup: false,
      forgotPass: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  login = e => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      toast.error('One or more fields are empty.', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500
      });
    } else {
      fire
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(u => {})
        .catch(error => {
          toast.error(error.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1700
          });
        });
    }
  };
  validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }
  signup = e => {
    e.preventDefault();
    if (
      this.state.password === '' ||
      this.state.password2 === '' ||
      this.state.email === ''
    ) {
      toast.error('One or more fields are empty.', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500
      });
    } else {
      if (!this.validateEmail(this.state.email)) {
        toast.error('Invalid email.', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1500
        });
      }

      if (this.state.password === this.state.password2) {
        fire
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.password)
          .then(u => {})
          .then(u => {})
          .catch(error => {
            toast.error(error.message, {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 1500
            });
          });
      } else {
        toast.error('Passwords do not match.', {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1500
        });
      }
    }
  };

  render() {
    return (
      <>
        {!this.state.forgotPass ? (
          <div className='col-md-6 auth'>
            <h1>{this.state.signup ? 'Sign Up' : 'Log In'}</h1>
            <form>
              <div className='form-group'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  value={this.state.email}
                  onChange={this.handleChange}
                  type='email'
                  name='email'
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  value={this.state.password}
                  onChange={this.handleChange}
                  type='password'
                  name='password'
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              {this.state.signup ? (
                <>
                  <label htmlFor='exampleInputPassword2'>
                    Confirm Password
                  </label>
                  <input
                    value={this.state.password2}
                    onChange={this.handleChange}
                    type='password'
                    name='password2'
                    className='form-control'
                    id='exampleInputPassword2'
                    placeholder='Confirm Password'
                  />
                  <br />
                </>
              ) : (
                <></>
              )}
              <button
                type={!this.state.signup ? 'submit' : 'button'}
                onClick={e => {
                  e.preventDefault();
                  if (!this.state.signup) {
                    this.login(e);
                  }
                  this.setState({
                    signup: false
                  });
                }}
                className='btn btn-primary'
                style={{ backgroundColor: '#29487d', borderColor: '#29487d' }}
              >
                {!this.state.signup ? 'Login' : 'Back To Login'}
              </button>
              <button
                type={this.state.signup ? 'submit' : 'button'}
                onClick={e => {
                  e.preventDefault();
                  if (this.state.signup) {
                    this.signup(e);
                  }
                  this.setState({
                    signup: true
                  });
                }}
                style={{ marginLeft: '25px' }}
                className='btn btn-success'
              >
                Signup
              </button>
              {!this.state.signup ? (
                <button
                  type='button'
                  onClick={e => {
                    e.preventDefault();

                    this.setState({
                      forgotPass: true
                    });
                  }}
                  className='btn btn-danger'
                  style={{ marginLeft: '25px' }}
                >
                  Forgot Password
                </button>
              ) : null}
            </form>
          </div>
        ) : (
          <ForgotPass />
        )}
      </>
    );
  }
}
export default Login;
