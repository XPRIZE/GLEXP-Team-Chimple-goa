import { combineReducers } from 'redux'

import lesson from './lesson'
import lessons from './lessons'
import nav from './nav'

const rootReducer = combineReducers({
    lesson,
    lessons,
    nav
})

export default rootReducer