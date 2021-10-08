import { push, goBack } from 'connected-react-router'

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
} from './types.js';

export const setActiveNavigation = view => {
  return {
    type: UPDATE_NAV,
    payload: view,
  }
}

export const updateEditingNoteValue = payload => {
	return {
		type: UPDATE_EDITING_NOTE_VALUE,
		payload
	}
}

export const timerFinished = () => {
	return {
		type: TIMER_FINISHED
	}
}

export const timerPause = payload => {

	return {
		type: TIMER_PAUSED,
		payload
	}
}

export const timerStart = () => {
	return {
		type: TIMER_START
	}
}

export const timerReset = () => {
	return {
		type: TIMER_RESET
	}
}

export const timerBegin = () => {
	return {
		type: TIMER_BEGIN
	}	
}

export const timerReinstantiate = payload => {
	return {
		type: TIMER_REINSTANTIATE,
		payload
	}
}

export const localStorageDataLoaded = () => {
	return {
		type: LOCAL_STORAGE_LOADED
	}
}

export const setActiveNote = note => {
	return {
		type: NOTE_SET_ACTIVE,
		payload: note.id
	}
}

export const startActiveNote = () => {
	return {
		type: NOTE_START_ACTIVE
	}
}

export const removeActiveNote = () => {
	return {
		type: NOTE_DEACTIVATE
	}
}

export const setOpenNote = note => {
	const { id, content } = note
		return {
			type: NOTE_SET_OPEN,
			payload: {
				id,
				content
			}
	}
}

export const updateView = payload => {
	return {
		type: NOTE_UPDATE_VIEW,
		payload
	}
}

export const closeNote = () => {
	return {
		type: NOTE_CLOSE
	}
}

export const addNewNote = payload => {
	return {
		type: NOTE_ADD_NEW,
		payload
	}
}

export const pushRouter = route => {
	return push(`/${route}`)
}

export const goBackRouter = route => {
	return goBack()
}

export const deleteNote = note => {
	return {
		type: NOTE_DELETE,
		payload: note.id
	}
}

export const addNewWorkout = payload => {
	return {
		type: WORKOUT_ADD_NEW,
		payload
	}
}
export const deleteWorkout = index => {
	return {
		type: WORKOUT_DELETE,
		payload: index
	}
}
export const updateWorkout = (workoutInfo, workoutIndex) => {
	return {
		type: WORKOUT_UPDATE_KEY,
		payload : {
			workoutInfo,
			workoutIndex
		}
	}
}
export const addSet = (setInfo, workoutIndex) => {
	return {
		type: SETS_ADD_NEW,
		payload: {
			setInfo,
			workoutIndex
		}
	}
}

export const updateSet = (setInfo, setIndex, workoutIndex) => {
	return {
		type: SETS_UPDATE,
		payload: {
			setInfo,
			setIndex,
			workoutIndex	
		}
	}
}
export const deleteSet = (setIndex, workoutIndex) => {
	return {
		type: SETS_DELETE,
		payload: {
			setIndex,
			workoutIndex
		}
	}
}
