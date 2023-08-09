import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { FilterButtonType } from '../common/types'

export const FilterButton = ({ name, filterData, callback }: FilterButtonType) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const data = name.toLowerCase().replace(/\s/g, '')
   const isTrueHandler = () => {
      if (typeof filterData === 'string') {
         return filterData === data
      } else {
         return filterData.includes(data)
      }
   }

   return (
      <TouchableOpacity
         style={isTrueHandler() ? styles.filterItemActive : styles.filterItem}
         onPress={() => callback(data)}
      >
         <Text style={isTrueHandler() ? styles.filterNameActive : styles.filterName}>{name}</Text>
      </TouchableOpacity>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      filterItem: {
         borderRadius: 30,
         backgroundColor: colors.colors.background,
         borderColor: colors.colors.secondary,
         borderWidth: 2,
      },
      filterName: {
         color: colors.colors.secondary,
         paddingHorizontal: 15,
         paddingVertical: 5,
         fontSize: 16,
      },
      filterItemActive: {
         borderRadius: 30,
         backgroundColor: colors.colors.secondary,
         borderColor: colors.colors.secondary,
         borderWidth: 2,
      },
      filterNameActive: {
         color: colors.colors.white,
         paddingHorizontal: 15,
         paddingVertical: 5,
         fontSize: 16,
      },
   })
