import React, { Component } from 'react';
import { View,Text,Dimensions, TouchableOpacity, Image, Button } from 'react-native';
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation'

const ScoreCard = ({navigation}) => {
    return(
        <View style={styles.levelContainer}>
                <Image source={require('../assets/star1.png')} /> 
                   <Text style={styles.highScore}>ScoreCard</Text>
                   <Text style={styles.highScore}>Score: 00000</Text>
                <View  style={styles.buttonContainer}>
                    <Button style={{width:40}} title={"Home"} onPress={() => navigation.navigate('Home')} />
                    <Button style={{width:40}} title={"Retry"} onPress={() => navigation.navigate('Lesson')} />
                    <Button style={{width:40}} title={"Next"} onPress={() => navigation.navigate('LessonList')} />
               </View>  
        </View>
    );
};

const styles = {
    levelContainer:{
         flex:1,
         justifyContent: 'center', 
         alignItems: 'center',
         flexDirection:'column',
         backgroundColor: '#FFFFFF',
         
    } ,
    highScore:{
        fontSize:40,
        paddingBottom:20,
        margin:10
    },
    buttonContainer:{   
        width: 500,
        flexDirection: 'row',
        justifyContent: 'space-between'
     },
        container:{
            width: 50, 
            marginLeft: 30,
            flexDirection:'row',
            justifyContent:'space-around',
            padding: 10   
       },
    imageWidth:{
        width:20
    }
}

export default ScoreCard;