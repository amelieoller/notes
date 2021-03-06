export const createLecture = (lecture) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('lectures')
    .add(lecture)
    .then((docRef) => {
      dispatch({ type: 'CREATE_LECTURE', lecture });
      // Only set a new current lecture if there is no lectureId coming in or
      // If there is a lecture with an id currently in state
      if (!getState().currentLectureToEdit.id && !lecture.id) {
        dispatch({ type: 'SET_CURRENT_LECTURE', lecture: { ...lecture, id: docRef.id } });
      }

      return docRef.id;
    })
    .catch((err) => {
      dispatch({ type: 'CREATE_LECTURE_ERROR', err });
    });
};

export const updateLecture = (lecture) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('lectures')
    .doc(lecture.id)
    .update(lecture)
    .then(() => {
      dispatch({ type: 'SET_CURRENT_LECTURE', lecture });
      dispatch({ type: 'UPDATE_LECTURE', lecture });
    })
    .catch((err) => {
      dispatch({ type: 'UPDATE_LECTURE_ERROR', err });
    });
};

export const deleteLecture = (key) => (dispatch, getState, getFirebase) => {
  const firestore = getFirebase().firestore();

  firestore
    .collection('lectures')
    .doc(key)
    .delete()
    .then(() => {
      dispatch({ type: 'DELETE_LECTURE', key });
    })
    .catch((err) => {
      dispatch({ type: 'DELETE_LECTURE_ERROR', err });
    });
};
