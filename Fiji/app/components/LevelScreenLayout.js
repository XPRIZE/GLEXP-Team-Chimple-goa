import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import LockUnlock from './LockUnlock'

const TEST_LEVELS = [
    {levelNo: 1, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 2, isLock: false, imgPath: '../assets/starImg.png'},
    {levelNo: 3, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 4, isLock: true, imgPath: '../assets/starImg.png'},
    {levelNo: 5, isLock: true, imgPath: '../assets/starImg.png'},
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
                <ScrollView>
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
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    }
});

export default LevelScreenLayout;