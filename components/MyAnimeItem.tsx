import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AnimeType } from '../types'
import { Icon } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { changeItemData, delItemFromMyList } from '../bll/profileReducer'
import { SelectList } from 'react-native-dropdown-select-list/index'

export const MyAnimeItem = ({ anime }: { anime: AnimeType }) => {
   const dispatch = useAppDispatch()
   const [selected, setSelected] = useState('')
   const data = [
      { key: '1', value: 'watched' },
      { key: '2', value: 'unwatch' },
      { key: '3', value: 'dropped' },
   ]

   const onSelectedHandler = () => {
      dispatch(changeItemData({ id: anime.idDoc, data: selected }))
   }

   const delItemHandler = (id: string) => {
      dispatch(delItemFromMyList(id))
   }

   return (
      <View style={styles.container}>
         <View style={styles.pictureBlock}>
            <Image source={{ uri: anime.main_picture.medium }} style={styles.picture} />
            <Text style={styles.rating}>{anime.mean}</Text>
         </View>
         <View style={styles.description}>
            <Text> {anime.title}</Text>
            <Text> episodes: {anime.num_episodes}</Text>
            <View style={styles.actionBlock}>
               <Text>{anime.myStatus}</Text>
               <SelectList
                  setSelected={(val: string) => setSelected(val)}
                  data={data}
                  save="value"
                  search={false}
                  boxStyles={styles.selectBlock}
                  onSelect={onSelectedHandler}
                  /*defaultOption={data.filter(d => d.value === anime.myStatus)[0]}*/
               />
               <Icon
                  name={'delete'}
                  color={'#06bf48'}
                  type="antdesign"
                  size={20}
                  onPress={() => delItemHandler(anime.idDoc)}
               />
            </View>
         </View>
      </View>
   )
}
const styles = StyleSheet.create({
   container: {
      marginTop: 10,
      marginHorizontal: 10,
      flexDirection: 'row',
      backgroundColor: '#fff',
      justifyContent: 'space-between',
   },
   pictureBlock: {
      width: '40%',
   },
   picture: {
      aspectRatio: 1,
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
   description: {
      justifyContent: 'space-between',
      gap: 10,
      width: '60%',
      padding: 7,
   },
   actionBlock: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   selectBlock: {
      borderRadius: 15,
      width: 120,
   },
})
