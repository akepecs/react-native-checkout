import React from 'react'
import { Text, View } from 'react-native'
import TouchableOpacity from '../common/touchableOpacity'
import CardBrandImage from './cardBrandImage'

export default props => (
  <TouchableOpacity {...props} styles={props.styles} style={props.styles.cardTextOuterContainer} onPress={() => props.selectPaymentHandler(props.paymentSource)}>
    <View style={props.styles.cardTextContainer}>
      <CardBrandImage style={props.styles.cardBrandImage} brand={props.paymentSource.brand} />
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={props.styles.cardTextEndingIn}>Subscribed to</Text>
          <Text style={props.styles.cardTextEndingIn}>{props.paymentSource.planName}</Text>
          <Text style={props.styles.cardTextEndingIn}>Plan Using</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Text style={props.styles.cardTextType}>{props.paymentSource.brand}</Text>
          <Text style={props.styles.cardTextEndingIn}>Ending in</Text>
          <Text style={props.styles.cardTextLast4}>{props.paymentSource.last4}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
)
