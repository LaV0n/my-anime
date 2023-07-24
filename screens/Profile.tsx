import { Button, ScrollView, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { logout } from '../bll/authReducer'
import { RootTabScreenProps } from '../common/types'
import { ErrorMessage } from '../components/ErrorMessage'

export const Profile = ({ navigation }: RootTabScreenProps<'Profile'>) => {
   const emailUser = useAppSelector(state => state.auth.email)
   const userName = useAppSelector(state => state.auth.name)
   const uid = useAppSelector(state => state.auth.uid)
   const dispatch = useAppDispatch()

   const logoutHandler = () => {
      dispatch(logout())
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

   return (
      <ScrollView>
         <ErrorMessage />
         <Text>email:{emailUser}</Text>
         <Text>name:{userName}</Text>
         <Text>uid:{uid}</Text>
         {uid ? (
            <Button title={'logout'} onPress={logoutHandler} />
         ) : (
            <>
               <Button title={'login'} onPress={() => navigation.navigate('Login')} />
               <Button title={'sign Up'} onPress={() => navigation.navigate('SignUp')} />
            </>
         )}
      </ScrollView>
   )
}
