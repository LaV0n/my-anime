import React from 'react'
import { Button, Colors, Overlay, Theme, useTheme } from '@rneui/themed'
import { StyleSheet, Text, View } from 'react-native'
import { OverlayMessageType } from '../common/types'
import { useAppDispatch } from '../bll/store'
import { logout } from '../bll/authReducer'

export const OverlayMessage = ({ isOpen, setIsOpen, navigation }: OverlayMessageType) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const dispatch = useAppDispatch()

   const logoutHandler = () => {
      dispatch(logout())
      navigation?.navigation.navigate('Login')
      setIsOpen(!isOpen)
   }

   return (
      <Overlay onBackdropPress={() => setIsOpen(!isOpen)} isVisible={isOpen}>
         <View style={styles.container}>
            <Text style={styles.titleName}>Do you want to logout?</Text>
            <View style={styles.buttonBlock}>
               <Button
                  title={'Logout'}
                  buttonStyle={[styles.button, styles.buttonLogout]}
                  titleStyle={{ color: theme.colors.error }}
                  onPress={logoutHandler}
               />
               <Button
                  title={'Cancel'}
                  buttonStyle={styles.button}
                  titleStyle={{ color: theme.colors.primary }}
                  onPress={() => setIsOpen(!isOpen)}
               />
            </View>
         </View>
      </Overlay>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         alignItems: 'center',
         width: 300,
         padding: 20,
         gap: 20,
      },
      titleName: {
         color: colors.colors.primary,
         fontSize: 20,
         fontWeight: '600',
      },
      buttonBlock: {
         flexDirection: 'row',
         width: '100%',
         justifyContent: 'space-around',
      },
      button: {
         backgroundColor: colors.colors.background,
         borderColor: colors.colors.primary,
         borderStyle: 'solid',
         borderWidth: 2,
      },
      buttonLogout: {
         borderColor: colors.colors.error,
      },
   })
