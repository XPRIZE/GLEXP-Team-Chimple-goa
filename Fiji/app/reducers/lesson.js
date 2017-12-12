const initialState = {
  isFetching: false,
  cards: []
}

const lesson = (state = initialState, action) => {
  switch(action.type) {
    case 'START_FETCHING_LESSON_CARDS':
      return Object.assign({}, state, {
        isFetching: true
      })
    case 'RECEIVED_LESSON_CARDS':
      return Object.assign({}, state, {
        isFetching: false,
        cards: action.cards
      })
    case 'FAILED_FETCHING_LESSON_CARDS':
      return Object.assign({}, state, {
        isFetching: false,
        cards: []
      })
    default:
      return state
  }
}

export default lesson