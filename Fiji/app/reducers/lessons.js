const initialState = {
  isFetching: false,
  lessons: []
}

const lessons = (state = initialState, action) => {
  switch(action.type) {
    case 'START_FETCHING_LESSONS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVED_LESSONS':
      return Object.assign({}, state, {
        isFetching: false,
        lessons: action.lessons
      })
    case 'FAILED_FETCHING_LESSONS':
      return Object.assign({}, state, {
        isFetching: false,
        lessons: []
      })
    default:
      return state
  }
}

export default lessons