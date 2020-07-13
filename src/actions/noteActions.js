export const createNote = (note) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('notes')
    .add(note)
    .then((docRef) => {
      dispatch({ type: 'CREATE_NOTE', note });
      dispatch({ type: 'SET_CURRENT_NOTE', note: { ...note, id: docRef.id } });
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_NOTE_ERROR', err });
    });
};

export const updateNote = (note) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('notes')
    .doc(note.id)
    .update(note)
    .then(() => {
      dispatch({ type: 'UPDATE_NOTE', note });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_NOTE_ERROR', err });
    });
};

export const deleteNote = (key) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('notes')
    .doc(key)
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_NOTE', key });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_NOTE_ERROR', err });
    });
};
