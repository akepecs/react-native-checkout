import React, { Component } from 'react'
import PropTypes from 'prop-types'
import stripe from 'tipsi-stripe'
import AddCard from '../addCard'

const errorMessages = {
  incorrect_number: 'The card number is incorrect.',
  invalid_number: 'The card number is not a valid credit card number.',
  invalid_expiry_month: "The card's expiration month is invalid.",
  invalid_expiry_year: "The card's expiration year is invalid.",
  invalid_cvc: "The card's security code is invalid.",
  expired_card: 'The card has expired.',
  incorrect_cvc: "The card's security code is incorrect.",
  incorrect_zip: "The card's zip code failed validation.",
  card_declined: 'The card was declined.',
  missing: 'There is no card on a customer that is being charged.',
  processing_error: 'An error occurred while processing the card.',
  rate_limit: "An error occurred due to requests hitting the API too quickly. Please let us know if you're consistently running into this error.",
}

export default class StripeAddCard extends Component {
  static propTypes = {
    publicStripeKey: PropTypes.string.isRequired,
    addCardTokenHandler: PropTypes.func.isRequired,
  }

  createToken = async (cardNumber, expiryMonth, expiryYear, cvc) => {
    try {
      stripe.setOptions({
        publishableKey: this.props.publicStripeKey,
      })

      var token = await stripe.createTokenWithCard({
        number: cardNumber,
        expMonth: parseInt(expiryMonth),
        expYear: parseInt(expiryYear),
        cvc: cvc,
      })

      return token
    } catch (error) {
      // in iOS, this works, but in Android, an error does not seem to have any errorCodeKey info
      const stripeErrorType = error.userInfo['com.stripe.lib:StripeErrorCodeKey']
      const localizedErrorMessage = errorMessages[stripeErrorType]
      Alert.alert(localizedErrorMessage)
    }
  }

  render() {
    return (
      <AddCard
        {...this.props}
        addCardHandler={(cardNumber, expiry, cvc) => {
          const [expiryMonth, expiryYear] = expiry.split('/')
          return this.createToken(cardNumber, expiryMonth, expiryYear, cvc).then(token => this.props.addCardTokenHandler(token))
        }}
      />
    )
  }
}
