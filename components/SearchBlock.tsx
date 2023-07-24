import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { getSearchAnimeList } from '../bll/animeListReducer'

export const SearchBlock = ({ setLastRequest }: { setLastRequest: (value: any) => void }) => {
   const [search, setSearch] = useState('')
   const dispatch = useAppDispatch()

   const searchAnimeHandler = () => {
      dispatch(getSearchAnimeList(search))
      setLastRequest(JSON.stringify(getSearchAnimeList(search)))
      setSearch('')
   }
   return (
      <View style={styles.container}>
         <TextInput
            placeholder={'find anime...'}
            value={search}
            onChangeText={e => setSearch(e)}
            style={styles.searchBlock}
         />
         <TouchableOpacity onPress={searchAnimeHandler}>
            <Icon name={'search'} />
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      marginTop: 20,
      height: 50,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
   },
   searchBlock: {
      borderStyle: 'solid',
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 20,
      fontSize: 20,
      height: '90%',
      width: '80%',
      paddingHorizontal: 10,
   },
})
