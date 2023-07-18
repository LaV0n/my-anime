import React, { useState } from 'react'
import { ActivityIndicator, Button, TextInput, View } from 'react-native'
import { CheckBox } from '@rneui/base'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { signUp } from '../bll/authReducer'
import { RootStackScreenProps } from '../types'

export const SignUp = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
   const [isChecked, setIsChecked] = useState(false)
   const userId = useAppSelector(state => state.auth.uid)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()

   const singupHandler = () => {
      dispatch(signUp({ email, password, userName: name }))
      setEmail('')
      setPassword('')
   }
   if (userId) {
      navigation.navigate('Home')
   }
   if (statusApp === 'loading') {
      return <ActivityIndicator size="large" />
   }

   return (
      <View>
         <TextInput placeholder="email" value={email} onChangeText={setEmail} />
         <TextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isChecked}
         />
         <CheckBox
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
            title="show password"
         />
         <TextInput placeholder="name" value={name} onChangeText={setName} />
         <Button title="create account" onPress={singupHandler} />
      </View>
   )
}
