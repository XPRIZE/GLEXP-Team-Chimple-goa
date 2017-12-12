import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import firebase from 'react-native-firebase'

import LevelScreenLayout from '../components/LevelScreenLayout'
import { fetchLessons } from '../actions/lesson'

class LessonsContainer extends Component {
  componentDidMount() {
    this.props.dispatch(fetchLessons())
  }

  render() {
    return (
      this.props.isFetching
        ?
          <ActivityIndicator size="large" style={{ marginTop: 100 }}/>
        :
          this.props.lessons.length
            ?
              <LevelScreenLayout
                lessons={ this.props.lessons.map(l => {
                  return {
                    levelNo: l.order,
                    isLock: false,
                    imgPath: l.photo
                  }
                }) }
                navigation={ this.props.navigation }
              />
            :
              <View>
                <Text>No lessons found</Text>
              </View>
    )
  }
}

LessonsContainer.propTypes = {
  lessons: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    description: PropTypes.string,
    order: PropTypes.number,
    photo: PropTypes.string,
    object: PropTypes.string,
    subject: PropTypes.string,
    items: PropTypes.array
  }))
}

export default connect(state => ({
  lessons: state.lessons.lessons,
  isFetching: state.lessons.isFetching
}))(LessonsContainer)