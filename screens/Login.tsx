import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { login } from '../bll/authReducer'
import { ErrorMessage } from '../components/ErrorMessage'
import { getMyAnimeList } from '../bll/myDataReducer'
import { RootTabScreenProps } from '../common/types'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { verification } from '../utils/verification'
import { LoadingIndicator } from '../components/LoadingIndicator'

export const Login = ({ navigation }: RootTabScreenProps<'Login'>) => {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [isChecked, setIsChecked] = useState(false)
   const dispatch = useAppDispatch()
   const statusApp = useAppSelector(state => state.app.appStatus)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const loginHandler = async () => {
      await dispatch(login({ email, password }))
      dispatch(getMyAnimeList())
      setEmail('')
      setPassword('')
      navigation.navigate('Profile')
   }
   const testUser = async () => {
      await dispatch(login({ email: 'test@test.com', password: '123456' }))
      dispatch(getMyAnimeList())
      setEmail('')
      setPassword('')
      navigation.navigate('Profile')
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
         <Text style={styles.titleName}>Login to Your Account</Text>
         <TextInput
            placeholder="email"
            placeholderTextColor={theme.colors.grey0}
            value={email}
            onChangeText={setEmail}
            style={styles.inputBlock}
         />
         <View style={styles.inputBlock}>
            <TextInput
               style={styles.inputTitle}
               placeholder="password"
               placeholderTextColor={theme.colors.grey0}
               value={password}
               onChangeText={setPassword}
               secureTextEntry={!isChecked}
            />
            {isChecked ? (
               <Icon
                  name={'visibility'}
                  color={theme.colors.grey0}
                  onPress={() => setIsChecked(!isChecked)}
               />
            ) : (
               <Icon
                  name={'visibility-off'}
                  color={theme.colors.grey0}
                  onPress={() => setIsChecked(!isChecked)}
               />
            )}
         </View>
         <TouchableOpacity
            onPress={loginHandler}
            onLongPress={testUser} // fix before deploy
            style={verification(email, password) ? styles.loginButton : styles.loginButtonDisable}
            disabled={!verification(email, password)}
         >
            <Text style={styles.loginTitle}>Login</Text>
         </TouchableOpacity>
         <View style={styles.singUpBlock}>
            <Text style={styles.singUpTitle}>Do not have an account?</Text>
            <Text style={styles.singUpTitleLink} onPress={() => navigation.navigate('SignUp')}>
               Sing up
            </Text>
         </View>
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
         top: 20,
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
         flexDirection: 'row',
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
      loginButton: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.secondary,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      loginButtonDisable: {
         borderRadius: 25,
         marginTop: 30,
         backgroundColor: colors.colors.grey0,
         width: '90%',
         height: 50,
         alignItems: 'center',
         justifyContent: 'center',
      },
      loginTitle: {
         color: colors.colors.primary,
         fontSize: 18,
         fontWeight: '600',
      },
      singUpBlock: {
         position: 'absolute',
         bottom: 10,
         flexDirection: 'row',
      },
      singUpTitle: {
         fontSize: 16,
         color: colors.colors.primary,
      },
      singUpTitleLink: {
         marginLeft: 10,
         fontSize: 16,
         color: colors.colors.secondary,
      },
   })
