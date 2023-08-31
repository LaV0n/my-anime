import React, { useEffect, useState } from 'react'
import {
   FlatList,
   Image,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native'
import { RootTabScreenProps } from '../common/types'
import { Colors, Theme, useTheme, useThemeMode } from '@rneui/themed'
import { getUserData } from '../bll/authReducer'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { AnimeItemPreview } from '../components/AnimeItemPreview'
import { getCurrentAnimeItem, getRandomAnimeItem, getShortAnimeList } from '../bll/animeListReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { Ranking } from '../common/variables'
import { statusAnimeItem } from '../utils/utils'
import { LinearGradient } from 'expo-linear-gradient'
import { getMyAnimeList } from '../bll/myDataReducer'
import { changeFilterScreen } from '../bll/appReducer'

export const Home = (navigator: RootTabScreenProps<'Home'>) => {
   const { theme } = useTheme()
   const dispatch = useAppDispatch()
   const styles = makeStyles(theme)
   const topAnimeList = useAppSelector(state => state.animeList.topAnimeList)
   const newAnimeList = useAppSelector(state => state.animeList.newAnimeList)
   const randomAnimeItem = useAppSelector(state => state.animeList.randomAnimeItem)
   const { mode, setMode } = useThemeMode()
   const colorMode = useAppSelector(state => state.profile.colorMode)

   useState(async () => {
      await dispatch(getUserData())
      dispatch(getShortAnimeList(Ranking.ALL))
      dispatch(getShortAnimeList(Ranking.AIRING))
      dispatch(getRandomAnimeItem())
      dispatch(getMyAnimeList())
   }, [])

   useEffect(() => {
      if (colorMode !== mode) {
         setMode(colorMode)
      }
   }, [colorMode])

   const getCurrentAnimeItemHandler = () => {
      if (randomAnimeItem) {
         dispatch(changeFilterScreen('home'))
         dispatch(getCurrentAnimeItem(randomAnimeItem.id))
         navigator.navigation.navigate('AnimeItem')
      }
   }

   return (
      <ScrollView style={styles.container}>
         <StatusBar />
         <LoadingIndicator />
         {randomAnimeItem && (
            <TouchableOpacity style={styles.randomBlock} onPress={getCurrentAnimeItemHandler}>
               <LinearGradient
                  colors={[theme.colors.grey2, 'transparent']}
                  style={styles.upperBlock}
               />
               <Image
                  source={{ uri: randomAnimeItem.main_picture.large }}
                  style={styles.imgRandom}
               />
               <Text style={styles.rating}>{randomAnimeItem.mean}</Text>
               <LinearGradient
                  style={styles.descriptionBlock}
                  colors={['transparent', theme.colors.black]}
               >
                  <Text style={styles.titleRandomName}>{randomAnimeItem.title}</Text>
                  <View style={styles.genresBlock}>
                     {randomAnimeItem?.genres.map(g => (
                        <Text key={g.id} style={styles.genreTitle}>
                           {g.name}
                        </Text>
                     ))}
                  </View>
                  <Text style={styles.titleName}>Episodes: {randomAnimeItem.num_episodes}</Text>
                  <View>
                     <Text style={styles.titleName}>{randomAnimeItem.start_date.slice(0, 4)}</Text>
                     <Text style={styles.titleName}>{statusAnimeItem(randomAnimeItem.status)}</Text>
                  </View>
               </LinearGradient>
            </TouchableOpacity>
         )}
         <Text style={styles.mainTitleName}>Top Hits Anime</Text>
         <FlatList
            style={styles.listBlock}
            data={topAnimeList}
            horizontal
            renderItem={({ item }) => (
               <AnimeItemPreview anime={item} navigator={navigator} key={item.node.id} />
            )}
         />
         <Text style={styles.mainTitleName}>New Releases</Text>
         <FlatList
            style={styles.listBlock}
            data={newAnimeList}
            horizontal
            renderItem={({ item }) => (
               <AnimeItemPreview anime={item} navigator={navigator} key={item.node.id} />
            )}
         />
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
      },
      randomBlock: {
         marginVertical: 10,
         height: 200,
      },
      listBlock: {
         marginVertical: 15,
      },
      titleName: {
         color: colors.colors.white,
         paddingLeft: 10,
         fontSize: 16,
      },
      mainTitleName: {
         color: colors.colors.primary,
         paddingLeft: 10,
         fontSize: 16,
      },
      imgRandom: {
         height: 200,
      },
      descriptionBlock: {
         width: '100%',
         position: 'absolute',
         bottom: 0,
         paddingHorizontal: 20,
         paddingVertical: 25,
      },
      upperBlock: {
         width: '100%',
         position: 'absolute',
         top: 0,
         height: 70,
         zIndex: 2,
      },
      titleRandomName: {
         color: colors.colors.white,
         fontSize: 20,
         fontWeight: '600',
      },
      genresBlock: {
         flexDirection: 'row',
         flexWrap: 'wrap',
         gap: 10,
      },
      genreTitle: {
         color: colors.colors.white,
         fontSize: 12,
      },
      rating: {
         position: 'absolute',
         margin: 10,
         padding: 5,
         borderRadius: 5,
         backgroundColor: colors.colors.secondary,
         color: colors.colors.white,
      },
   })
