import React from 'react';
import './Evernote.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

class Evernote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
  }

  render() {
    return (
      <div className='app-container'>
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
          user={this.props.user.email}
        />
        {this.state.selectedNote ? (
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            notes={this.state.notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }

  // fetch notes from firestore database
  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        var notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;

          if (this.props.user.email === data.email) {
            return data;
          }
        });
        notes = notes.filter(function(element) {
          return element !== undefined;
        });
        this.setState({
          notes: notes
        });
      });
  };

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note
    });
  };

  noteUpdate = (id, noteObject) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObject.title,
        body: noteObject.body,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: this.props.user.email
      });
  };

  newNote = async title => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: this.props.user.email
      });
    const newID = newFromDB.id;
    await this.setState({
      notes: [...this.state.notes, note]
    });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(_note => _note.id === newID)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  deleteNote = async note => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter(_note => _note !== note)
    });
    // if deleting selected note then deselect note to avoid null error
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({
        selectedNoteIndex: null,
        selectedNote: null
      });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({
            selectedNoteIndex: null,
            selectedNote: null
          });
    }
    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete();
  };
}

export default Evernote;
