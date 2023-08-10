import React, { useState } from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { addItemToMyList } from '../bll/myDataReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { statusAnimeItem } from '../utils/utils'
import { CustomFlatLIst } from '../components/CustomFlatLIst'
import { RatingStars } from '../components/RatingStars'
import { CustomSelectList } from '../components/CustomSelectList'

export const AnimeItem = ({ navigation }: RootTabScreenProps<'AnimeItem'>) => {
   const currentAnime = useAppSelector(state => state.animeList.currentAnimeItem)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const [viewMore, setViewMore] = useState(false)
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

   if (statusApp === 'loading' || !currentAnime) {
      return <LoadingIndicator />
   }

   return (
      <ScrollView style={styles.container}>
         <View>
            <LinearGradient colors={[theme.colors.grey2, 'transparent']} style={styles.upperBlock}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackLink}>
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
                  <CustomSelectList
                     idDoc={currentAnime.idDoc}
                     myStatus={currentAnime.myStatus}
                     currentAnimeId={currentAnime.id}
                     isMyList={false}
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
         <Text style={styles.nameTitle}>{currentAnime.title}</Text>
         <View>
            {currentAnime.alternative_titles.synonyms.length !== 0 && (
               <Text style={styles.smallTitleGrey}>
                  synonyms: {currentAnime.alternative_titles.synonyms}
               </Text>
            )}
            <Text style={styles.smallTitleGrey}>eng: {currentAnime.alternative_titles.en}</Text>
            <Text style={styles.smallTitleGrey}> jp: {currentAnime.alternative_titles.ja}</Text>
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
            {currentAnime.studios.map(s => (
               <Text style={styles.smallTitle} key={s.id}>
                  {s.name}
               </Text>
            ))}
            <Text style={styles.smallTitle}>{statusAnimeItem(currentAnime.status)}</Text>
            <Text style={styles.smallTitle}> episodes: {currentAnime.num_episodes}</Text>
         </View>
         <View style={styles.shortStatBlock}>
            <Text style={styles.smallTitle}>type: {currentAnime.media_type}</Text>
            <Text style={styles.smallTitle}>source: {currentAnime.source.replace('_', ' ')}</Text>
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
         <View>
            <Text style={styles.secondTitle}> Statistics of viewers</Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>watching: </Text>
               {currentAnime.statistics.status.watching}
            </Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>completed: </Text>
               {currentAnime.statistics.status.completed}
            </Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>plan to watch: </Text>
               {currentAnime.statistics.status.plan_to_watch}
            </Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>dropped: </Text>
               {currentAnime.statistics.status.dropped}
            </Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>on hold: </Text>
               {currentAnime.statistics.status.on_hold}
            </Text>
            <Text style={styles.smallTitle}>
               <Text style={styles.smallTitleGrey}>total: </Text>{' '}
               {currentAnime.statistics.num_list_users}
            </Text>
         </View>
      </ScrollView>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         backgroundColor: colors.colors.background,
      },
      nameTitle: {
         color: colors.colors.white,
         marginVertical: 10,
         fontSize: 24,
         fontWeight: '600',
      },
      shortStatBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         gap: 10,
         justifyContent: 'flex-start',
         height: 30,
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
         color: colors.colors.white,
         marginTop: 20,
         fontSize: 20,
         fontWeight: '600',
      },
      smallTitle: {
         color: colors.colors.white,
      },
      smallTitleGrey: {
         color: colors.colors.grey0,
      },
   })
