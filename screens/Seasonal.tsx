import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Theme, useTheme } from '@rneui/themed'
import { NotFound } from '../components/NotFound'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { RootTabScreenProps, SeasonDateType, SeasonTabType } from '../common/types'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getSeasonAnimeList } from '../bll/animeListReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { ErrorMessage } from '../components/ErrorMessage'
import { useIsFocused } from '@react-navigation/native'
import { seasonKind } from '../utils/utils'
import { ArchiveSeason } from '../components/ArchiveSeason'

export const Seasonal = (navigator: RootTabScreenProps<'Seasonal'>) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const dispatch = useAppDispatch()
   const [seasonTab, setSeasonTab] = useState<SeasonTabType>('This Season')

   const currentYear = new Date().getFullYear().toString()
   const isFocused = useIsFocused()
   const getCurrentSeason = () => {
      const date: SeasonDateType = {
         year: currentYear,
         season: seasonKind({ type: 'current' }),
      }
      dispatch(getSeasonAnimeList(date))
      setSeasonTab('This Season')
   }
   const getLastSeason = () => {
      const date: SeasonDateType = {
         year: currentYear,
         season: seasonKind({ type: 'prev' }),
      }

      dispatch(getSeasonAnimeList(date))
      setSeasonTab('Last')
   }
   const getNextSeason = () => {
      const date: SeasonDateType = {
         year: currentYear,
         season: seasonKind({ type: 'next' }),
      }

      dispatch(getSeasonAnimeList(date))
      setSeasonTab('Next')
   }
   const getArchiveSeason = () => {
      setSeasonTab('Archive')
   }
   const SeasonTab = ({ name, callback }: { name: SeasonTabType; callback?: () => void }) => {
      return (
         <TouchableOpacity onPress={callback}>
            <Text style={name === seasonTab ? styles.tabTitleActive : styles.tabTitle}>{name}</Text>
         </TouchableOpacity>
      )
   }
   useEffect(() => {
      if (isFocused) {
         getCurrentSeason()
      }
   }, [isFocused])

   return (
      <View style={styles.container}>
         <LoadingIndicator />
         <ErrorMessage />
         <View style={styles.tabBlock}>
            <SeasonTab name={'Last'} callback={getLastSeason} />
            <SeasonTab name={'This Season'} callback={getCurrentSeason} />
            <SeasonTab name={'Next'} callback={getNextSeason} />
            <SeasonTab name={'Archive'} callback={getArchiveSeason} />
         </View>
         {seasonTab === 'Archive' && <ArchiveSeason />}
         <ScrollView>
            {(animeList.length === 0 || !animeList) && <NotFound />}
            {animeList.map(a => (
               <AnimeItemShort anime={a} key={a.id} navigator={navigator} />
            ))}
         </ScrollView>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
         paddingVertical: 20,
         height: '100%',
      },
      tabBlock: {
         paddingBottom: 10,
         justifyContent: 'space-around',
         flexDirection: 'row',
      },
      tabTitle: {
         color: colors.colors.primary,
         textAlign: 'center',
         fontSize: 18,
         fontWeight: '400',
         paddingHorizontal: 10,
      },
      tabTitleActive: {
         color: colors.colors.secondary,
         textAlign: 'center',
         fontSize: 18,
         fontWeight: '600',
         textDecorationLine: 'underline',
         paddingHorizontal: 10,
      },
   })
