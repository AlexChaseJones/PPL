// not sure if used stuff
export const LOADING = 'app/loading'
export const UPDATE_NAV = 'app/update_nav'
export const LOCAL_STORAGE_LOADED = 'local/storage/loaded'

// timer shit
export const TIMER_FINISHED = 'timer/finished'
export const TIMER_PAUSED = 'timer/paused'
export const TIMER_START = 'timer/start'
export const TIMER_RESET = 'timer/reset'
export const TIMER_BEGIN = 'timer/begin'
export const TIMER_HOLD = 'timer/hold'
export const TIMER_REINSTANTIATE = 'timer/renistantiate'

// opening and closing notes
export const NOTE_SET_OPEN = 'note/open'
export const NOTE_CLOSE = 'note/close'

// creating/deleting/updating
export const NOTE_ADD_NEW = 'note/add'
export const NOTE_DELETE = 'note/delete'
export const UPDATE_EDITING_NOTE_VALUE = 'update/editing/note/value'
export const NOTE_UPDATE_VIEW = 'note/update/view'

// note activation stuff
export const NOTE_SET_ACTIVE = 'note/active'
export const NOTE_DEACTIVATE = 'note/deactivate'
export const NOTE_START_ACTIVE = 'note/start/active'

//workout specific actions
export const WORKOUT_ADD_NEW = 'workout/add'
export const WORKOUT_DELETE = 'workout/delete'
export const WORKOUT_UPDATE_KEY = 'workout/update/key' // might not use

//set specific stuff
export const SETS_ADD_NEW = 'sets/add'
export const SETS_UPDATE = 'sets/update'
export const SETS_DELETE = 'sets/delete'

const workOutNote = {
  id: 1,
  day: 'push',
  workouts: {
    inclinePress: {
      displayName: "incline press",
      type: "dumbbell", // dumbell, barbell, machine, cable, body weight
      sets: [{
        weigth: 75,
        reps: 6,
        note: ""
      }, {
        weigth: 80,
        reps: 6,
        note: ""
      }, {
        weigth: 80,
        reps: 8,
        note: ""
      }, {
        weigth: 65,
        reps: 6,
        note: ""
      }]
    },
    dips: {
      displayName: "dips",
      type: "machine",
      sets: [{
        weight: 155,
        reps: 10,
        notes: ""
      }, {
        weight: 210,
        reps: 8,
        notes: ""
      }, {
        weight: 220,
        reps: 6,
        notes: ""
      }, {
        weight: 230,
        reps: 6,
        notes: ""
      }, {
        weight: 175,
        reps: 12,
        notes: ""
      }]
    }
  },
  startedAt: 1530325130110,
  finishedAt: 1530325350110
}