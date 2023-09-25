import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getMyAnimeList } from '../bll/myDataReducer'
import { MyAnimeItem } from '../components/MyAnimeItem'
import { ErrorMessage } from '../components/ErrorMessage'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'
import { SearchBlock } from '../components/SearchBlock'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { MyStatusLink } from '../components/MyStatusLink'
import { addBackLinkStep } from '../bll/appReducer'

export const MyList = (navigator: RootTabScreenProps<'MyList'>) => {
   const myList = useAppSelector(state => state.myData.animeList)
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)
   const filterMyStatus = useAppSelector(state => state.myData.filterData.myStatus)
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const goFilterLink = () => {
      dispatch(addBackLinkStep('MyList'))
      navigator.navigation.navigate('Filter')
   }

   useEffect(() => {
      if (uid) {
         dispatch(getMyAnimeList())
      }
   }, [])

   return (
      <View style={styles.container}>
         <ErrorMessage />
         <LoadingIndicator />
         <SearchBlock goFilterLink={goFilterLink} filterScreen={'MyList'} />
         <ScrollView style={styles.statusBlock} horizontal>
            <MyStatusLink name={'all'} />
            <MyStatusLink name={'watching'} />
            <MyStatusLink name={'completed'} />
            <MyStatusLink name={'planned'} />
            <MyStatusLink name={'waiting-for-next-season'} />
            <MyStatusLink name={'dropped'} />
         </ScrollView>
         <ScrollView style={styles.itemsBlock}>
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
                     It seems that you have not added any anime to the list
                  </Text>
               </View>
            )}
            {myList
               .filter(a => (filterMyStatus !== 'all' ? a.myStatus === filterMyStatus : a))
               .map(a => (
                  <MyAnimeItem anime={a} key={a.idDoc} navigator={navigator} />
               ))}
         </ScrollView>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         height: '100%',
         backgroundColor: colors.colors.background,
         paddingVertical: 10,
         justifyContent: 'center',
      },
      emptyBlock: {
         justifyContent: 'center',
         alignItems: 'center',
         marginTop: '50%',
      },
      title: {
         color: colors.colors.primary,
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
      statusBlock: {
         height: 40,
      },
      itemsBlock: {
         height: '100%',
      },
   })
