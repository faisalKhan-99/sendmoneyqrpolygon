import { View, Text,Button } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';


const QRScreen = (props) => {
    console.log('QR',props.route.params.account)
    const item = props.route.params

    const WalletQRCode = ({ address }) => {
        return (
          <QRCode
            value={address}
            size={200}
          />
        );
      }
  
  return (
    <View>
      <Text>QRScreen</Text>
      {/* <Button title="Create QR" onPress={()=>{
        WalletQRCode(props.route.params.account)
      }} /> */}
      <WalletQRCode address={props.route.params.account}/>
      <Text>{props.route.params.account}</Text>
    </View>
  )
}

export default QRScreen