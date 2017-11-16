import React, { Component } from 'react';
import { View,Text,Dimensions, TouchableOpacity, Image } from 'react-native';

import PropTypes from 'prop-types';


class ScoreCard extends Component {
    render(){
        return(
            <View style={styles.levelContainer}>
                  <Image source={require('../assets/star1.png')} /> 
                    <Text style={styles.highScore}>ScoreCard</Text>
                    <Text style={styles.highScore}>Score: 00000</Text>
                <View style={styles.container}>
                      <TouchableOpacity>  
                        <Text style={styles.buttonContainer}>Home</Text>
                      </TouchableOpacity> 
                    <TouchableOpacity>
                        <Text style={styles.buttonContainer}>Retry</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity>  
                        <Text style={styles.buttonContainer}>Next</Text>
                    </TouchableOpacity>
                </View>  
            </View>
        );
    }
};

const styles = {
    levelContainer:{
         flex: 1,
         justifyContent: 'center', 
         alignItems: 'center',
         flexDirection:'column',
         backgroundColor: '#FFFFFF',
    } ,
    highScore:{
        fontSize:40,
        paddingBottom:20,
        textAlign:'center',
        margin:10
    },
    buttonContainer:{
        backgroundColor:'#00ff7b',
        fontSize:40,
        marginLeft: 10,
        borderRadius:20,
        textAlign:'center',
        borderColor:'#080707'    },
    container:{
         flexDirection:'row',
         padding: 10     
    },
    imageWidth:{
        width:20
    }
}

export default ScoreCard;