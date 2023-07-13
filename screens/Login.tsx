import React from 'react'
import { Button, Linking, Text, View } from 'react-native'
import { RootStackScreenProps } from '../types'
import { MyAnimeListAPI } from '../api/api'

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
   const getAuthCode = () => {
      MyAnimeListAPI.getAuthCode()
         .then(
            async res =>
               await Linking.openURL(
                  'https://myanimelist.net/login.php?from=%2Fdialog%2Fauthorization&'
               )
         )
         .catch(err => console.log(err))
   }

   return (
      <View>
         <Text>login</Text>
         <Button title={'to'} onPress={() => navigation.navigate('Home')} />
         <Button title={'code'} onPress={getAuthCode} />
      </View>
   )
}

export default Login
