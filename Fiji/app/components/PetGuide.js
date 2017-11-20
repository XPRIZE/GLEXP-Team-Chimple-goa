import React, { Component } from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import PropTypes from 'prop-types'

// import * as Animatable from 'react-native-animatable'
import Animation from 'lottie-react-native'

const DIRECTION = {
  'left': 'bounceInLeft',
  'right': 'bounceInRight',
}

class PetGuide extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   animation: DIRECTION[props.direction],
    // }
  }

  componentDidMount() {
    this.animation.play()
  }

  render() {
    const { style, ...other} = this.props
    return (
      <Animation
        ref={animation => { this.animation = animation }}
        style={{
          width: 200,
          height: 200,
        }}
        source={require('../assets/lottie/fish.json')}
      />
      // <Animatable.View
      //   animation={this.state.animation}
      //   style={{backgroundColor: 'red', ...style}}
      // />
    )
  }
}

PetGuide.defaulProps = {
  direction: 'left',
}

PetGuide.propTypes = {
  direction: PropTypes.string,
}

export default PetGuide