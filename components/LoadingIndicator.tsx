import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Colors, Theme, useTheme } from '@rneui/themed'

export const LoadingIndicator = () => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   return (
      <View style={styles.container}>
         <ActivityIndicator size="large" color={theme.colors.secondary} />
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
   })
