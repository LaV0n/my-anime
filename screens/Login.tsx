import React, { useState } from 'react'
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native'
import { RootStackScreenProps } from '../types'
import { CheckBox } from '@rneui/base'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { login, logout } from '../bll/authReducer'

export const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
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
   const logoutHandler = () => {
      dispatch(logout())
   }

   if (statusApp === 'loading') {
      return <ActivityIndicator size="large" />
   }
   if (uid) {
      navigation.navigate('Profile')
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
         <Button title={'logout'} onPress={logoutHandler} />
         <Button title={'sign Up'} onPress={() => navigation.navigate('SignUp')} />
         <Button title={'to Home'} onPress={() => navigation.navigate('Home')} />
         {error && (
            <View>
               <Text>error: {error}</Text>
            </View>
         )}
      </View>
   )
}
