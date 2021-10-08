import {
  UPDATE_NAV,
  UPDATE_EDITING_NOTE_VALUE,
  TIMER_FINISHED,
  TIMER_PAUSED,
  TIMER_START,
  TIMER_RESET,
  TIMER_BEGIN,
  TIMER_REINSTANTIATE,
  LOCAL_STORAGE_LOADED,
  NOTE_SET_ACTIVE,
  NOTE_START_ACTIVE,
  NOTE_DEACTIVATE,
  NOTE_SET_OPEN,
  NOTE_CLOSE,
  NOTE_ADD_NEW,
  NOTE_DELETE,
  NOTE_UPDATE_VIEW,
  WORKOUT_ADD_NEW,
  WORKOUT_DELETE,
  WORKOUT_UPDATE_KEY,
  SETS_ADD_NEW,
  SETS_UPDATE,
  SETS_DELETE
} from '../actions/types.js';

const workOutNote = {
  id: 1,
  day: 'push',
  workouts: [
    {
      displayName: "incline press",
      notes: "",
      type: "dumbbell", // dumbell, barbell, machine, cable, body weight
      sets: [{
        weigth: 75,
        reps: 6
      }, {
        weigth: 80,
        reps: 6
      }, {
        weigth: 80,
        reps: 8
      }, {
        weigth: 65,
        reps: 6
      }]
    }, {
      displayName: "dips",
      notes: "",
      type: "machine",
      sets: [{
        weight: 155,
        reps: 10
      }, {
        weight: 210,
        reps: 8
      }, {
        weight: 220,
        reps: 6
      }, {
        weight: 230,
        reps: 6
      }, {
        weight: 175,
        reps: 12
      }]
    }
  ],
  startedAt: 1530325130110,
  finishedAt: 1530325350110
}

const initialState = {
  activePage: 'home',
  editingNoteValue: '',
  timeStarted: null,
  timerRunning: false,
  timerState: 3,
  editing: false,
  timeLeft: 120000,
  localStorageLoading: true,
  notes: [],
  openNote: null,
  activeNote: null,
  activeNoteStarted: false,
  activeNoteTimeStarted: null,

}

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPDATE_NAV:
      return {
        ...state,
        activePage: payload
      }
    case UPDATE_EDITING_NOTE_VALUE:
      return {
        ...state,
        editing: true,
        editingNoteValue: payload
      }
    case TIMER_FINISHED:
      return {
        ...state,
        timerRunning: false,
        timerState: 0
      }
    case TIMER_PAUSED:
      return {
        ...state,
        timerRunning: false,
        timerState: 1,
        timeLeft: payload
      }
    case TIMER_START:
      return {
        ...state,
        timerRunning: true,
        timerState: 2
      }
    case TIMER_RESET:
      return {
        ...state,
        timerRunning: false,
        timeLeft: 120000,
        timerState: 3
      }
    case TIMER_BEGIN:
      return {
        ...state,
        timerRunning: true,
        timeStarted: Date.now(),
        timerState: 2
      }
    case TIMER_REINSTANTIATE:
      return {
        ...state,
        timeStarted: payload,
        timerState: 2
      }
    case LOCAL_STORAGE_LOADED:
      return {
        ...state,
        localStorageLoading: false
      }
    case NOTE_SET_ACTIVE:
      return {
        ...state,
        activeNote: payload.id
      }
    case NOTE_START_ACTIVE:
      return {
        ...state,
        activeNoteStarted: true,
        activeNoteTimeStarted: Date.now(),
        notes: state.notes.map(n => n.id === state.activeNote ? Object.assign(n, {startedAt: Date.now()}) : n)
      }
    case NOTE_DEACTIVATE:
      return {
        ...state,
        activeNote: null,
        activeNoteStarted: false,
        activeNoteTimeStarted: null,
        notes: state.notes.map(n => n.id === state.activeNote ? Object.assign(n, {finishedAt: Date.now()}) : n)
      }
    case NOTE_SET_OPEN:
      return {
        ...state,
        openNote: payload.id,
        editingNoteValue: payload.content
      }
    case NOTE_CLOSE:
      return {
        ...state,
        openNote: null,
        notes: state.notes.map(n => n.id === state.openNote ? Object.assign(n, {content: state.editingNoteValue}) : n)
      }
    case NOTE_ADD_NEW:
      return {
        ...state,
        activeNote: payload.id,
        notes: [payload].concat(state.notes)
      }
    case NOTE_DELETE:
      return {
        ...state,
        notes: state.notes.filter(n => n.id !== payload)
      }
    case NOTE_UPDATE_VIEW:
    const noteWithNewView = state.notes.find(n => n.id === state.activeNote)
    noteWithNewView.view = action.payload
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithNewView : n)
      }
    case WORKOUT_ADD_NEW:
      //expected payload schema:
      /*
        {
          displayName: "incline press",
          notes: "",
          type: "dumbbell", // dumbell, barbell, machine, cable, body weight
        }
      */
      const noteWithNewWorkout = state.notes.find(n => n.id === state.activeNote)
      noteWithNewWorkout.workouts.push(payload)
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithNewWorkout : n)
      }
    case WORKOUT_DELETE:
      const noteWithDeletedWorkout = Object.assign({}, state.notes.find(n => n.id === state.activeNote))
      noteWithDeletedWorkout.workouts.splice(payload, 1)
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithDeletedWorkout : n)
      }
    case WORKOUT_UPDATE_KEY:
      //expected payload schema: 
      /*
        {
          workoutInfo: {displayName: 'changedName'},
          notes: "",
          workoutIndex: 2
        }
      */
      const noteWithUpdatedWorkout = state.notes.find(n => n.id === state.activeNote)
      const newWorkoutInfo = Object.assign(noteWithUpdatedWorkout.workouts[payload.workoutIndex], payload.workoutInfo)
      noteWithUpdatedWorkout.workouts[payload.workoutIndex] = newWorkoutInfo;
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithUpdatedWorkout : n)
      }
    case SETS_ADD_NEW:
      //expected payload schema: 
      /*
        {
          setInfo: {
            weigth: 75,
            reps: 6
          },
          workoutIndex: 2
        }
      */
      const noteWithNewSet = state.notes.find(n => n.id === state.activeNote)
      noteWithNewSet.workouts[payload.workoutIndex].sets.push(payload.setInfo)
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithNewSet : n)
      }
    case SETS_UPDATE:
      //expected payload schema: 
      /*
        {
          setInfo: { reps: 12 },
          setIndex: 2,
          workoutIndex: 4
        }
      */
      const noteWithUpdatedSet = state.notes.find(n => n.id === state.activeNote)
      const newSetInfo =  Object.assign(noteWithUpdatedSet.workouts[payload.workoutIndex].sets[payload.setIndex], payload.setInfo)
      noteWithUpdatedSet.workouts[payload.workoutIndex].sets[payload.setIndex] = newSetInfo;
      return {
        ...state,
        notes: state.notes.map(n => n.id === state.activeNote ? noteWithUpdatedSet : n)
      }
    case SETS_DELETE:
      // expected payload schema:
      /*
        {
          setIndex: 3,
          workoutIndex: 1
        }
      */
      const noteWithDeletedSet = state.notes.find(n => n.id === state.activeNote)
        .workouts[payload.workoutIndex].sets.splice(payload.setIndex, 1)
      return {
        ...state,
      }
    default:
      return state;
  }
}
