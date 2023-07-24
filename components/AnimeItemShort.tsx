import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AnimeType } from '../types'
import { addItemToMyList, getMyAnimeList } from '../bll/myDataReducer'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Button } from '@rneui/themed'

export const AnimeItemShort = ({ anime }: { anime: AnimeType }) => {
   const dispatch = useAppDispatch()
   const uid = useAppSelector(state => state.auth.uid)
   const myList = useAppSelector(state => state.myData.animeList)
   const addToMyListHandler = (a: AnimeType) => {
      dispatch(addItemToMyList(a))
      dispatch(getMyAnimeList())
   }

   return (
      <View style={styles.container}>
         <View style={styles.pictureBlock}>
            <Image source={{ uri: anime.main_picture.medium }} style={styles.picture} />
            <Text style={styles.rating}>{anime.mean}</Text>
         </View>
         <View style={styles.description}>
            <Text> {anime.title}</Text>
            <Text> status: {anime.status}</Text>
            <Text>{anime.start_date.slice(0, 4)}</Text>
            <Text> episodes: {anime.num_episodes}</Text>
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
                           title="✔ My List"
                           type="outline"
                           buttonStyle={{
                              borderRadius: 30,
                              borderColor: '#06bf48',
                              borderWidth: 2,
                              width: 110,
                           }}
                           titleStyle={{ color: '#06bf48' }}
                           onPress={() => {}}
                        />
                        <Text>{anime.myStatus}</Text>
                     </View>
                  ) : (
                     <Button
                        title="+ My List"
                        buttonStyle={{
                           borderRadius: 30,
                           backgroundColor: '#06bf48',
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
const styles = StyleSheet.create({
   container: {
      flex: 1,
      marginTop: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   pictureBlock: {
      width: '40%',
   },
   picture: {
      aspectRatio: 4 / 5,
      borderRadius: 10,
   },
   rating: {
      position: 'absolute',
      margin: 10,
      padding: 5,
      borderRadius: 5,
      backgroundColor: '#06bf48',
      color: 'white',
   },
   genresBlock: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 3,
   },
   genreItem: {
      color: '#06bf48',
      fontSize: 12,
   },
   description: {
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
})
