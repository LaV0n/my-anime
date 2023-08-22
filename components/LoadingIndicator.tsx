import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { useAppSelector } from '../bll/store'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
export const LoadingIndicator = () => {
   const { theme } = useTheme()
   const statusApp = useAppSelector(state => state.app.appStatus)
   const styles = makeStyles(theme)

   if (statusApp === 'success' || statusApp === 'error') return <></>

   return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color={theme.colors.secondary} />
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         height: windowHeight,
         width: windowWidth,
         alignItems: 'center',
         justifyContent: 'center',
         zIndex: 5,
         backgroundColor: colors.colors.grey2,
         position: 'absolute',
      },
   })
