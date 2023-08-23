import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootTabScreenProps } from '../common/types'
import { Button, Colors, Icon, Theme, useTheme } from '@rneui/themed'
import { FilterButton } from '../components/FilterButton'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { getSearchAnimeList, setFilterData } from '../bll/animeListReducer'
import { filterMyList, getMyAnimeList, setFilterMyListData } from '../bll/myDataReducer'
import { YearSelect } from '../components/YearSelect'

export const Filter = ({ navigation }: RootTabScreenProps<'Filter'>) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const isMyListFilterData = useAppSelector(state => state.app.isMyListFilter)
   const filterSearchData = useAppSelector(state => state.animeList.filterData)
   const filterMyListData = useAppSelector(state => state.myData.filterData)

   const filterData = isMyListFilterData ? filterMyListData : filterSearchData

   const [sortByRating, setSortByRating] = useState(filterData.sortByRating)
   const [category, setCategory] = useState(filterData.category)
   const [genre, setGenre] = useState<string[]>(filterData.genre)
   const [releaseFilter, setReleaseFilter] = useState(filterData.releaseFilter)
   const [myStatus, setMyStatus] = useState(filterData.myStatus)
   const [myStars, setMyStars] = useState<string>(
      filterData.myStars ? filterData.myStars.toString() : '0'
   )
   const dispatch = useAppDispatch()

   const addGenre = (item: string) => {
      let result = genre
      if (item === 'all') {
         return setGenre(['all'])
      } else {
         result = genre.filter(g => g !== 'all')
         if (genre.includes(item)) {
            result = result.filter(g => g !== item)
         } else {
            result = [...result, item]
         }
      }
      if (result.length === 0) {
         result = ['all']
      }
      setGenre(result)
   }
   const applyFilterHandler = async () => {
      const data = {
         sortByRating,
         category,
         genre,
         releaseFilter,
         myStars,
         myStatus,
      }
      if (isMyListFilterData) {
         dispatch(setFilterMyListData(data))
         navigation.navigate('MyList')
         await dispatch(getMyAnimeList())
         dispatch(filterMyList())
      } else {
         dispatch(setFilterData(data))
         dispatch(getSearchAnimeList())
         navigation.navigate('Search')
      }
   }
   const resetFilterHAndler = () => {
      const data = {
         sortByRating: 'all',
         category: 'all',
         genre: ['all'],
         releaseFilter: 'all',
         myStatus: 'all',
         myStars: '0',
      }
      if (isMyListFilterData) {
         dispatch(setFilterMyListData(data))
      } else {
         dispatch(setFilterData(data))
      }
      setSortByRating('rating')
      setCategory('all')
      setGenre(['all'])
      setReleaseFilter('all')
      setMyStars('0')
      setMyStatus('all')
   }
   const goBackHandler = () => {
      if (isMyListFilterData) {
         navigation.navigate('MyList')
      } else {
         navigation.navigate('Search')
      }
   }

   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.header}>
               <TouchableOpacity onPress={goBackHandler}>
                  <Icon name={'arrow-back'} color={theme.colors.white} />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>Sort & Filter</Text>
            </View>
            <View style={styles.sortBlock}>
               <Text style={styles.titleName}>Sort</Text>
               <View style={styles.sortButtonBlock}>
                  <FilterButton
                     name={'Rating'}
                     filterData={sortByRating}
                     callback={setSortByRating}
                  />
                  <FilterButton
                     name={'Newest'}
                     filterData={sortByRating}
                     callback={setSortByRating}
                  />
               </View>
               {!isMyListFilterData && (
                  <>
                     <Text style={styles.titleName}>Category</Text>
                     <View style={styles.sortButtonBlock}>
                        <FilterButton name={'All'} filterData={category} callback={setCategory} />
                        <FilterButton
                           name={'Airing'}
                           filterData={category}
                           callback={setCategory}
                        />
                        <FilterButton
                           name={'Upcoming'}
                           filterData={category}
                           callback={setCategory}
                        />
                        <FilterButton name={'TV'} filterData={category} callback={setCategory} />
                        <FilterButton name={'Ova'} filterData={category} callback={setCategory} />
                        <FilterButton name={'Movie'} filterData={category} callback={setCategory} />
                        <FilterButton
                           name={'Special'}
                           filterData={category}
                           callback={setCategory}
                        />
                        <FilterButton
                           name={'By Popularity'}
                           filterData={category}
                           callback={setCategory}
                        />
                        <FilterButton
                           name={'Favorite'}
                           filterData={category}
                           callback={setCategory}
                        />
                     </View>
                  </>
               )}
               <Text style={styles.titleName}>Genre</Text>
               <View style={styles.sortButtonBlock}>
                  <FilterButton name={'All'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Action'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Adventure'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Avant Garde'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Award Winning'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Comedy'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Drama'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Fantasy'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Girls Love'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Horror'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Mystery'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Romance'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Sci-Fi'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Sports'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Supernatural'} filterData={genre} callback={addGenre} />
                  <FilterButton name={'Suspense'} filterData={genre} callback={addGenre} />
               </View>
               <Text style={styles.titleName}>Release Year</Text>
               <View style={styles.sortButtonBlock}>
                  <YearSelect year={releaseFilter} callback={setReleaseFilter} />
               </View>
               {isMyListFilterData && (
                  <>
                     <Text style={styles.titleName}>My Status</Text>
                     <View style={styles.sortButtonBlock}>
                        <FilterButton name={'All'} filterData={myStatus!} callback={setMyStatus} />
                        <FilterButton
                           name={'completed'}
                           filterData={myStatus!}
                           callback={setMyStatus}
                        />
                        <FilterButton
                           name={'unwatched'}
                           filterData={myStatus!}
                           callback={setMyStatus}
                        />
                        <FilterButton
                           name={'dropped'}
                           filterData={myStatus!}
                           callback={setMyStatus}
                        />
                        <FilterButton
                           name={'watching'}
                           filterData={myStatus!}
                           callback={setMyStatus}
                        />
                     </View>
                     <Text style={styles.titleName}>My Rating</Text>
                     <View style={styles.sortButtonBlock}>
                        <FilterButton name={'0'} filterData={myStars!} callback={setMyStars} />
                        <FilterButton name={'1'} filterData={myStars!} callback={setMyStars} />
                        <FilterButton name={'2'} filterData={myStars!} callback={setMyStars} />
                        <FilterButton name={'3'} filterData={myStars!} callback={setMyStars} />
                        <FilterButton name={'4'} filterData={myStars!} callback={setMyStars} />
                        <FilterButton name={'5'} filterData={myStars!} callback={setMyStars} />
                     </View>
                  </>
               )}
            </View>
         </ScrollView>
         <View style={styles.buttonBlock}>
            <Button
               title="Reset"
               buttonStyle={{
                  borderRadius: 30,
                  height: 50,
                  width: 140,
                  backgroundColor: theme.colors.grey0,
               }}
               titleStyle={{ color: theme.colors.white }}
               onPress={resetFilterHAndler}
            />
            <Button
               title="Apply"
               buttonStyle={{
                  borderRadius: 30,
                  height: 50,
                  backgroundColor: theme.colors.secondary,
                  width: 140,
               }}
               titleStyle={{ color: theme.colors.white }}
               onPress={applyFilterHandler}
            />
         </View>
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         height: '100%',
         backgroundColor: colors.colors.background,
      },
      header: {
         paddingTop: 40,
         flexDirection: 'row',
         alignItems: 'center',
         marginHorizontal: 10,
         gap: 10,
      },
      headerTitle: {
         color: colors.colors.white,
         fontSize: 20,
         fontWeight: '600',
      },
      sortBlock: {
         marginTop: 10,
         gap: 10,
         paddingHorizontal: 5,
      },
      buttonBlock: {
         borderStyle: 'solid',
         marginVertical: 10,
         borderWidth: 1,
         borderColor: colors.colors.grey0,
         flexDirection: 'row',
         justifyContent: 'space-around',
         alignItems: 'center',
         height: 100,
         borderRadius: 20,
      },
      titleName: {
         color: colors.colors.white,
         fontSize: 18,
         fontWeight: '600',
      },
      sortButtonBlock: {
         flexDirection: 'row',
         flexWrap: 'wrap',
         justifyContent: 'flex-start',
         gap: 10,
         alignItems: 'center',
      },
      filterItem: {
         borderRadius: 30,
         backgroundColor: colors.colors.background,
         borderColor: colors.colors.secondary,
         borderWidth: 2,
      },
      filterName: {
         color: colors.colors.secondary,
         paddingHorizontal: 15,
         paddingVertical: 5,
         fontSize: 16,
      },
      filterItemActive: {
         borderRadius: 30,
         backgroundColor: colors.colors.secondary,
         borderColor: colors.colors.secondary,
         borderWidth: 2,
      },
      filterNameActive: {
         color: colors.colors.white,
         paddingHorizontal: 15,
         paddingVertical: 5,
         fontSize: 16,
      },
   })
