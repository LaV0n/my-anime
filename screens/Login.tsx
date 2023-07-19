import React, { useState } from 'react'
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native'
import { RootTabScreenProps } from '../types'
import { CheckBox } from '@rneui/base'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { login } from '../bll/authReducer'

export const Login = ({ navigation }: RootTabScreenProps<'Login'>) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isChecked, setIsChecked] = useState(false)
   const dispatch = useAppDispatch()
   const statusApp = useAppSelector(state => state.app.appStatus)
   const error = useAppSelector(state => state.app.error)
   const uid = useAppSelector(state => state.auth.uid)

   const loginHandler = () => {
      dispatch(login({ email, password }))
      setEmail('')
      setPassword('')
   }

   if (statusApp === 'loading') {
      return <ActivityIndicator size="large" />
   }
   const gotoProfile = () => {
      navigation.navigate('Profile')
   }

   if (uid) {
      gotoProfile()
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
         <Button title={'login'} onPress={loginHandler} />
         {error && (
            <View>
               <Text>error: {error}</Text>
            </View>
         )}
      </View>
   )
}
