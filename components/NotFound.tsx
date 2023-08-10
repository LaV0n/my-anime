import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'

export const NotFound = () => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   return (
      <View style={styles.emptyBlock}>
         <Icon name={'search-off'} color={theme.colors.secondary} size={180} style={styles.icon} />
         <Text style={styles.mainTitle}>Not Found</Text>
         <Text style={styles.title}>
            Sorry,the keyword you entered could not be found. Try to search with other keywords or
            change thi filter
         </Text>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      emptyBlock: {
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: '50%',
      },
      title: {
         color: colors.colors.white,
         marginTop: 20,
         textAlign: 'center',
         fontSize: 16,
         fontWeight: '400',
         paddingHorizontal: 40,
      },
      mainTitle: {
         color: colors.colors.secondary,
         fontSize: 20,
         fontWeight: '600',
      },
      icon: {
         opacity: 0.6,
      },
   })
