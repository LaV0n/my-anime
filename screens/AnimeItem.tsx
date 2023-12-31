import React, { useState } from 'react'
import { BackHandler, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { Button, Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { addItemToMyList } from '../bll/myDataReducer'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { LinearGradient } from 'expo-linear-gradient'
import { chooseBackLink, statusAnimeItem, titleNameSelector } from '../utils/utils'
import { CustomFlatLIst } from '../components/CustomFlatLIst'
import { RatingStars } from '../components/RatingStars'
import { CustomSelectList } from '../components/CustomSelectList'
import { StatisticBlock } from '../components/StatisticBlock'
import { ProgressLine } from '../components/ProgressLine'
import ScrollViewOffset from 'react-native-scrollview-offset'
import { delBackLinkStep } from '../bll/appReducer'
import { useFocusEffect } from '@react-navigation/native'

export const AnimeItem = (navigate: RootTabScreenProps<'AnimeItem'>) => {
   const currentAnime = useAppSelector(state => state.animeList.currentAnimeItem)
   const backLinkSteps = useAppSelector(state => state.app.backLinkSteps)
   const [viewMore, setViewMore] = useState(true)
   const uid = useAppSelector(state => state.auth.uid)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const addToMyListHandler = async () => {
      if (currentAnime) {
         await dispatch(addItemToMyList(currentAnime))
         dispatch(getCurrentAnimeItem(currentAnime.id))
      }
   }
   const toggleViewMode = () => {
      setViewMore(!viewMore)
   }
   const delLastLink = () => {
      dispatch(delBackLinkStep())
   }
   const getLastAnime = (item: string) => {
      dispatch(getCurrentAnimeItem(item))
   }
   const onBackButtonHandler = () => {
      chooseBackLink({
         backLinkSteps,
         navigation: navigate,
         delLastLink,
         getLastAnime,
      })
   }

   useFocusEffect(
      React.useCallback(() => {
         const onBackPress = () => {
            if (backLinkSteps) {
               onBackButtonHandler()
               return true
            } else {
               return false
            }
         }
         const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress)

         return () => subscription.remove()
      }, [backLinkSteps])
   )
   if (!currentAnime) {
      return <LoadingIndicator />
   }

   return (
      <ScrollViewOffset style={styles.container} contentOffset={{ x: 0, y: 0 }}>
         <LoadingIndicator />
         <View style={styles.headBlock}>
            <View style={styles.imgBlock}>
               <LinearGradient
                  colors={[theme.colors.grey2, 'transparent']}
                  style={styles.upperBlock}
               >
                  <TouchableOpacity onPress={onBackButtonHandler} style={styles.goBackLink}>
                     <Icon name={'arrow-back'} color={theme.colors.white} />
                  </TouchableOpacity>
               </LinearGradient>
               <Image source={{ uri: currentAnime.main_picture.large }} style={styles.coverImg} />
            </View>
            <View style={styles.headerTitleBlock}>
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
                     <Button
                        title="+ My List"
                        buttonStyle={{
                           borderRadius: 30,
                           marginLeft: 20,
                           backgroundColor: theme.colors.secondary,
                           width: 110,
                        }}
                        onPress={addToMyListHandler}
                     />
                  )
               )}
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
                  <Text style={styles.smallTitle}>
                     <Text style={styles.smallTitleGrey}>type: </Text>
                     {currentAnime.media_type}
                  </Text>
                  <Text style={styles.smallTitle}>
                     <Text style={styles.smallTitleGrey}>source: </Text>
                     {currentAnime.source.replace('_', ' ')}
                  </Text>
               </View>
            </View>
         </View>
         <View style={styles.descriptionBlock}>
            <Text style={styles.nameTitle}>{titleNameSelector(currentAnime)}</Text>
            <View>
               {currentAnime.alternative_titles?.en &&
                  currentAnime.alternative_titles?.en !== currentAnime.title && (
                     <Text style={styles.smallTitleGrey}>
                        orig:{' '}
                        <Text style={[styles.smallTitle, { fontSize: 18 }]}>
                           {currentAnime.title}
                        </Text>
                     </Text>
                  )}
               {currentAnime.alternative_titles?.ja && (
                  <Text style={styles.smallTitleGrey}>
                     jp: <Text style={styles.smallTitle}>{currentAnime.alternative_titles.ja}</Text>
                  </Text>
               )}
               {currentAnime.alternative_titles?.synonyms && (
                  <Text style={styles.smallTitleGrey}>
                     synonyms:{' '}
                     <Text style={styles.smallTitle}>
                        {currentAnime.alternative_titles.synonyms}
                     </Text>
                  </Text>
               )}
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
            <CustomFlatLIst
               name={'Related'}
               data={currentAnime.related_anime}
               isLinked={true}
               parentId={currentAnime.id}
            />
            <CustomFlatLIst
               name={'Recommendations'}
               data={currentAnime.recommendations}
               isLinked={true}
               parentId={currentAnime.id}
            />
            <StatisticBlock
               status={currentAnime.statistics.status}
               num_list_users={currentAnime.statistics.num_list_users}
            />
         </View>
      </ScrollViewOffset>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         paddingVertical: 5,
         backgroundColor: colors.colors.background,
         minHeight: '100%',
      },
      descriptionBlock: {
         padding: 5,
         gap: 3,
      },
      nameTitle: {
         color: colors.colors.primary,
         marginVertical: 10,
         fontSize: 22,
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
         minHeight: 300,
         borderRadius: 10,
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
      headBlock: {
         paddingHorizontal: 5,
         width: '100%',
         flexDirection: 'row',
         justifyContent: 'center',
      },
      imgBlock: {
         width: '50%',
      },
      headerTitleBlock: {
         paddingHorizontal: 5,
         width: '50%',
      },
   })
