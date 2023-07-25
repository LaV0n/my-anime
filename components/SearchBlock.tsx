import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Icon } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { getSearchAnimeList } from '../bll/animeListReducer'
import { SearchBlockType } from '../common/types'

export const SearchBlock = ({ setLastRequest, goHomeLink, goFilterLink }: SearchBlockType) => {
   const [open, setOpen] = useState(false)
   const [search, setSearch] = useState('')
   const dispatch = useAppDispatch()

   const searchAnimeHandler = () => {
      dispatch(getSearchAnimeList(search))
      setLastRequest(search)
      setSearch('')
      setOpen(!open)
   }
   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={goHomeLink}>
            <Icon name={'arrow-back'} color={'black'} />
         </TouchableOpacity>
         {open ? (
            <View style={styles.searchContainer}>
               <TextInput
                  placeholder={'find anime...'}
                  value={search}
                  onChangeText={e => setSearch(e)}
                  style={styles.searchBlock}
                  onEndEditing={searchAnimeHandler}
               />
               <TouchableOpacity onPress={goFilterLink}>
                  <Icon name={'tune'} color={'black'} />
               </TouchableOpacity>
            </View>
         ) : (
            <TouchableOpacity onPress={() => setOpen(!open)}>
               <Icon name={'search'} color={'black'} />
            </TouchableOpacity>
         )}
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
      alignItems: 'center',
      paddingHorizontal: 10,
      borderRadius: 20,
      width: '90%',
   },
   searchContainer: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '90%',
   },
})
