import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { RootTabScreenProps } from '../common/types'
import { ErrorMessage } from '../components/ErrorMessage'
import { Avatar, Colors, Icon, Switch, Theme, useTheme } from '@rneui/themed'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { setColorMode, setStorageData } from '../bll/profileReducer'
import { ProfileSetting } from '../components/ProfileSetting'
import { OverlayMessage } from '../components/OverlayMessage'

export const Profile = (navigate: RootTabScreenProps<'Profile'>) => {
   const emailUser = useAppSelector(state => state.auth.email)
   const userName = useAppSelector(state => state.profile.name)
   const colorMode = useAppSelector(state => state.profile.colorMode)
   const uid = useAppSelector(state => state.auth.uid)
   const error = useAppSelector(state => state.app.error)
   const profileImg = useAppSelector(state => state.profile.profileImg)
   const dispatch = useAppDispatch()
   const [isOpenSetting, setIsOpenSetting] = useState(false)
   const [isOpenAlert, setIsOpenAlert] = useState(false)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const toggleMode = () => {
      if (colorMode === 'dark') {
         dispatch(setColorMode('light'))
         dispatch(setStorageData())
      } else {
         dispatch(setColorMode('dark'))
         dispatch(setStorageData())
      }
   }
   const toggleSetting = () => {
      setIsOpenSetting(true)
   }
   useEffect(() => {
      const unsubscribe = navigate.navigation.addListener('tabPress', e => {
         e.preventDefault()
         if (!uid) {
            navigate.navigation.navigate('Login')
         } else {
            navigate.navigation.navigate('Profile')
         }
      })
      if (error && !uid) {
         navigate.navigation.navigate('Login')
      }
      return unsubscribe
   }, [navigate.navigation, uid, error])

   return (
      <ScrollView style={styles.container}>
         <LoadingIndicator />
         <ErrorMessage />
         <ProfileSetting isOpen={isOpenSetting} setIsOpen={setIsOpenSetting} />
         <OverlayMessage isOpen={isOpenAlert} setIsOpen={setIsOpenAlert} navigation={navigate} />
         <View style={styles.profileBlock}>
            <Avatar
               size={100}
               rounded
               source={{
                  uri: profileImg,
               }}
            />
            <View>
               <Text style={styles.nameTitle}>{userName}</Text>
               <Text style={styles.nameTitle}>{emailUser}</Text>
            </View>
         </View>
         <View style={styles.settingBlock}>
            <TouchableOpacity style={styles.titleBlock} onPress={toggleMode}>
               <Icon name={'visibility'} color={theme.colors.primary} />
               <Text style={styles.title}>Dark mode</Text>
               <Switch
                  color={theme.colors.secondary}
                  value={colorMode === 'dark'}
                  onValueChange={toggleMode}
                  style={styles.switchBlock}
               />
            </TouchableOpacity>
            <TouchableOpacity style={styles.titleBlock} onPress={toggleSetting}>
               <Icon name={'settings'} color={theme.colors.primary} />
               <Text style={styles.title}>Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => setIsOpenAlert(!isOpenAlert)}
               style={styles.titleBlock}
            >
               <Icon name={'logout'} color={theme.colors.error} />
               <Text style={styles.logoutTitle}>Logout</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         paddingHorizontal: 5,
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
      titleBlock: {
         flexDirection: 'row',
         alignItems: 'center',
      },
      logoutTitle: {
         marginLeft: 10,
         color: colors.colors.error,
         fontSize: 18,
         fontWeight: '600',
      },
      title: {
         fontSize: 18,
         marginLeft: 10,
         fontWeight: '600',
         color: colors.colors.primary,
      },
      settingBlock: {
         paddingTop: 20,
         gap: 10,
      },
      switchBlock: {
         position: 'absolute',
         right: 0,
      },
      langBlock: {
         position: 'absolute',
         right: 0,
         fontSize: 18,
         marginLeft: 10,
         fontWeight: '600',
         color: colors.colors.primary,
      },
   })
