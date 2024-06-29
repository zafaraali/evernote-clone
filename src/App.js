import React, { Component } from 'react';
import fire from './config/Fire';
import Evernote from './Evernote';
import Login from './loginComponents/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
    // Call it once in your app. At the root of your app is the best place
    toast.configure();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }

  render() {
    return (
      <>{this.state.user ? <Evernote user={this.state.user} /> : <Login />}</>
    );
  }
}

export default App;
