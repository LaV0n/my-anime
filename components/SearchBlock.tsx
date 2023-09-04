import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getSearchAnimeList, setCurrentPage, setLastSearchRequest } from '../bll/animeListReducer'
import { SearchBlockType } from '../common/types'
import { getMyAnimeList, searchMyList } from '../bll/myDataReducer'

export const SearchBlock = ({ goFilterLink, filterScreen }: SearchBlockType) => {
   const lastSearch = useAppSelector(state => state.animeList.lastRequest)
   const [search, setSearch] = useState(lastSearch ? lastSearch : '')
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const searchAnimeHandler = async () => {
      if (filterScreen === 'search') {
         dispatch(setCurrentPage(0))
         dispatch(setLastSearchRequest(search))
         dispatch(getSearchAnimeList(search))
      }
      if (filterScreen === 'myList') {
         await dispatch(getMyAnimeList())
         dispatch(searchMyList(search))
      }
   }
   return (
      <View style={styles.container}>
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
               <Icon name={'tune'} color={theme.colors.primary} />
            </TouchableOpacity>
         </View>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         marginTop: 5,
         height: 50,
         flexDirection: 'row',
         backgroundColor: colors.colors.background,
         alignItems: 'center',
         justifyContent: 'flex-end',
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
         color: colors.colors.primary,
      },
      searchContainer: {
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection: 'row',
         width: '90%',
      },
   })
