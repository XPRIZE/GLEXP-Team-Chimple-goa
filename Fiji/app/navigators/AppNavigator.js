/**
 * Read https://reactnavigation.org/docs/guides/redux 
 * for integrating navigation with redux
 * @flow
 */

import React from 'react'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import LessonsContainer from '../containers/LessonsContainer'
import LessonContainer from '../containers/LessonContainer'
import ScoreCard from '../components/ScoreCard'
import HomeScreen from '../components/Home'

export const AppNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    },
  },
  LessonList: {
    screen: LessonsContainer,
    navigationOptions: {
      headerTitle: 'Lessons',
    },
  },
  Lesson: {
    screen: LessonContainer,
    navigationOptions: {
      mode: 'modal',
      header: null  
    }
  },
  ScoreCard: {
    screen: ScoreCard,
    navigationOptions: {
      mode: 'modal',
      header: null
    }
  },
})

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
)

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  nav: state.nav,
})

export default connect(mapStateToProps)(AppWithNavigationState)
