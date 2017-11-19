import React, { Component } from 'react'

import {
  StyleSheet,
  View,
} from 'react-native'

import PropTypes from 'prop-types'

import * as Animatable from 'react-native-animatable'

const DIRECTION = {
  'left': 'bounceInLeft',
  'right': 'bounceInRight',
}

class PetGuide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animation: DIRECTION[props.direction],
    }
  }
  render() {
    const { style, ...other} = this.props
    return (
      <Animatable.View
        animation={this.state.animation}
        style={{backgroundColor: 'red', ...style}}
      />
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