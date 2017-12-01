import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import LockUnlock from './LockUnlock'

const TEST_LEVELS = [
    {levelNo: 1, text: 'writing', backgroundColor: '#FFABC3', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 2, text: 'reading', backgroundColor: '#FFFFB8', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 3, text: 'speaking', backgroundColor: '#FFE6C2', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 4, text: 'games', backgroundColor: '#CFD1A1', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 5, text: 'musics', backgroundColor: '#B6F1FF', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 6, text: 'listening', backgroundColor: '#FFC5AB', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 7, text: 'writing', backgroundColor: '#FFABC3', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 8, text: 'reading', backgroundColor: '#FFFFB8', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 9, text: 'speaking', backgroundColor: '#FFE6C2', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 10, text: 'games', backgroundColor: '#CFD1A1', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 11, text: 'musics', backgroundColor: '#B6F1FF', isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 12, text: 'listening', backgroundColor: '#FFC5AB', isLock: false, imgPath: '../assets/starImg.png'}
    
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
                       text={element.text}
                       backgroundColor={element.backgroundColor}
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
        backgroundColor: '#fff7ee',
        justifyContent: 'center',
        alignItems: 'center'
      }
});

export default LevelScreenLayout;