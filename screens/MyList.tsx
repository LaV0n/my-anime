import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/myDataReducer'
import { MyAnimeItem } from '../components/MyAnimeItem'
import { ErrorMessage } from '../components/ErrorMessage'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
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
            {myList.length === 0 && (
               <View style={styles.emptyBlock}>
                  <Icon
                     name={'content-paste'}
                     color={theme.colors.secondary}
                     size={180}
                     style={styles.icon}
                  />
                  <Text style={styles.mainTitle}>Your list is Empty</Text>
                  <Text style={styles.title}>
                     It seems that you haven't added any anime to the list
                  </Text>
               </View>
            )}
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
         paddingHorizontal: 50,
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
