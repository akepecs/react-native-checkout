import React, { Component } from 'react'
import PropTypes from 'prop-types'
import stripe from 'tipsi-stripe'

import AddCard from '../addCard'

export default class StripeAddCard extends Component {
  static propTypes = {
    publicStripeKey: PropTypes.string.isRequired,
    addCardTokenHandler: PropTypes.func.isRequired,
  }

  render() {
    return (
      <AddCard
        {...this.props}
        addCardHandler={(cardNumber, expiry, cvc) => {
          const [expiryMonth, expiryYear] = expiry.split('/')
          const params = {
            // mandatory
            number: '4242424242424242',
            expMonth: 11,
            expYear: 17,
            cvc: '223',
            // optional
            name: 'Test User',
            currency: 'usd',
            addressLine1: '123 Test Street',
            addressLine2: 'Apt. 5',
            addressCity: 'Test City',
            addressState: 'Test State',
            addressCountry: 'Test Country',
            addressZip: '55555',
          }
          console.log(params);
          console.log(Stripe.createTokenWithCard(params));
          return Stripe.createTokenWithCard(params);
          //return getCardToken(cardNumber, expiryMonth, expiryYear, cvc, this.props.publicStripeKey).then(token => this.props.addCardTokenHandler(token))
        }}
      />
    )
  }
}
