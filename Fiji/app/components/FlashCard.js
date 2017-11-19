import React, { Component } from 'react'

import { StyleSheet, Text, View, Image, Alert } from 'react-native'
import PropTypes from 'prop-types'
import Sound from 'react-native-sound'
import { Icon } from 'react-native-elements'

class FlashCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Icon name='volume-up' onPress={this.playSound} style={{flex: 1}} />
        </View>
        <View style={{flex: 10, justifyContent: 'center'}}>
          <Image
            source={require('../assets/starImg.png')} 
            style={{width: 100, height: 100}} />
        </View>
      </View>
    )
  }

  playSound = () => {
    const callback = (error, sound) => {
      if (error) {
        Alert.alert('error', error.message)
        return
      }
      sound.play(() => {
        sound.release()
      })
    }
  
    const sound = new Sound(require('../assets/audio/jua.mp3'), error => callback(error, sound))
    //const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
  }  
}

FlashCard.defaultProps = {
  title: 'Test',
  audio: '../assets/audio/jua.mp3',
  image: '../assets/starImg.png'
};

FlashCard.propTypes = {
  title: PropTypes.string,
  audio: PropTypes.string,
  image: PropTypes.string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    flex: 10
  }
});

export default FlashCard;
