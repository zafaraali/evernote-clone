import React, { Component } from 'react';
import fire from '../config/Fire';

export default class Home extends Component {
  logout = () => {
    fire.auth().signOut();
  };
  render() {
    const { user } = this.props;

    return (
      <div className='col-md-6'>
        <h1>{`Hey, ${user.email}`}</h1>
        <br />
        <br />
        <button onClick={this.logout} className='btn btn-primary'>
          Log Out
        </button>
      </div>
    );
  }
}
