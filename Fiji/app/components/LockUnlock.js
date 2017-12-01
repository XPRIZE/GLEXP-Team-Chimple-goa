import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

class LockUnlock extends Component {
        onPress = () => {
                this.props.onGoToLesson();
        }

        render() {

                const iconArray = [
                        require('../assets/img/page.png'),
                        require('../assets/img/studying.png'),
                        require('../assets/img/time.png'),
                        require('../assets/img/writing.png'),
                        require('../assets/img/page.png'),
                        require('../assets/img/studying.png')
                ];

                return (
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                                <View style ={[styles.container, {backgroundColor: this.props.backgroundColor}]}>
                                        <View style = {styles.iconContainer}>
                                                <View style= {styles.innerIconContainer}>
                                                        <Image 
                                                                style={styles.iconInnerItem}
                                                                source={iconArray[this.props.levelNo%6]}
                                                        />
                                                </View>
                                        </View>
                                        <View style = {styles.textContainer}>
                                                <Text style={styles.textInnerItem}>
                                                        {this.props.text}
                                                </Text>
                                        </View>
                                </View>
                        </TouchableOpacity>
                );
        }
}


LockUnlock.defaultProps = {
        levelNo: 6,
        text: 'default',
        isLock: true,
        imgPath: '../yellow.png',
        backgroundColor: '#f7dcdc'
 };
  
LockUnlock.propTypes = {
        levelNo: PropTypes.number,
        text: PropTypes.string,
        isLock: PropTypes.bool,
        imgPath: PropTypes.string,
        onGoToLesson: PropTypes.func,
        backgroundColor: PropTypes.string
  };

const styles = StyleSheet.create({
        container: {
                width: Dimensions.get('window').width*0.47,
                height: Dimensions.get('window').height*0.33,
                borderRadius: 10,
                borderWidth: 3,
                borderColor: '#f7f7f7',
                margin: Dimensions.get('window').width*0.005
        },
        iconContainer: {
                height: '65%',
                justifyContent: 'flex-end',
                alignItems: 'center'
                
        },
        textContainer: {
                height: '35%',
                alignItems: 'center'
               
        },
        iconInnerItem: {
                width: '70%',
                height: '100%'
        },
        textInnerItem: {
                fontSize: Dimensions.get('window').width * 0.05,
                fontWeight: 'bold',
                paddingTop: 10
        },
        innerIconContainer: {
                width: '50%',
                height: '50%',
                alignItems: 'center'
        }
});

export default LockUnlock;
