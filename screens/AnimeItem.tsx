import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { addItemToMyList } from '../bll/myDataReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { chooseBackLink, statusAnimeItem } from '../utils/utils'
import { CustomFlatLIst } from '../components/CustomFlatLIst'
import { RatingStars } from '../components/RatingStars'
import { CustomSelectList } from '../components/CustomSelectList'
import { StatisticBlock } from '../components/StatisticBlock'
import { ProgressLine } from '../components/ProgressLine'

export const AnimeItem = ({ navigation }: RootTabScreenProps<'AnimeItem'>) => {
   const currentAnime = useAppSelector(state => state.animeList.currentAnimeItem)
   const filterScreen = useAppSelector(state => state.app.filterScreen)
   const [viewMore, setViewMore] = useState(true)
   const uid = useAppSelector(state => state.auth.uid)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const addToMyListHandler = () => {
      if (currentAnime) {
         dispatch(addItemToMyList(currentAnime))
         dispatch(getCurrentAnimeItem(currentAnime.id))
      }
   }

   const toggleViewMode = () => {
      setViewMore(!viewMore)
   }
   if (!currentAnime) {
      return <LoadingIndicator />
   }

   return (
      <ScrollView style={styles.container}>
         <LoadingIndicator />
         <View>
            <LinearGradient colors={[theme.colors.grey2, 'transparent']} style={styles.upperBlock}>
               <TouchableOpacity
                  onPress={() => navigation.navigate(chooseBackLink(filterScreen))}
                  style={styles.goBackLink}
               >
                  <Icon name={'arrow-back'} color={theme.colors.white} />
               </TouchableOpacity>
            </LinearGradient>
            <Image source={{ uri: currentAnime.main_picture.large }} style={styles.coverImg} />
            {currentAnime.idDoc ? (
               <View style={styles.myRatingBlock}>
                  <RatingStars
                     id={currentAnime.idDoc}
                     myRating={currentAnime.myRating}
                     selectedColor={theme.colors.secondary}
                     currentAnimeId={currentAnime.id}
                  />
                  <ProgressLine
                     startValue={currentAnime.myProgress}
                     maxValue={+currentAnime.num_episodes}
                     idDoc={currentAnime.idDoc}
                  />
                  <CustomSelectList
                     idDoc={currentAnime.idDoc}
                     myStatus={currentAnime.myStatus}
                     currentAnimeId={currentAnime.id}
                     isMyList={false}
                     totalSeries={currentAnime.num_episodes}
                  />
               </View>
            ) : (
               uid && (
                  <TouchableOpacity style={styles.myRatingBlock} onPress={addToMyListHandler}>
                     <Icon name={'add'} color={theme.colors.secondary} />
                  </TouchableOpacity>
               )
            )}
         </View>
         <View style={styles.descriptionBlock}>
            <Text style={styles.nameTitle}>{currentAnime.title}</Text>
            <View>
               {currentAnime.alternative_titles.synonyms.length !== 0 && (
                  <Text style={styles.smallTitleGrey}>
                     synonyms:{' '}
                     <Text style={styles.smallTitle}>
                        {currentAnime.alternative_titles.synonyms}
                     </Text>
                  </Text>
               )}
               <Text style={styles.smallTitleGrey}>
                  eng: <Text style={styles.smallTitle}>{currentAnime.alternative_titles.en}</Text>
               </Text>
               <Text style={styles.smallTitleGrey}>
                  jp: <Text style={styles.smallTitle}>{currentAnime.alternative_titles.ja}</Text>
               </Text>
            </View>
            <View style={styles.shortStatBlock}>
               <Icon name={'star'} color={theme.colors.secondary} size={20} />
               <Text style={styles.meanTitle}>{currentAnime.mean}</Text>
               <Text style={styles.smallTitle}>Ranked #{currentAnime.rank}</Text>
               <Text style={styles.smallTitle}>Popularity #{currentAnime.popularity}</Text>
               <Text style={styles.ratingTitle}>
                  {currentAnime.rating.replace('_', ' ').toUpperCase()}
               </Text>
            </View>
            <View style={styles.shortStatBlock}>
               {currentAnime.start_date && (
                  <Text style={styles.smallTitle}>{currentAnime.start_date.slice(0, 4)}</Text>
               )}
               <Text style={styles.smallTitle}>{statusAnimeItem(currentAnime.status)}</Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>episodes: </Text>
                  {currentAnime.num_episodes}
               </Text>
            </View>
            <View style={styles.shortStatBlock}>
               <Text style={styles.smallTitleGrey}>studios: </Text>
               {currentAnime.studios.map(s => (
                  <Text style={styles.smallTitle} key={s.id}>
                     {s.name}
                  </Text>
               ))}
            </View>
            <View style={styles.shortStatBlock}>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>type: </Text>
                  {currentAnime.media_type}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>source: </Text>
                  {currentAnime.source.replace('_', ' ')}
               </Text>
            </View>
            <View style={styles.shortStatBlock}>
               {currentAnime.genres.map(g => (
                  <Text style={{ color: theme.colors.secondary }} key={g.id}>
                     {g.name}
                  </Text>
               ))}
            </View>
            <View>
               <Text numberOfLines={viewMore ? 3 : undefined} style={styles.smallTitle}>
                  {currentAnime.synopsis}
               </Text>
               <Text style={{ color: theme.colors.secondary }} onPress={toggleViewMode}>
                  {viewMore ? 'read more...' : 'read less...'}
               </Text>
            </View>
            <CustomFlatLIst name={'Covers images'} data={currentAnime.pictures} isLinked={false} />
            <CustomFlatLIst name={'Related'} data={currentAnime.related_anime} isLinked={true} />
            <CustomFlatLIst
               name={'Recommendations'}
               data={currentAnime.recommendations}
               isLinked={true}
            />
            <StatisticBlock
               status={currentAnime.statistics.status}
               num_list_users={currentAnime.statistics.num_list_users}
            />
         </View>
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
      },
      descriptionBlock: {
         padding: 5,
      },
      nameTitle: {
         color: colors.colors.primary,
         marginVertical: 10,
         fontSize: 24,
         fontWeight: '600',
      },
      shortStatBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         flexWrap: 'wrap',
         gap: 10,
         justifyContent: 'flex-start',
         minHeight: 30,
      },
      coverImg: {
         minHeight: 500,
      },
      goBackLink: {
         position: 'absolute',
         left: 20,
         top: 20,
         zIndex: 10,
      },
      meanTitle: {
         color: colors.colors.secondary,
         fontSize: 16,
         marginLeft: -10,
      },
      ratingTitle: {
         color: colors.colors.secondary,
         borderStyle: 'solid',
         borderColor: colors.colors.secondary,
         borderWidth: 1,
         borderRadius: 5,
         paddingVertical: 4,
         paddingHorizontal: 8,
      },
      myRatingBlock: {
         alignItems: 'center',
         gap: 5,
         zIndex: 15,
         position: 'absolute',
         right: 10,
         top: 10,
         padding: 10,
         borderRadius: 25,
         backgroundColor: colors.colors.grey2,
      },
      upperBlock: {
         width: '100%',
         position: 'absolute',
         top: 0,
         height: 70,
         zIndex: 2,
      },
      secondTitle: {
         color: colors.colors.primary,
         marginTop: 20,
         marginBottom: 10,
         fontSize: 20,
         fontWeight: '600',
      },
      smallTitle: {
         color: colors.colors.primary,
      },
      smallTitleGrey: {
         color: colors.colors.grey0,
      },
   })
