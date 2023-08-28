import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { YearSelect } from './YearSelect'
import { SeasonDateType, SeasonType } from '../common/types'
import { getSeasonAnimeList } from '../bll/animeListReducer'
import { useAppDispatch } from '../bll/store'

export const ArchiveSeason = () => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const [year, setYear] = useState('2023')
   const [season, setSeason] = useState<SeasonType>('spring')
   const [seasonArchive, setSeasonArchive] = useState<SeasonDateType | null>(null)
   const dispatch = useAppDispatch()

   const SeasonButton = ({ name }: { name: SeasonType }) => {
      return (
         <TouchableOpacity
            onPress={() => setSeason(name)}
            style={season === name ? styles.buttonActive : styles.button}
         >
            <Text style={styles.buttonTitle}>{name}</Text>
         </TouchableOpacity>
      )
   }

   const setArchiveSeasonHandler = () => {
      const date: SeasonDateType = {
         year,
         season,
      }
      setSeasonArchive(date)
      dispatch(getSeasonAnimeList(date))
   }

   return (
      <>
         {seasonArchive ? (
            <View style={styles.headerBlock}>
               <Text style={styles.title}>{seasonArchive.year}</Text>
               <Text style={styles.title}>{seasonArchive.season}</Text>
               <TouchableOpacity onPress={() => setSeasonArchive(null)}>
                  <Icon name={'close'} color={theme.colors.primary} />
               </TouchableOpacity>
            </View>
         ) : (
            <View style={styles.container}>
               <Text style={styles.title}>Select Year</Text>
               <YearSelect year={year} callback={setYear} isSeason />
               <Text style={styles.title}>Select Season</Text>
               <View style={styles.seasonBlock}>
                  <SeasonButton name={'spring'} />
                  <SeasonButton name={'summer'} />
                  <SeasonButton name={'fall'} />
                  <SeasonButton name={'winter'} />
               </View>
               <TouchableOpacity style={styles.getButton} onPress={setArchiveSeasonHandler}>
                  <Text style={styles.title}>Get Archive Season</Text>
               </TouchableOpacity>
            </View>
         )}
      </>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         paddingVertical: 10,
         height: '100%',
      },
      title: {
         color: colors.colors.primary,
         paddingVertical: 10,
         textAlign: 'center',
         fontSize: 20,
         fontWeight: '600',
      },
      button: {
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         borderRadius: 5,
         paddingHorizontal: 10,
         justifyContent: 'center',
         alignItems: 'center',
      },
      buttonActive: {
         backgroundColor: colors.colors.secondary,
         borderRadius: 5,
         paddingHorizontal: 10,
         justifyContent: 'center',
         alignItems: 'center',
      },
      buttonTitle: {
         color: colors.colors.primary,
         paddingVertical: 10,
         textAlign: 'center',
         fontSize: 20,
         fontWeight: '400',
      },
      seasonBlock: {
         paddingHorizontal: 5,
         flexDirection: 'row',
         justifyContent: 'space-between',
      },
      getButton: {
         backgroundColor: colors.colors.secondary,
         marginTop: 50,
         borderRadius: 5,
         paddingHorizontal: 10,
         justifyContent: 'center',
         alignItems: 'center',
      },
      headerBlock: {
         borderStyle: 'solid',
         borderColor: colors.colors.grey0,
         borderWidth: 1,
         borderRadius: 5,
         paddingHorizontal: 10,
         marginHorizontal: 5,
         marginBottom: 10,
         justifyContent: 'space-between',
         alignItems: 'center',
         flexDirection: 'row',
      },
   })
