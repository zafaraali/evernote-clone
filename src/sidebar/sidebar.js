import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';
import fire from 'firebase';
class SidebarComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }

  logout = () => {
    fire.auth().signOut();
  };
  render() {
    const { notes, classes, selectedNoteIndex, user } = this.props;

    if (notes) {
      return (
        <div className={classes.sidebarContainer}>
          <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
            {this.state.addingNote ? 'Cancel' : 'New Note'}
          </Button>
          {this.state.addingNote ? (
            <div>
              <form>
                <input
                  type='text'
                  className={classes.newNoteInput}
                  placeholder='Enter Note Title'
                  onKeyUp={event => this.updateTitle(event.target.value)}
                />
                <Button
                  type='submit'
                  className={classes.newNoteSubmitBtn}
                  onClick={this.newNote}
                >
                  Submit
                </Button>
              </form>
            </div>
          ) : null}
          <List>
            {notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItemComponent
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </div>
              );
            })}
          </List>
          <h6
            style={{
              position: 'absolute',
              bottom: 5,
              left: 100,
              zIndex: '2'
            }}
          >
            {user}
          </h6>
          <button
            onClick={this.logout}
            className='btn btn-primary'
            style={{
              position: 'absolute',
              bottom: 5,
              left: 5,
              backgroundColor: '#29487d',
              borderColor: '#29487d'
            }}
          >
            Log Out
          </button>
        </div>
      );
    } else {
      return <div />;
    }
  }

  newNoteBtnClick = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    });
  };

  updateTitle = text => {
    this.setState({
      title: text
    });
  };

  selectNote = (n, i) => this.props.selectNote(n, i);

  deleteNote = note => {
    this.props.deleteNote(note);
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({
      title: null,
      addingNote: false
    });
  };
}

export default withStyles(styles)(SidebarComponent);
