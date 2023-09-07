import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { setFilterMyListData } from '../bll/myDataReducer'
import { FilterDataType } from '../common/types'

export const MyStatusLink = ({ name }: { name: string }) => {
   const filterMyStatus = useAppSelector(state => state.myData.filterData.myStatus)
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const dispatch = useAppDispatch()

   const setFilterHandler = () => {
      const filterData: FilterDataType = {
         sortByRating: 'rating',
         releaseFilter: 'all',
         category: 'all',
         genre: ['all'],
         myStatus: name,
         myStars: '0',
      }
      dispatch(setFilterMyListData(filterData))
   }

   return (
      <TouchableOpacity onPress={setFilterHandler}>
         <Text
            style={filterMyStatus === name ? styles.statusLinkTitleActive : styles.statusLinkTitle}
         >
            {name.charAt(0).toUpperCase() + name.slice(1).replaceAll('-', ' ')}
         </Text>
      </TouchableOpacity>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      statusLinkTitle: {
         color: colors.colors.primary,
         textAlign: 'center',
         fontSize: 18,
         fontWeight: '400',
         paddingHorizontal: 10,
      },
      statusLinkTitleActive: {
         color: colors.colors.secondary,
         textAlign: 'center',
         fontSize: 18,
         fontWeight: '600',
         textDecorationLine: 'underline',
         paddingHorizontal: 10,
      },
   })
