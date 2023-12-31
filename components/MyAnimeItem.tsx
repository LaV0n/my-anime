import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimeType, RootTabScreenProps } from '../common/types'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { delItemFromMyList } from '../bll/myDataReducer'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { RatingStars } from './RatingStars'
import { CustomSelectList } from './CustomSelectList'
import { ProgressLine } from './ProgressLine'
import { addBackLinkStep } from '../bll/appReducer'

export const MyAnimeItem = ({
   anime,
   navigator,
}: {
   anime: AnimeType
   navigator: RootTabScreenProps<'MyList'>
}) => {
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const delItemHandler = (id: string) => {
      dispatch(delItemFromMyList(id))
   }
   const getCurrentAnimeItemHandler = () => {
      dispatch(getCurrentAnimeItem(anime.id))
      dispatch(addBackLinkStep('MyList'))
      navigator.navigation.navigate('AnimeItem')
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.pictureBlock} onPress={getCurrentAnimeItemHandler}>
            <Image source={{ uri: anime.main_picture.medium }} style={styles.picture} />
            <Text style={styles.rating}>{anime.mean}</Text>
         </TouchableOpacity>
         <View style={styles.description}>
            <View style={styles.titleBlock}>
               <Text style={styles.titleName}> {anime.title}</Text>
               <RatingStars id={anime.idDoc} myRating={anime.myRating} />
            </View>
            <View style={styles.progressBlock}>
               <ProgressLine
                  startValue={anime.myProgress}
                  maxValue={+anime.num_episodes}
                  idDoc={anime.idDoc}
               />
               <Text style={styles.titleName}>
                  <Text style={styles.episodes}>total:</Text> {anime.num_episodes}
               </Text>
            </View>
            <View style={styles.actionBlock}>
               <CustomSelectList
                  idDoc={anime.idDoc}
                  myStatus={anime.myStatus}
                  isMyList={true}
                  totalSeries={anime.num_episodes}
               />
               <Icon
                  name={'delete'}
                  color={theme.colors.secondary}
                  type="antdesign"
                  size={20}
                  onPress={() => delItemHandler(anime.idDoc)}
               />
            </View>
         </View>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         marginTop: 10,
         marginHorizontal: 10,
         flexDirection: 'row',
         backgroundColor: colors.colors.background,
         justifyContent: 'space-between',
      },
      pictureBlock: {
         width: '40%',
         height: 150,
      },
      picture: {
         height: '100%',
         borderRadius: 10,
      },
      rating: {
         position: 'absolute',
         margin: 10,
         padding: 5,
         borderRadius: 5,
         backgroundColor: colors.colors.secondary,
         color: colors.colors.white,
      },
      description: {
         justifyContent: 'space-between',
         width: '60%',
         padding: 7,
      },
      actionBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      titleBlock: {
         justifyContent: 'space-between',
         flexDirection: 'row',
         flexWrap: 'wrap',
      },
      titleName: {
         color: colors.colors.primary,
         fontSize: 15,
      },
      episodes: {
         color: colors.colors.grey0,
         fontSize: 13,
      },
      progressBlock: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
      },
   })
