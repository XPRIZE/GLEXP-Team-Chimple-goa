import React, { Component } from 'react';
import { View,Text, Button, TouchableOpacity, Dimensions, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import PropTypes from 'prop-types';
import { StackNavigator } from 'react-navigation'
import Animation from 'lottie-react-native'


class ScoreCard extends Component{
    constructor(props) {
        super(props)
        // this.state = {
        //   animation: DIRECTION[props.direction],
        // }
      }
    
      componentDidMount() {
        this.animation.play()
      }
  render(){
    const { navigate } = this.props.navigation;
    return(
        <View style={styles.topLevelContainer}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Animation
                            ref={animation => { this.animation = animation }}
                            style={{
                            width: 200,
                            height: 200,
                            }}
                            source={require('../assets/lottie/reward.json')}
                        />
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.topInnerContainer}>
                        <Text style={styles.text}> Congratulation </Text>
                    </View>
                    <View style={styles.bottomInnerContainer}>
                        <View style={styles.buttonContainer}>
                            <Text style={{color:'#ffffff'}}>Next</Text>
                        </View>
                        <Icon 
                            raised
                            reverse
                            size={Dimensions.get('window').width* 0.04}
                            name='arrow-forward' 
                            color='#f78e6a' 
                            onPress={() => navigate('Home')}
                        /> 
                    </View>
                </View>
            </View>
        </View>
    );
};
}

const styles = StyleSheet.create({
    topLevelContainer: {
        flex:1,
        backgroundColor: '#d8e0e8',
        alignItems: 'center',
        paddingTop: Dimensions.get('window').height * 0.05
    },
    container: {
        backgroundColor: '#fbfaff',
        width: '85%',
        height: '90%'
    },
    imageContainer: {
        backgroundColor: '#fbfaff',
        height: '65%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomContainer: {
        backgroundColor: '#fbfaff',
        height: '35%'
    },
    images: {
        
    },
    topInnerContainer: {
        alignItems: 'center',
        backgroundColor: '#fbfaff',
        height: Dimensions.get('window').height* 0.07
    },
    bottomInnerContainer: {
        alignItems: 'center',
        backgroundColor: '#fbfaff',
        height: '40%',
        flexDirection: 'row',
        justifyContent: 'center'
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
        height: Dimensions.get('window').height* 0.06,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ScoreCard;