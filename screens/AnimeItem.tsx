import React, { useState } from 'react'
import {
   ActivityIndicator,
   FlatList,
   Image,
   ScrollView,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { AirbnbRating, Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { RootTabScreenProps } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'
import { addItemToMyList } from '../bll/myDataReducer'

export const AnimeItem = ({ navigation }: RootTabScreenProps<'AnimeItem'>) => {
   const currentAnime = useAppSelector(state => state.animeList.currentAnimeItem)
   const statusApp = useAppSelector(state => state.app.appStatus)
   const [viewMore, setViewMore] = useState(false)
   const dispatch = useAppDispatch()
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const openItem = (id: string) => {
      dispatch(getCurrentAnimeItem(id))
   }
   const addToMyListHandler = () => {
      if (currentAnime) {
         dispatch(addItemToMyList(currentAnime))
         dispatch(getCurrentAnimeItem(currentAnime.id))
      }
   }

   if (statusApp === 'loading' || !currentAnime) {
      return <ActivityIndicator size="large" />
   }

   return (
      <ScrollView style={styles.container}>
         <View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackLink}>
               <Icon name={'arrow-back'} color={theme.colors.white} />
            </TouchableOpacity>
            <Image source={{ uri: currentAnime.main_picture.large }} style={styles.coverImg} />
            {currentAnime.idDoc ? (
               <View style={styles.myRatingBlock}>
                  <AirbnbRating
                     isDisabled={true}
                     size={15}
                     selectedColor={theme.colors.secondary}
                     showRating={false}
                     defaultRating={currentAnime.myRating}
                  />
                  <Text style={{ color: theme.colors.secondary }}>{currentAnime.myStatus}</Text>
               </View>
            ) : (
               <TouchableOpacity style={styles.myRatingBlock} onPress={addToMyListHandler}>
                  <Icon name={'add'} color={theme.colors.secondary} />
               </TouchableOpacity>
            )}
         </View>
         <Text style={styles.nameTitle}>{currentAnime.title}</Text>
         <View>
            {currentAnime.alternative_titles.synonyms.length !== 0 && (
               <Text style={{ color: theme.colors.grey0 }}>
                  synonyms: {currentAnime.alternative_titles.synonyms}
               </Text>
            )}
            <Text style={{ color: theme.colors.grey0 }}>
               eng: {currentAnime.alternative_titles.en}
            </Text>
            <Text style={{ color: theme.colors.grey0 }}>
               {' '}
               jp: {currentAnime.alternative_titles.ja}
            </Text>
         </View>
         <View style={styles.shortStatBlock}>
            <Icon name={'star'} color={theme.colors.secondary} size={20} />
            <Text style={styles.meanTitle}>{currentAnime.mean}</Text>
            <Text style={{ color: theme.colors.white }}>Ranked #{currentAnime.rank}</Text>
            <Text style={{ color: theme.colors.white }}>Popularity #{currentAnime.popularity}</Text>
            <Text style={styles.ratingTitle}>
               {currentAnime.rating.replace('_', ' ').toUpperCase()}
            </Text>
         </View>
         <View style={styles.shortStatBlock}>
            <Text style={{ color: theme.colors.white }}>{currentAnime.start_date.slice(0, 4)}</Text>
            {currentAnime.studios.map(s => (
               <Text style={{ color: theme.colors.white }} key={s.id}>
                  {s.name}
               </Text>
            ))}
            <Text style={{ color: theme.colors.white }}>{currentAnime.status}</Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               episodes: {currentAnime.num_episodes}
            </Text>
         </View>
         <View style={styles.shortStatBlock}>
            <Text style={{ color: theme.colors.white }}>type: {currentAnime.media_type}</Text>
            <Text style={{ color: theme.colors.white }}>source: {currentAnime.source}</Text>
         </View>
         <View style={styles.shortStatBlock}>
            {currentAnime.genres.map(g => (
               <Text style={{ color: theme.colors.secondary }} key={g.id}>
                  {g.name}
               </Text>
            ))}
         </View>
         <View>
            <Text numberOfLines={viewMore ? 3 : undefined} style={{ color: theme.colors.white }}>
               {currentAnime.synopsis}
            </Text>
            <Text style={{ color: theme.colors.secondary }} onPress={() => setViewMore(!viewMore)}>
               {viewMore ? 'read more...' : 'read less...'}
            </Text>
         </View>
         <FlatList
            data={currentAnime.pictures}
            style={{ marginTop: 10 }}
            horizontal
            renderItem={({ item }) => (
               <Image source={{ uri: item.medium }} style={styles.picture} key={item.medium} />
            )}
         />
         <View>
            <Text style={{ color: theme.colors.white }}> related:</Text>
            <FlatList
               data={currentAnime.related_anime}
               horizontal
               renderItem={({ item }) => (
                  <TouchableOpacity
                     key={item.node.id}
                     style={styles.relatedBlock}
                     onPress={() => openItem(item.node.id)}
                  >
                     <Image
                        source={{ uri: item.node.main_picture.medium }}
                        style={styles.picture}
                     />
                     <Text style={styles.relatedTitle}>{item.node.title}</Text>
                  </TouchableOpacity>
               )}
            />
         </View>
         <View>
            <Text style={{ color: theme.colors.white }}> recommendations:</Text>
            <FlatList
               data={currentAnime.recommendations}
               horizontal
               renderItem={({ item }) => (
                  <TouchableOpacity
                     key={item.node.id}
                     style={styles.relatedBlock}
                     onPress={() => openItem(item.node.id)}
                  >
                     <Image
                        source={{ uri: item.node.main_picture.medium }}
                        style={styles.picture}
                     />
                     <Text style={styles.relatedTitle}>{item.node.title}</Text>
                  </TouchableOpacity>
               )}
            />
         </View>
         <View>
            <Text style={{ color: theme.colors.white }}> statistics:</Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               watching: {currentAnime.statistics.status.watching}
            </Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               completed: {currentAnime.statistics.status.completed}
            </Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               plan to watch: {currentAnime.statistics.status.plan_to_watch}
            </Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               dropped: {currentAnime.statistics.status.dropped}
            </Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               on hold: {currentAnime.statistics.status.on_hold}
            </Text>
            <Text style={{ color: theme.colors.white }}>
               {' '}
               users: {currentAnime.statistics.num_list_users}
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
      picture: {
         width: 200,
         aspectRatio: 2 / 3,
         marginLeft: 5,
      },
      relatedBlock: {
         width: 200,
         marginLeft: 10,
      },
      relatedTitle: {
         position: 'absolute',
         bottom: 5,
         color: colors.colors.white,
         paddingHorizontal: 5,
         flexShrink: 1,
         flexWrap: 'wrap',
         width: '100%',
         fontSize: 16,
         marginLeft: 5,
         backgroundColor: 'rgba(0,0,0,0.7)',
      },
      myRatingBlock: {
         alignItems: 'center',
         opacity: 0.9,
         gap: 5,
         zIndex: 15,
         position: 'absolute',
         right: 10,
         top: 10,
         padding: 10,
         borderRadius: 25,
         backgroundColor: colors.colors.white,
      },
   })
