import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

class LockUnlock extends Component {
        onPress = () => {
                this.props.onGoToLesson();
        }

    render() {
         return (
                    <View style={styles.container}>
                        <TouchableOpacity onPress={this.onPress}>
                            <ImageBackground source={this.props.backGroundImg} style={styles.image}>
                                 <Text style={styles.text}> {this.props.levelNo} </Text>
                                 <Image source={this.props.starImg} style={[styles.starImg, { }]} />
                            </ImageBackground> 
                        </TouchableOpacity>
                    </View>
               );
        }
}


LockUnlock.defaultProps = {
            levelNo: 5,
            isLock: true,
            imgPath: '../yellow.png'
 };
  
LockUnlock.propTypes = {
            levelNo: PropTypes.number,
            isLock: PropTypes.bool,
            imgPath: PropTypes.string,
            onGoToLesson: PropTypes.func
  };

const styles = StyleSheet.create({
            image: {
                    justifyContent: 'center',
                    borderColor: '#ddd',
                    position: 'relative',
                    width: 100,
                    height: 100,
                    alignItems: 'center'
            },
            container: {
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: '#EF4563',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    marginLeft: 5,
                    marginRight: 5,
                    marginTop: 10,
                    marginBottom: 10,
                    width: 100,
                    height: 100
            },
            starImg: {
                    justifyContent: 'center',
                    height: 30,
                    width: 80,
                    alignItems: 'center',
                    marginBottom: 1
            },
            text: {
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 40,
                    marginBottom: 6 
            }

});

export default LockUnlock;


//original content

/*{ <ImageBackground source={require('../assets/yellow.png')} style={styles.image}>
<Text style={styles.text}> {this.props.levelNo} </Text>
<Image source={require('../assets/starImg.png')} style={[styles.starImg, { }]} />
</ImageBackground> } */