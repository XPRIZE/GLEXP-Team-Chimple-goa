import React, { Component } from 'react'

import { StyleSheet, Text, View, Image } from 'react-native'
import PropTypes from 'prop-types'
import { NavigationActions } from 'react-navigation'
import PetGuide from './PetGuide'
import ProgressControl from './ProgressControl'
import FlashCard from './FlashCard'

const TEST_LESSONS = [
  {title: 'Test1', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},
  {title: 'Test2', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},
  {title: 'Test3', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},
  {title: 'Test4', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},
  {title: 'Test5', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},
  {title: 'Test6', audio: '../assets/audio/jua.mp3', image: '../assets/starImg.png'},  
]

class Lesson extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: TEST_LESSONS,
      index: 0
    }
  }

  handleNext = () => {
    this.state.index + 1 < this.state.cards.length ?
      this.setState({index: this.state.index+1}) :
      this.props.navigation.navigate('ScoreCard')
  }

  handleBack = () => {
    this.props.navigation.dispatch(NavigationActions.back())    
  }

  render() {
    let card = this.state.cards[this.state.index];
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ProgressControl 
          progress={this.state.index / this.state.cards.length}
          onNext={this.handleNext}
          onBack={this.handleBack}
          style={{flex: 1}}
        />
        <View style={{flex: 5, flexDirection: 'row'}}>
          <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <FlashCard 
              title={card.title}
              audio={card.audio}
              image={card.image}
              style={{flex: 1, backgroundColor: 'skyblue'}} />
            <PetGuide 
              direction='left'
              style={{flex: 1}} 
            />
          </View>
          <View style={{flex: 1, flexDirection: 'column', margin: 10}}>
            <View style={{flex: 1, backgroundColor: 'skyblue'}} />
            <PetGuide 
              direction='right'
              style={{flex: 1}} 
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
  }
})

export default Lesson

      // <View style={{flex: 1, flexDirection: 'column'}}>
      //   <Button
      //     style={{flex: 1}}
      //     onPress={this.onPress}
      //     title="Press"
      //   />
      //   <View style={{flex: 8, flexDirection: 'row'}}>
      //     <Animatable.View 
      //       ref={(view) => {this.textRef = view; }}
      //       style={{flex: 1, flexDirection: 'column', margin: 10}}
      //       animation='bounceInLeft'>
      //       {this.state.isDual ? (
      //         <Animatable.View 
      //           animation="zoomInUp" 
      //           style={{flex: 1, backgroundColor: 'steelblue', margin: 10}} />
      //       ) : (
      //         <View
      //           style={{flex: 1, margin: 10}} />
      //       )
      //       }
      //       <View
      //         style={{flex: 1, margin: 10, backgroundColor: 'skyblue'}} />
      //     </Animatable.View>
      //     <Animatable.View 
      //       style={{flex: 1, flexDirection: 'column', margin: 10}}
      //       animation='bounceInRight'>
      //       {this.state.isDual ? (
      //         <Animatable.View 
      //           animation="zoomInUp" 
      //           style={{flex: 1, backgroundColor: 'steelblue', margin: 10}} />
      //       ) : (
      //         <View
      //           style={{flex: 1, margin: 10}} />
      //       )
      //       }
      //       <View
      //         style={{flex: 1, margin: 10, backgroundColor: 'skyblue'}} />
      //     </Animatable.View>
      //   </View>
      // </View>
