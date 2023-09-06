import React, { useState } from 'react'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { changeItemData } from '../bll/myDataReducer'
import { useAppDispatch } from '../bll/store'
import { CustomSelectListType } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const CustomSelectList = ({
   idDoc,
   myStatus,
   isMyList,
   currentAnimeId,
   totalSeries,
}: CustomSelectListType) => {
   const [isOpen, setIsOpen] = useState(false)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const animeStatus = ['completed', 'unwatched', 'dropped', 'watching']

   const onSelectedHandler = async (status: string) => {
      if (myStatus !== status) {
         if (status === 'completed') {
            dispatch(changeItemData({ id: idDoc, data: +totalSeries, requestType: 'myProgress' }))
         }
         await dispatch(changeItemData({ id: idDoc, data: status, requestType: 'myStatus' }))

         if (currentAnimeId) {
            dispatch(getCurrentAnimeItem(currentAnimeId))
         }
      }
      setIsOpen(false)
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.headerBlock}>
            <Text style={{ color: isMyList ? theme.colors.primary : theme.colors.white }}>
               {myStatus}
            </Text>
            {isOpen ? (
               <Icon
                  name={'expand-less'}
                  style={{ paddingLeft: 5 }}
                  color={isMyList ? theme.colors.primary : theme.colors.white}
               />
            ) : (
               <Icon
                  name={'expand-more'}
                  style={{ paddingLeft: 5 }}
                  color={isMyList ? theme.colors.primary : theme.colors.white}
               />
            )}
         </TouchableOpacity>
         {isOpen && (
            <View style={styles.itemsList}>
               {animeStatus.map(s => (
                  <TouchableOpacity key={s} onPress={() => onSelectedHandler(s)}>
                     <Text style={{ color: isMyList ? theme.colors.primary : theme.colors.white }}>
                        {s}
                     </Text>
                  </TouchableOpacity>
               ))}
            </View>
         )}
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      headerBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      container: {
         margin: 5,
         paddingHorizontal: 10,
         paddingVertical: 5,
         borderStyle: 'solid',
         borderWidth: 1,
         borderColor: colors.colors.grey0,
         borderRadius: 5,
         width: 120,
      },
      itemsList: {
         gap: 5,
         marginBottom: 5,
         marginTop: 10,
      },
   })
