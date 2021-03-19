import React, {useState, useEffect} from 'react';
import {
  Platform,
  View,
  Alert,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AdyenPayment from 'react-native-adyen-payment';
import Config from 'react-native-config';

const ADYEN_MERCHANT_ACCOUNT = Config.ADYEN_MERCHANT_ACCOUNT;
const ADYEN_PUBLIC_KEY = Config.ADYEN_PUBLIC_KEY;
const ADYEN_BASE_URL = Config.ADYEN_BASE_URL;
const ADYEN_ENVIRONMENT = Config.ADYEN_ENVIRONMENT;
const X_DEMO_SERVER_KEY = Config.X_DEMO_SERVER_KEY;

const MOCK_PAYMENT_DETAILS = {
  amount: {
    value: 100,
    currency: 'SGD',
  },
  reference: 'f685d187-7f4d-4dd5-9368-b84a3039f934',
  shopperReference: 'f685d187-7f4d-4dd5-9368-b84a3039f934',
  shopperEmail: 'test@test.test',
  shopperLocale: 'en_US',
  channel: Platform.OS === 'ios' ? 'iOS' : 'Android',
  countryCode: 'SG',
  // Remember to replace returnUrl with your app scheme
  returnUrl:
    Platform.OS === 'ios' ? 'your-ios-scheme://' : 'your-android-scheme://',
  merchantAccount: ADYEN_MERCHANT_ACCOUNT,
  additionalData: {
    allow3DS2: true,
    executeThreeD: true,
  },
};

const MOCK_COMPONENT_DATA = {
  scheme: {
    card_public_key: ADYEN_PUBLIC_KEY,
  },
  // Uncomment to add Apple Pay (replace apple_pay_merchant_id):
  // applepay: {
  //   apple_pay_merchant_id: ADYEN_MERCHANT_ACCOUNT, //'merchant.com.adyen.your.merchant',
  //   supportedNetworks: ['visa', 'mc'],
  //   merchantCapabilities: ['supports3DS'],
  // },
};

const APP_SERVICE_CONFIG_DATA = {
  environment: ADYEN_ENVIRONMENT,
  base_url: ADYEN_BASE_URL,
  // Add any additional headers to pass to your backend
  additional_http_headers: {
    'x-channel': Platform.OS, // Example
    'x-demo-server-api-key': X_DEMO_SERVER_KEY,
  },
};

const STATUS = {
  none: 'none',
  initiated: 'initiated',
  success: 'success',
  failure: 'failure',
};

const MOCK_PAYMENT_METHODS = {
  paymentMethods: [
    {
      brands: ['visa', 'mc', 'amex', 'jcb'],
      details: [
        {key: 'number', type: 'text'},
        {key: 'expiryMonth', type: 'text'},
        {key: 'expiryYear', type: 'text'},
        {key: 'cvc', type: 'text'},
        {key: 'holderName', optional: true, type: 'text'},
      ],
      name: 'Credit Card',
      type: 'scheme',
    },
    {name: 'GrabPay', type: 'grabpay_SG'},
    {
      configuration: {
        merchantId: '1000',
        gatewayMerchantId: 'DigitalServicesSGFourPteLtdECOM',
      },
      details: [{key: 'paywithgoogle.token', type: 'payWithGoogleToken'}],
      name: 'Google Pay',
      type: 'paywithgoogle',
    },
    {name: 'UnionPay', type: 'unionpay'},
  ],
};

export const AdyenExample = () => {
  const [status, setStatus] = useState(STATUS.none);

  useEffect(() => {
    console.log(APP_SERVICE_CONFIG_DATA);
    AdyenPayment.initialize(APP_SERVICE_CONFIG_DATA);

    AdyenPayment.onSuccess((payload) => {
      console.log('success', payload);
      Alert.alert('Success', JSON.stringify(payload));
      setStatus(STATUS.success);
    });
    AdyenPayment.onError((payload) => {
      console.log('failure', payload);
      Alert.alert('Failure', JSON.stringify(payload));
      setStatus(STATUS.failure);
    });
  }, []);

  const handleDropInButtonPress = () => {
    console.log('handleDropInButtonPress');
    setStatus(STATUS.initiated);

    try {
      AdyenPayment.startCustomPayment(
        AdyenPayment.DROPIN,
        MOCK_COMPONENT_DATA,
        MOCK_PAYMENT_DETAILS,
        MOCK_PAYMENT_METHODS
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleCCButtonPress = () => {
    console.log('handleDropInButtonPress');
    setStatus(STATUS.initiated);

    // try {
    //   AdyenPayment.startPayment(
    //     AdyenPayment.SCHEME,
    //     MOCK_COMPONENT_DATA,
    //     MOCK_PAYMENT_DETAILS,
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleAFTERPAYButtonPress = () => {
    console.log('handleAFTERPAYButtonPress');
    setStatus(STATUS.initiated);

    // try {
    //   AdyenPayment.startPayment(
    //     AdyenPayment.AFTERPAY,
    //     MOCK_COMPONENT_DATA,
    //     MOCK_PAYMENT_DETAILS,
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleAPPLEPAYButtonPress = () => {
    console.log('handleAPPLEPAYButtonPress');
    setStatus(STATUS.initiated);

    // try {
    //   AdyenPayment.startPayment(
    //     AdyenPayment.APPLE_PAY,
    //     MOCK_COMPONENT_DATA,
    //     MOCK_PAYMENT_DETAILS,
    //   );
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <View style={{alignItems: 'center'}}>
      {/* <Text>Status: {status}</Text> */}
      <View style={{marginBottom: 34}} />

      <TouchableOpacity style={styles.button} onPress={handleDropInButtonPress}>
        <Text>Drop-In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCCButtonPress}>
        <Text>Credit Card</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAFTERPAYButtonPress}>
        <Text>AfterPay</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleAPPLEPAYButtonPress}>
        <Text>ApplePay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingHorizontal: 34,
    paddingVertical: 16,
    backgroundColor: '#FA275A',
    width: 180,
    marginVertical: 8,
  },
});
