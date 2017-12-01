import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import LockUnlock from './LockUnlock'

const TEST_LEVELS = [
    {levelNo: 1, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 2, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 3, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 4, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 5, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 6, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 7, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 8, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 9, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 10, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 11, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 12, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 13, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 14, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 15, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 16, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 17, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 18, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 19, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 20, isLock: true, imgPath: '../assets/starImg.png'},
]
  
class LevelScreenLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
          levels: TEST_LEVELS,
        }        
    }

    handleGoToLesson = () => {
        this.props.navigation.navigate('Lesson')
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.container} scrollEnabled={true}>
                    {this.state.levels.map((element, i) => 
                       <LockUnlock
                       levelNo={element.levelNo}
                       isLock={element.isLock}
                       imgPath={element.imgPath}
                       key={element.levelNo}
                       onGoToLesson={this.handleGoToLesson}
                       />
                    )}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff7ee'
      }
});

export default LevelScreenLayout;