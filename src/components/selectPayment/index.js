import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import _ from 'lodash'
import PaymentMethods from '../paymentMethods'
import defaultStyles from './defaultStyles'
import TouchableOpacity from '../common/touchableOpacity'

export default class SelectPayment extends Component {
  static propTypes = {
    enableApplePay: PropTypes.bool,
    applePayHandler: PropTypes.func,
    paymentSources: PropTypes.array,
    addCardHandler: PropTypes.func.isRequired,
    changeSubscription: PropTypes.func.isRequired,
    selectPaymentHandler: PropTypes.func.isRequired,
    addNewCardText: PropTypes.string,
    changeSubscriptionText: PropTypes.string,
    styles: PropTypes.object,
  }

  static defaultProps = {
    enableApplePay: false,
    paymentSources: [],
    addNewCardText: 'Add New Card',
    changeSubscriptionText: 'Change Subscription Plan',
  }

  render() {
    const styles = _.merge({}, defaultStyles, this.props.styles)
    return (
      <View style={styles.selectPaymentContainer}>
        <PaymentMethods
          paymentSources={this.props.paymentSources}
          selectPaymentHandler={this.props.selectPaymentHandler}
          applePayHandler={this.props.applePayHandler}
          enableApplePay={this.props.enableApplePay}
          styles={styles}
        />
        <TouchableOpacity style={styles.addButton} styles={styles} onPress={() => this.props.addCardHandler()} last>
          <Text style={styles.addButtonText}>{this.props.addNewCardText}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} styles={styles} onPress={() => this.props.changeSubscription()} last>
          <Text style={styles.addButtonText}>{this.props.changeSubscriptionText}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
