import React from 'react'
import { Button, Text, View } from 'react-native'
import { RootStackScreenProps } from '../types'

export const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
   return (
      <View>
         <Text>login</Text>
         <Button title={'to Home'} onPress={() => navigation.navigate('Home')} />
      </View>
   )
}
