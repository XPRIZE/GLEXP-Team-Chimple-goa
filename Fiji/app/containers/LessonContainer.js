import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from 'react-native-firebase'

import Lesson from '../components/Lesson'
import { fetchLessonCards } from '../actions/lesson'

class LessonContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchLessonCards(this.props.navigation.state.params.lessonId))
  }

  render() {
    return (
      this.props.isFetching 
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
        this.props.cards.length
          ?
            <Lesson cards={ this.props.cards }
              navigation={ this.props.navigation } 
            />
          :
            <View>
              <Text>No lesson Found</Text>
            </View>
    )
  }
}

LessonContainer.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        lessonId: PropTypes.string.isRequired
      })
    })
  })
}

export default connect(state => ({
  cards: state.lesson.cards,
  isFetching: state.lesson.isFetching
}))(LessonContainer)