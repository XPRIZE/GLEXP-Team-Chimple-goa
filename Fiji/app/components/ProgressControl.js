import React, { Component } from 'react'

import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'
import ProgressBar from 'react-native-progress/Bar'

class ProgressControl extends Component {
  constructor(props) {
    super(props)
  }

  handleNext = () => {
    this.props.onNext();
  }

  handleBack = () => {
    this.props.onBack();
  }

  render() {
    return (
      <View style={styles.container}>
        <Icon
          reverse
          name='cancel'
          color='#517fa4'
          onPress={this.handleBack}
        />
        <ProgressBar
          style={{marginTop: 10, flex: 1}}
          progress={this.props.progress}
        />
        <Icon
          reverse
          name='play-arrow'
          color='#517fa4'
          onPress={this.handleNext}
        />
      </View>
    )
  }
}

ProgressControl.defaultProps = {
  progress: 0,
}

ProgressControl.propTypes = {
  progress: PropTypes.number,
  onNext: PropTypes.func,
  onBack: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
})

export default ProgressControl