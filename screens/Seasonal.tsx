import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { NotFound } from '../components/NotFound'
import { AnimeItemShort } from '../components/AnimeItemShort'
import { RootTabScreenProps, SeasonDateType, SeasonTabType } from '../common/types'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getSeasonAnimeList, setCurrentPage } from '../bll/animeListReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { ErrorMessage } from '../components/ErrorMessage'
import { useIsFocused } from '@react-navigation/native'
import { seasonKind } from '../utils/utils'
import { ArchiveSeason } from '../components/ArchiveSeason'
import { changeFilterScreen } from '../bll/appReducer'
import { PagesBlock } from '../components/PagesBlock'
import ScrollViewOffset from 'react-native-scrollview-offset'

export const Seasonal = (navigator: RootTabScreenProps<'Seasonal'>) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const animeList = useAppSelector(state => state.animeList.homeAnimeList)
   const dispatch = useAppDispatch()
   const [seasonTab, setSeasonTab] = useState<SeasonTabType>('This Season')
   const [archiveDate, setArchiveDate] = useState<SeasonDateType>({
      season: 'spring',
      year: '2023',
   })
   const [toTopScreenPosition, setToTopScreenPosition] = useState(true)
   const currentPage = useAppSelector(state => state.animeList.currentPage)
   const pageSize = useAppSelector(state => state.animeList.pageSize)
   const myAnimeList = useAppSelector(state => state.myData.animeList)
   const currentYear = new Date().getFullYear().toString()
   const isFocused = useIsFocused()
   const getCurrentSeason = () => {
      setSeasonTab('This Season')
      dispatch(setCurrentPage(0))
   }
   const getLastSeason = () => {
      setSeasonTab('Last')
      dispatch(setCurrentPage(0))
   }
   const getNextSeason = () => {
      setSeasonTab('Next')
      dispatch(setCurrentPage(0))
   }
   const getArchiveSeason = () => {
      setSeasonTab('Archive')
      dispatch(setCurrentPage(0))
   }
   const SeasonTab = ({ name, callback }: { name: SeasonTabType; callback?: () => void }) => {
      return (
         <TouchableOpacity onPress={callback}>
            <Text style={name === seasonTab ? styles.tabTitleActive : styles.tabTitle}>{name}</Text>
         </TouchableOpacity>
      )
   }

   const goFilterLink = () => {
      dispatch(changeFilterScreen('season'))
      navigator.navigation.navigate('Filter')
   }
   const getSeasonAnimeListHandler = () => {
      if (seasonTab === 'Last') {
         const date: SeasonDateType = {
            year: currentYear,
            season: seasonKind({ type: 'prev' }),
         }
         dispatch(getSeasonAnimeList(date))
      }
      if (seasonTab === 'This Season') {
         const date: SeasonDateType = {
            year: currentYear,
            season: seasonKind({ type: 'current' }),
         }
         dispatch(getSeasonAnimeList(date))
      }
      if (seasonTab == 'Next') {
         const date: SeasonDateType = {
            year: currentYear,
            season: seasonKind({ type: 'next' }),
         }
         dispatch(getSeasonAnimeList(date))
      }
      if (seasonTab == 'Archive') {
         dispatch(getSeasonAnimeList(archiveDate))
      }
   }

   useEffect(() => {
      if (isFocused) {
         getSeasonAnimeListHandler()
      }
   }, [isFocused, currentPage, pageSize, myAnimeList, seasonTab, archiveDate])

   useEffect(() => {
      setToTopScreenPosition(true)
      setTimeout(() => {
         setToTopScreenPosition(false)
      }, 2000)
   }, [isFocused, currentPage, pageSize, seasonTab, archiveDate])

   useEffect(() => {
      dispatch(setCurrentPage(0))
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
            <TouchableOpacity onPress={goFilterLink}>
               <Icon name={'tune'} color={theme.colors.primary} />
            </TouchableOpacity>
         </View>
         {seasonTab === 'Archive' && (
            <ArchiveSeason archiveDate={archiveDate} setArchiveDate={setArchiveDate} />
         )}
         <ScrollViewOffset
            contentOffset={toTopScreenPosition ? { x: 0, y: 0 } : undefined}
            style={seasonTab === 'Archive' ? { height: '85%' } : { height: '93%' }}
         >
            {animeList.length === 0 || !animeList ? (
               <NotFound />
            ) : (
               <>
                  {animeList.map(a => (
                     <AnimeItemShort
                        anime={a}
                        key={a.id}
                        navigator={navigator}
                        backKey={'season'}
                     />
                  ))}
                  <PagesBlock />
               </>
            )}
         </ScrollViewOffset>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
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
