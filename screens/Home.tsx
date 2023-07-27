import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootTabScreenProps } from '../common/types'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { getUserData } from '../bll/authReducer'
import { useAppDispatch } from '../bll/store'

export const Home = ({ navigation }: RootTabScreenProps<'Home'>) => {
   const { theme } = useTheme()
   const dispatch = useAppDispatch()
   const styles = makeStyles(theme)

   useState(() => {
      dispatch(getUserData())
   }, [])

   return (
      <ScrollView style={styles.container}>
         <StatusBar />
         <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.searchLink}>
            <Icon name={'search'} color={theme.colors.white} />
         </TouchableOpacity>
         <View style={styles.randomBlock}>
            <Text style={styles.titleName}>Random</Text>
         </View>
         <View style={styles.topListBlock}>
            <Text style={styles.titleName}>Top Hits Anime</Text>
         </View>
         <View style={styles.newListBlock}>
            <Text style={styles.titleName}>New Releases</Text>
         </View>
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         paddingTop: 20,
         backgroundColor: colors.colors.background,
      },
      randomBlock: {
         borderStyle: 'solid',
         borderColor: 'grey',
         borderWidth: 1,
         height: 400,
      },
      topListBlock: {
         marginTop: 10,
         borderStyle: 'solid',
         borderColor: 'grey',
         borderWidth: 1,
         height: 200,
      },
      newListBlock: {
         marginTop: 10,
         borderStyle: 'solid',
         borderColor: 'grey',
         borderWidth: 1,
         height: 200,
      },
      searchLink: {
         position: 'absolute',
         right: 20,
         top: 20,
         zIndex: 10,
      },
      titleName: {
         color: colors.colors.white,
         paddingLeft: 10,
         fontSize: 16,
      },
   })
