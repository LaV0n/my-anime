import React, { useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AnimeType, RootTabScreenProps } from '../common/types'
import { AirbnbRating, Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { useAppDispatch } from '../bll/store'
import { changeItemData, delItemFromMyList } from '../bll/myDataReducer'
import { SelectList } from 'react-native-dropdown-select-list/index'
import { getCurrentAnimeItem } from '../bll/animeListReducer'

export const MyAnimeItem = ({
   anime,
   navigator,
}: {
   anime: AnimeType
   navigator: RootTabScreenProps<'MyList'>
}) => {
   const dispatch = useAppDispatch()
   const [selected, setSelected] = useState('')
   const data = [
      { key: 'watched', value: 'watched' },
      { key: 'unwatch', value: 'unwatch' },
      { key: 'dropped', value: 'dropped' },
   ]
   const [rating, setRating] = useState(anime.myRating)
   const { theme } = useTheme()
   const styles = makeStyles(theme)

   const onSelectedHandler = () => {
      dispatch(changeItemData({ id: anime.idDoc, data: selected }))
   }

   const delItemHandler = (id: string) => {
      dispatch(delItemFromMyList(id))
   }
   const setRatingHandler = (number: number) => {
      setRating(rating)
      dispatch(changeItemData({ id: anime.idDoc, data: number }))
   }
   const getCurrentAnimeItemHandler = () => {
      dispatch(getCurrentAnimeItem(anime.id))
      navigator.navigation.navigate('AnimeItem')
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.pictureBlock} onPress={getCurrentAnimeItemHandler}>
            <Image source={{ uri: anime.main_picture.medium }} style={styles.picture} />
            <Text style={styles.rating}>{anime.mean}</Text>
         </TouchableOpacity>
         <View style={styles.description}>
            <View style={styles.titleBlock}>
               <Text style={styles.titleName}> {anime.title}</Text>
               <AirbnbRating
                  size={15}
                  showRating={false}
                  onFinishRating={(number: number) => setRatingHandler(number)}
                  defaultRating={rating}
               />
            </View>
            <Text style={styles.episodes}> episodes: {anime.num_episodes}</Text>
            <View style={styles.actionBlock}>
               <SelectList
                  setSelected={(val: string) => setSelected(val)}
                  data={data}
                  save="value"
                  arrowicon={<Icon name="arrow-downward" />}
                  search={false}
                  dropdownTextStyles={{ color: theme.colors.white }}
                  inputStyles={{ color: theme.colors.white }}
                  boxStyles={styles.selectBlock}
                  onSelect={onSelectedHandler}
                  defaultOption={data.filter(d => d.value === anime.myStatus)[0]}
               />
               <Icon
                  name={'delete'}
                  color={theme.colors.secondary}
                  type="antdesign"
                  size={20}
                  onPress={() => delItemHandler(anime.idDoc)}
               />
            </View>
         </View>
      </View>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         marginTop: 10,
         marginHorizontal: 10,
         flexDirection: 'row',
         backgroundColor: colors.colors.background,
         justifyContent: 'space-between',
      },
      pictureBlock: {
         width: '40%',
      },
      picture: {
         aspectRatio: 1,
         borderRadius: 10,
      },
      rating: {
         position: 'absolute',
         margin: 10,
         padding: 5,
         borderRadius: 5,
         backgroundColor: colors.colors.secondary,
         color: colors.colors.white,
      },
      description: {
         justifyContent: 'space-between',
         gap: 10,
         width: '60%',
         padding: 7,
      },
      actionBlock: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
      },
      selectBlock: {
         borderRadius: 15,
         width: 120,
         color: colors.colors.white,
      },
      titleBlock: {
         justifyContent: 'space-between',
         flexDirection: 'row',
         flexWrap: 'wrap',
      },
      titleName: {
         color: colors.colors.white,
         fontSize: 15,
      },
      episodes: {
         color: colors.colors.white,
      },
   })
