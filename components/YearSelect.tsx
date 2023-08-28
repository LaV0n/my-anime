import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { YearSelectType } from '../common/types'

export const YearSelect = ({ year, callback, isSeason }: YearSelectType) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const [isOpen, setIsOpen] = useState(false)
   const currentYear = new Date().getFullYear()
   const years = [
      ...Array(50)
         .fill('')
         .map((v, i) => (currentYear - i).toString()),
   ]
   if (!isSeason) {
      years.unshift('all')
   }
   const setYearHandler = (date: string) => {
      setIsOpen(false)
      callback(date)
   }

   return (
      <View style={styles.container}>
         {isOpen && (
            <View style={styles.listBlock}>
               <ScrollView horizontal={true}>
                  {years.map(y => (
                     <TouchableOpacity key={y} onPress={() => setYearHandler(y)}>
                        <Text style={styles.title}>{y}</Text>
                     </TouchableOpacity>
                  ))}
               </ScrollView>
            </View>
         )}
         <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.headerBlock}>
            <Text style={styles.name}>{year}</Text>
            {isOpen ? (
               <Icon
                  name={'expand-less'}
                  style={{ paddingLeft: 5 }}
                  color={theme.colors.secondary}
               />
            ) : (
               <Icon
                  name={'expand-more'}
                  style={{ paddingLeft: 5 }}
                  color={theme.colors.secondary}
               />
            )}
         </TouchableOpacity>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {},
      name: {
         color: colors.colors.white,
         backgroundColor: colors.colors.secondary,
         paddingHorizontal: 15,
         paddingVertical: 5,
         borderRadius: 30,
         fontSize: 16,
      },
      headerBlock: {
         flexDirection: 'row',
         gap: 5,
         alignItems: 'center',
      },
      title: {
         color: colors.colors.primary,
         textAlign: 'center',
         paddingHorizontal: 5,
      },
      listBlock: {
         padding: 10,
         marginBottom: 10,
         borderStyle: 'solid',
         borderWidth: 2,
         borderColor: colors.colors.secondary,
         borderRadius: 30,
      },
   })
