import React, { Component } from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import PropTypes from 'prop-types'
import { Animated } from 'react-native'
// import * as Animatable from 'react-native-animatable'
import Animation from 'lottie-react-native'

const DIRECTION = {
  'left': 'bounceInLeft',
  'right': 'bounceInRight',
}

class PetGuide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0.0),
    }

    // this.state = {
    //   animation: DIRECTION[props.direction],
    // }
  }

  componentDidMount() {
    Animated.timing(this.state.progress, {
      toValue: 1.0,
      duration: 6190,
    }).start()
  }

  render() {
    const { style, ...other} = this.props
    return (
      <View>
      <Animation
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/lottie/fish2.json')}
        progress={this.state.progress}
      />
      </View>
      // <Animatable.View
      //   animation={this.state.animation}
      //   style={{backgroundColor: 'red', ...style}}
      // />
    )
  }
}

PetGuide.defaultProps = {
  direction: 'left',
}

PetGuide.propTypes = {
  direction: PropTypes.string,
}

export default PetGuide