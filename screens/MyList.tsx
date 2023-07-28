import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/myDataReducer'
import { MyAnimeItem } from '../components/MyAnimeItem'
import { ErrorMessage } from '../components/ErrorMessage'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'

export const MyList = (navigator: RootTabScreenProps<'MyList'>) => {
   const myList = useAppSelector(state => state.myData.animeList)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   useEffect(() => {
      if (uid) {
         dispatch(getMyAnimeList())
      }
   }, [])

   return (
      <View style={styles.container}>
         <ErrorMessage />
         <ScrollView>
            {myList.length === 0 && <Text>empty list</Text>}
            {myList.map(a => (
               <MyAnimeItem anime={a} key={a.id} navigator={navigator} />
            ))}
         </ScrollView>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         paddingTop: 20,
         height: '100%',
         backgroundColor: colors.colors.background,
      },
   })
