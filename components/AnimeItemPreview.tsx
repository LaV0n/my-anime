import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { useAppDispatch } from '../bll/store'
import { AnimeResponseType, RootTabScreenProps } from '../common/types'

export const AnimeItemPreview = ({
   anime,
   navigator,
}: {
   anime: AnimeResponseType
   navigator: RootTabScreenProps<'Home'>
}) => {
   const dispatch = useAppDispatch()

   const getCurrentAnimeItemHandler = () => {
      dispatch(getCurrentAnimeItem(anime.node.id))
      navigator.navigation.navigate('AnimeItem')
   }

   return (
      <TouchableOpacity style={styles.pictureBlock} onPress={getCurrentAnimeItemHandler}>
         <Image source={{ uri: anime.node.main_picture.medium }} style={styles.picture} />
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   pictureBlock: {
      width: 150,
      marginLeft: 10,
   },
   picture: {
      aspectRatio: 3 / 4,
      borderRadius: 10,
   },
})
