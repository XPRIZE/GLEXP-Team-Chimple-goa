import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

import BoardView from './BoardView.js'

export default class Malpe extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BoardView/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#644B62',
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BEE1D2',
  },
  letter: {
    color: '#333',
    fontSize: 80,
  },
})
