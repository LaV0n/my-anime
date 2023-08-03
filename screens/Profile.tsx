import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { logout } from '../bll/authReducer'
import { RootTabScreenProps } from '../common/types'
import { ErrorMessage } from '../components/ErrorMessage'
import { Avatar, Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { defaultImg } from '../common/variables'

export const Profile = ({ navigation }: RootTabScreenProps<'Profile'>) => {
   const emailUser = useAppSelector(state => state.auth.email)
   const userName = useAppSelector(state => state.auth.name)
   const uid = useAppSelector(state => state.auth.uid)
   const dispatch = useAppDispatch()
   const statusApp = useAppSelector(state => state.app.appStatus)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const logoutHandler = () => {
      dispatch(logout())
      navigation.navigate('Login')
   }

   useEffect(() => {
      const unsubscribe = navigation.addListener('tabPress', e => {
         e.preventDefault()
         if (!uid) {
            navigation.navigate('Login')
         } else {
            navigation.navigate('Profile')
         }
      })

      return unsubscribe
   }, [navigation, uid])

   if (!uid) {
      navigation.navigate('Login')
   }

   if (statusApp === 'loading') {
      return <LoadingIndicator />
   }

   return (
      <ScrollView style={styles.container}>
         <ErrorMessage />
         <View style={styles.profileBlock}>
            <Avatar
               size={100}
               rounded
               source={{
                  uri: defaultImg,
               }}
            />
            <View>
               <Text style={styles.nameTitle}>{userName}</Text>
               <Text style={styles.nameTitle}>{emailUser}</Text>
            </View>
         </View>
         <TouchableOpacity onPress={logoutHandler} style={styles.logoutBlock}>
            <Icon name={'logout'} color={theme.colors.error} />
            <Text style={styles.logoutTitle}>Logout</Text>
         </TouchableOpacity>
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
      },
      nameTitle: {
         color: colors.colors.primary,
         fontSize: 20,
         fontWeight: '600',
      },
      profileBlock: {
         marginTop: 10,
         flexDirection: 'row',
         justifyContent: 'flex-start',
         alignItems: 'center',
         gap: 20,
      },
      logoutBlock: {
         flexDirection: 'row',
         marginTop: 20,
      },
      logoutTitle: {
         marginLeft: 10,
         color: colors.colors.error,
         fontSize: 18,
         fontWeight: '600',
      },
   })
