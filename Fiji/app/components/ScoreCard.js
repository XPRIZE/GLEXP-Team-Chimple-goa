import React, { Component } from 'react';
import { View,Text, Button, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation'
import Animation from 'lottie-react-native'


const ScoreCard = ({navigation})=> {
  
    return(
        <View style={styles.topLevelContainer}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.images} source={require('../assets/img/star1.png')} />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.topInnerContainer}>
                        <Text style={styles.text}> Congratulation </Text>
                    </View>
                    <View style={styles.bottomInnerContainer}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.text}>Next</Text>
                        </View>
                        <Icon 
                            raised
                            reverse
                            name='arrow-forward' 
                            color='#f78e6a' 
                            onPress={() => navigation.navigate('Home')}
                        /> 
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topLevelContainer: {
        flex:1,
        backgroundColor: '#d8e0e8',
        alignItems: 'center',
        paddingTop: Dimensions.get('window').height * 0.05
    },
    container: {
        backgroundColor: '#faf1d9',
        width: '85%',
        height: '90%'
    },
    imageContainer: {
        backgroundColor: '#c5fc38',
        height: '65%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    bottomContainer: {
        backgroundColor: '#7df5f1',
        height: '35%'
    },
    images: {
        
    },
    topInnerContainer: {
        alignItems: 'center',
        backgroundColor: 'green',
        height: Dimensions.get('window').height* 0.07
    },
    bottomInnerContainer: {
        alignItems: 'center',
        backgroundColor: 'pink',
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    text: {
        fontSize: Dimensions.get('window').height* 0.05,
        color: 'black',
        alignItems:'center'
    },
    buttonContainer: {
        backgroundColor: '#f78e6a',
        borderRadius: 30,
        width: '50%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScoreCard;