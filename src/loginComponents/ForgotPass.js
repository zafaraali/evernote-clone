import React from 'react';
import fire from '../config/Fire';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Login';

class ForgotPass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      login: false
    };
  }

  validateEmail(email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  forgotPassword = email => {
    if (email === '') {
      toast.error('Empty Email Field.', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1500
      });
    } else {
      fire
        .auth()
        .sendPasswordResetEmail(email)
        .then(function(user) {
          toast.success('Check Your Email', {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500
          });
        })
        .catch(function(e) {
          toast.error(e.message, {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: 1500
          });
        });
    }
  };

  render() {
    return (
      <>
        {!this.state.login ? (
          <div className='col-md-6 auth'>
            <h1>Forgot Password</h1>
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

              <button
                type='button'
                onClick={e => {
                  e.preventDefault();

                  this.setState({
                    login: true
                  });
                }}
                className='btn btn-primary'
                style={{ backgroundColor: '#29487d', borderColor: '#29487d' }}
              >
                Back To Login
              </button>
              <button
                type='submit'
                onClick={e => {
                  e.preventDefault();
                  this.forgotPassword(this.state.email);
                }}
                className='btn btn-danger'
                style={{ marginLeft: '25px' }}
              >
                Send Email
              </button>
            </form>
          </div>
        ) : (
          <Login />
        )}
      </>
    );
  }
}
export default ForgotPass;
