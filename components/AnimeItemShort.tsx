import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimeType, RootTabScreenProps } from '../common/types'
import { addItemToMyList } from '../bll/myDataReducer'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Button, Colors, Theme, useTheme } from '@rneui/themed'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { statusAnimeItem } from '../utils/utils'

export const AnimeItemShort = ({
   anime,
   navigator,
}: {
   anime: AnimeType
   navigator: RootTabScreenProps<'Search'> | RootTabScreenProps<'Seasonal'>
}) => {
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)
   const myList = useAppSelector(state => state.myData.animeList)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const addToMyListHandler = (a: AnimeType) => {
      dispatch(addItemToMyList(a))
   }
   const getCurrentAnimeItemHandler = () => {
      dispatch(getCurrentAnimeItem(anime.id))
      navigator.navigation.navigate('AnimeItem')
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.pictureBlock} onPress={getCurrentAnimeItemHandler}>
            <Image source={{ uri: anime.main_picture.medium }} style={styles.picture} />
            <Text style={styles.rating}>{anime.mean ? anime.mean : 0}</Text>
         </TouchableOpacity>
         <View style={styles.description}>
            <Text style={styles.titleName}> {anime.title}</Text>
            <View style={styles.descriptionStatus}>
               {anime.start_date && (
                  <Text style={styles.descriptionTitle}>{anime.start_date.slice(0, 4)}</Text>
               )}
               <Text style={styles.descriptionTitle}> {statusAnimeItem(anime.status)}</Text>
               <Text style={styles.descriptionTitle}>total: {anime.num_episodes}</Text>
            </View>
            <View style={styles.genresBlock}>
               {anime.genres.map(a => (
                  <Text key={a.id} style={styles.genreItem}>
                     {a.name}
                  </Text>
               ))}
            </View>
            {uid && (
               <View>
                  {myList.some(a => a.id === anime.id) ? (
                     <View style={styles.buttonBlock}>
                        <Button
                           title={anime.myStatus}
                           type="outline"
                           buttonStyle={{
                              borderRadius: 30,
                              borderColor: theme.colors.secondary,
                              borderWidth: 2,
                              width: 110,
                           }}
                           titleStyle={{ color: theme.colors.secondary }}
                           onPress={() => {}}
                        />
                     </View>
                  ) : (
                     <Button
                        title="+ My List"
                        buttonStyle={{
                           borderRadius: 30,
                           backgroundColor: theme.colors.secondary,
                           width: 110,
                        }}
                        onPress={() => addToMyListHandler(anime)}
                     />
                  )}
               </View>
            )}
         </View>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         flex: 1,
         marginTop: 10,
         marginHorizontal: 10,
         flexDirection: 'row',
         backgroundColor: colors.colors.background,
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      pictureBlock: {
         width: '40%',
      },
      picture: {
         borderRadius: 10,
         height: '100%',
      },
      rating: {
         position: 'absolute',
         margin: 10,
         padding: 5,
         borderRadius: 5,
         backgroundColor: colors.colors.secondary,
         color: colors.colors.white,
      },
      genresBlock: {
         flex: 1,
         flexDirection: 'row',
         flexWrap: 'wrap',
         gap: 3,
      },
      genreItem: {
         color: colors.colors.secondary,
         fontSize: 12,
      },
      description: {
         marginLeft: 10,
         justifyContent: 'space-between',
         gap: 10,
         width: '60%',
         padding: 7,
      },
      addButton: {
         borderRadius: 20,
      },
      buttonBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10,
      },
      titleName: {
         color: colors.colors.primary,
         fontSize: 18,
         fontWeight: '600',
      },
      descriptionTitle: {
         color: colors.colors.grey0,
      },
      descriptionStatus: {
         flexDirection: 'row',
         gap: 10,
      },
   })
