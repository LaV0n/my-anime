import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { getSearchAnimeList } from '../bll/animeListReducer'
import { SearchBlockType } from '../common/types'

export const SearchBlock = ({ setLastRequest, goHomeLink, goFilterLink }: SearchBlockType) => {
   const [open, setOpen] = useState(false)
   const [search, setSearch] = useState('')
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const searchAnimeHandler = () => {
      dispatch(getSearchAnimeList(search))
      setLastRequest(search)
      setSearch('')
      setOpen(!open)
   }
   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={goHomeLink}>
            <Icon name={'arrow-back'} color={theme.colors.white} />
         </TouchableOpacity>
         {open ? (
            <View style={styles.searchContainer}>
               <TextInput
                  placeholder={'find anime...'}
                  placeholderTextColor={theme.colors.grey0}
                  value={search}
                  onChangeText={e => setSearch(e)}
                  style={styles.searchBlock}
                  onEndEditing={searchAnimeHandler}
               />
               <TouchableOpacity onPress={goFilterLink}>
                  <Icon name={'tune'} color={theme.colors.white} />
               </TouchableOpacity>
            </View>
         ) : (
            <TouchableOpacity onPress={() => setOpen(!open)}>
               <Icon name={'search'} color={theme.colors.white} />
            </TouchableOpacity>
         )}
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         marginTop: 20,
         height: 50,
         flexDirection: 'row',
         backgroundColor: colors.colors.background,
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingHorizontal: 20,
      },
      searchBlock: {
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         alignItems: 'center',
         paddingHorizontal: 10,
         borderRadius: 20,
         width: '90%',
         color: colors.colors.white,
      },
      searchContainer: {
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection: 'row',
         width: '90%',
      },
   })
