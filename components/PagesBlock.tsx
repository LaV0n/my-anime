import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { setCurrentPage, setPageSize } from '../bll/animeListReducer'

export const PagesBlock = () => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const currentPage = useAppSelector(state => state.animeList.currentPage)
   const pageSize = useAppSelector(state => state.animeList.pageSize)
   const dispatch = useAppDispatch()
   const nextPageHandler = () => {
      dispatch(setCurrentPage(currentPage + pageSize))
   }
   const previousPageHandler = () => {
      dispatch(setCurrentPage(currentPage - pageSize))
   }

   const PageInput = () => {
      const [isOpen, setIsOpen] = useState(false)
      const [value, setValue] = useState(pageSize)
      const inputHandler = () => {
         dispatch(setPageSize(value ? value : 5))
         setIsOpen(false)
      }
      return (
         <View style={styles.inputBlock}>
            <Text style={styles.title}>Number per page: </Text>
            {isOpen ? (
               <TextInput
                  style={styles.inputPage}
                  placeholder={pageSize.toString()}
                  keyboardType="numeric"
                  value={value.toString()}
                  onChangeText={e => setValue(+e)}
                  onEndEditing={inputHandler}
                  autoFocus
               />
            ) : (
               <TouchableOpacity onPress={() => setIsOpen(true)} style={styles.inputBlock}>
                  <Text style={styles.mainTitle}>{pageSize}</Text>
                  <Icon name={'edit'} color={theme.colors.primary} size={16} />
               </TouchableOpacity>
            )}
         </View>
      )
   }

   return (
      <View style={styles.container}>
         <PageInput />
         <View style={styles.pagesBlock}>
            <TouchableOpacity
               onPress={previousPageHandler}
               style={styles.button}
               disabled={currentPage === 0}
            >
               <Icon
                  name={'arrow-back-ios'}
                  color={currentPage === 0 ? theme.colors.grey0 : theme.colors.primary}
               />
            </TouchableOpacity>
            <Text style={styles.mainTitle}>{(currentPage + pageSize) / pageSize}</Text>
            <TouchableOpacity onPress={nextPageHandler} style={styles.button}>
               <Icon name={'arrow-forward-ios'} color={theme.colors.primary} />
            </TouchableOpacity>
         </View>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         marginTop: 10,
         paddingVertical: 5,
         gap: 10,
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         borderRadius: 5,
      },
      inputPage: {
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         color: colors.colors.primary,
         paddingHorizontal: 10,
         borderRadius: 5,
      },
      inputBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 5,
         paddingLeft: 10,
      },
      pagesBlock: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         width: '100%',
         paddingHorizontal: 10,
      },
      title: {
         color: colors.colors.grey0,
         fontSize: 16,
      },
      mainTitle: {
         color: colors.colors.primary,
         fontSize: 18,
      },
      button: {
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         color: colors.colors.primary,
         width: 100,
         borderRadius: 5,
         paddingVertical: 5,
         alignItems: 'center',
         justifyContent: 'center',
      },
   })
