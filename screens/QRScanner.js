import { View, Text,StyleSheet,TouchableOpacity , Vibration, } from 'react-native'
import React,{useState,useEffect,useCallback,useContext} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

import MetaMaskSDK from '@metamask/sdk';

import {ethers} from 'ethers';
import BackgroundTimer from 'react-native-background-timer';

const sdk = new MetaMaskSDK({
    openDeeplink: link => {
      console.log('link',link)
      Linking.openURL(link);
  
    },
    timer: BackgroundTimer,
    dappMetadata: {
      name: 'React Native Test Dapp',
      url: 'example.com',
    },
  });
  
  const ethereum = sdk.getProvider();

const QRScanner = () => {


    const[send_to_wallet,setWallet] = useState()

    
    const onSuccess = (data) => {
        Vibration.vibrate(100)
        console.log('qr data : ',data?.data)
        const wallet_to_send  = data?.data.replace("http://", "")
        alert(data?.data)
        setWallet(wallet_to_send)

     
    }
    const sendTransaction = async () => {
        console.log('send txn',send_to_wallet)
        const to = send_to_wallet;
        const transactionParameters = {
          to, // Required except durinyarng contract publications.
          from: ethereum.selectedAddress, // must match user's active address.
          value: '0x5AF3107A4000', // Only required to send ether to the recipient from the initiating external account.
        };
    
        try {
          // txHash is a hex string
          // As with any RPC call, it may throw an error
          const txHash = await ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
    
          setResponse(txHash);
          console.log(txHash)
          
        } catch (e) {
          console.log('this error',e);
          alert(e)
        }
      };
  return (
    <View>
        {console.log('here',send_to_wallet)}
      <QRCodeScanner
        onRead={(data)=>{onSuccess(data)}}
        flashMode={RNCamera.Constants.FlashMode.off}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to{' '}
        //     <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
        //     your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
      {send_to_wallet!=undefined && send_to_wallet?
      <TouchableOpacity style={{borderWidth:1,marginTop:500}}
      onPress={()=>{
        sendTransaction()
      }}
      >

      <Text>hey{send_to_wallet}</Text>
      </TouchableOpacity>:null}
    </View>
  )
}
const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });

export default QRScanner