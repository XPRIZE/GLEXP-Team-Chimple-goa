import React, { Component } from 'react'

import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native'

var {width, height} = Dimensions.get('window')
const SIZE = 2 // four-by-four grid
const CELL_SIZE = Math.floor(width / (SIZE)) // 20% of the screen width
const CELL_PADDING = Math.floor(CELL_SIZE / (SIZE * 4)) // 5% of the cell size
const BORDER_RADIUS = CELL_PADDING * 2
const TILE_SIZE = CELL_SIZE - CELL_PADDING * 2
const LETTER_SIZE = Math.floor(TILE_SIZE * .75)

export default class BoardView extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.renderTiles()}
      </View>
    )
  }

  componentWillMount () {
    var tilt = new Array(SIZE * SIZE)
    for (var i = 0; i < tilt.length; i++) {
      tilt[i] = new Animated.Value(0)
    }
    this.setState({tilt}) // ES6 shorthand for {opacities: opacities}
  }

  renderTiles = () => {
    var result = []
    for (var row = 0; row < SIZE; row++) {
      for (var col = 0; col < SIZE; col++) {
        var key = row * SIZE + col
        var letter = String.fromCharCode(65 + key)
        var tilt = this.state.tilt[key].interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '-30deg']
        })
        var style = {
          left: col * CELL_SIZE + CELL_PADDING,
          top: row * CELL_SIZE + CELL_PADDING,
          transform: [{perspective: CELL_SIZE * 8},
                      {rotateX: tilt}]
        }
        result.push(this.renderTile(key, style, letter)
        )
      }
    }
    return result
  }

  renderTile = (id, style, letter) => {
    return (
      <Animated.View key={id} style={[styles.tile, style]}
        onStartShouldSetResponder={() => this.clickTile(id)}>
          <Text style={styles.letter}>{letter}</Text>
      </Animated.View>
    )
  }

  clickTile = (id) => {
    var tilt = this.state.tilt[id];
    tilt.setValue(1);
    Animated.timing(tilt, {
      toValue: 0,
      duration: 250, // milliseconds
      easing: Easing.quad
    }).start()
  }

}

const styles = StyleSheet.create({
  container: {
    width: CELL_SIZE * SIZE,
    height: CELL_SIZE * SIZE,
    backgroundColor: 'transparent',
  },
  tile: {
    position: 'absolute',
    width: TILE_SIZE,
    height: TILE_SIZE,
    borderRadius: BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2',
  },
  letter: {
    color: '#333',
    fontSize: LETTER_SIZE,
    backgroundColor: 'transparent',
  },
})
