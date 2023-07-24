import React, { useState } from 'react'
import {
   ActivityIndicator,
   StyleSheet,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native'
import { CheckBox } from '@rneui/base'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { login } from '../bll/authReducer'
import { ErrorMessage } from '../components/ErrorMessage'
import { getMyAnimeList } from '../bll/myDataReducer'
import { RootTabScreenProps } from '../common/types'
import { Icon } from '@rneui/themed'

export const Login = ({ navigation }: RootTabScreenProps<'Login'>) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isChecked, setIsChecked] = useState(false)
   const dispatch = useAppDispatch()
   const statusApp = useAppSelector(state => state.app.appStatus)

   const loginHandler = () => {
      dispatch(login({ email, password }))
      dispatch(getMyAnimeList())
      setEmail('')
      setPassword('')
   }
   const testUser = () => {
      dispatch(login({ email: 'test@test.com', password: '123456' }))
      setEmail('')
      setPassword('')
   }

   if (statusApp === 'loading') {
      return <ActivityIndicator size="large" />
   }

   return (
      <View style={styles.container}>
         <ErrorMessage />
         <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name={'arrow-back'} />
         </TouchableOpacity>
         <Text>Login to Your Account</Text>
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
         <TouchableOpacity onPress={loginHandler} onLongPress={testUser}>
            <Text>login</Text>
         </TouchableOpacity>
      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      marginTop: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   list: {
      height: '100%',
   },
})
