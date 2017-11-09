import React, { Component } from 'react';

import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

class FlashCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </View>
    )
  }
}

FlashCard.defaultProps = {
  title: 'Test',
};

FlashCard.propTypes = {
  title: PropTypes.string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});

export default FlashCard;
