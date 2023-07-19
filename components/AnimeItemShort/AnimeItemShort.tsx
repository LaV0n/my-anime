import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { AnimeType } from '../../types'
import { addItemToMyList } from '../../bll/profileReducer'
import { useAppDispatch } from '../../bll/store'

export const AnimeItemShort = ({ anime }: { anime: AnimeType }) => {
   const dispatch = useAppDispatch()
   const addToMyListHandler = (a: AnimeType) => {
      dispatch(addItemToMyList(a))
   }

   return (
      <View>
         <Image source={{ uri: anime.picture }} style={styles.picture} />
         <Text>name: {anime.title}</Text>
         <Button title="+" onPress={() => addToMyListHandler(anime)} />
      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
   picture: {
      width: 100,
      height: 100,
   },
})
