import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { signUp } from '../bll/authReducer'
import { RootTabScreenProps } from '../common/types'
import { ErrorMessage } from '../components/ErrorMessage'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { verification } from '../utils/verification'
import { LoadingIndicator } from '../components/LoadingIndicator'

export const SignUp = ({ navigation }: RootTabScreenProps<'SignUp'>) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [passwordRepeat, setPasswordRepeat] = useState('')
   const [name, setName] = useState('')
   const userId = useAppSelector(state => state.auth.uid)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const signUpHandler = () => {
      dispatch(signUp({ email, password, userName: name }))
      setEmail('')
      setPassword('')
   }
   if (userId) {
      navigation.navigate('Home')
   }
   if (statusApp === 'loading') {
      return <LoadingIndicator />
   }

   return (
      <View style={styles.container}>
         <ErrorMessage />
         <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backIcon}>
            <Icon name={'arrow-back'} color={theme.colors.white} />
         </TouchableOpacity>
         <Text style={styles.titleName}>Create Your Account</Text>
         <TextInput
            placeholder="email"
            placeholderTextColor={theme.colors.grey0}
            value={email}
            onChangeText={setEmail}
            style={styles.inputBlock}
         />
         <TextInput
            style={styles.inputBlock}
            placeholder="password"
            placeholderTextColor={theme.colors.grey0}
            value={password}
            onChangeText={setPassword}
         />
         <TextInput
            style={styles.inputBlock}
            placeholder="repeat password"
            placeholderTextColor={theme.colors.grey0}
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
         />
         <TextInput
            placeholder="name"
            style={styles.inputBlock}
            placeholderTextColor={theme.colors.grey0}
            value={name}
            onChangeText={setName}
         />
         <TouchableOpacity
            onPress={signUpHandler}
            style={
               verification(email, password) && name && password === passwordRepeat
                  ? styles.signUpButton
                  : styles.signUpButtonDisable
            }
            disabled={!verification(email, password) && !name && password !== passwordRepeat}
         >
            <Text style={styles.signUpTitle}>Sign Up</Text>
         </TouchableOpacity>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         height: '100%',
         alignItems: 'center',
         justifyContent: 'center',
         backgroundColor: colors.colors.background,
      },
      backIcon: {
         position: 'absolute',
         top: 10,
         left: 10,
      },
      titleName: {
         color: colors.colors.white,
         fontSize: 28,
         fontWeight: '600',
         marginBottom: 10,
      },
      inputBlock: {
         marginTop: 10,
         borderRadius: 15,
         alignItems: 'center',
         justifyContent: 'space-between',
         color: colors.colors.primary,
         paddingHorizontal: 20,
         fontSize: 18,
         backgroundColor: colors.colors.grey1,
         width: '90%',
         height: 50,
      },
      inputTitle: {
         fontSize: 18,
         color: colors.colors.primary,
      },
      signUpButton: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.secondary,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      signUpButtonDisable: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.grey0,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      signUpTitle: {
         color: colors.colors.primary,
         fontSize: 18,
         fontWeight: '600',
      },
   })
