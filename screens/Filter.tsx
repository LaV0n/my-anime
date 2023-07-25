import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { RootTabScreenProps } from '../common/types'
import { Button, Colors, Icon, Theme, useTheme } from '@rneui/themed'

export const Filter = ({ navigation }: RootTabScreenProps<'Filter'>) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   return (
      <View style={styles.container}>
         <ScrollView>
            <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                  <Icon name={'arrow-back'} color={theme.colors.white} />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>Sort & Filter</Text>
            </View>
            <View style={styles.sortBlock}>
               <Text style={styles.titleName}>Sort</Text>
               <View style={styles.sortButtonBlock}>
                  <TouchableOpacity style={styles.filterItemActive}>
                     <Text style={styles.filterNameActive}>Rating</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Newest</Text>
                  </TouchableOpacity>
               </View>
               <Text style={styles.titleName}>Category</Text>
               <View style={styles.sortButtonBlock}>
                  <TouchableOpacity style={styles.filterItemActive}>
                     <Text style={styles.filterNameActive}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Airing</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Upcoming</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>TV</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Ova</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Movie</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Special</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>By Popularity</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Favorite</Text>
                  </TouchableOpacity>
               </View>
               <Text style={styles.titleName}>Genre</Text>
               <View style={styles.sortButtonBlock}>
                  <TouchableOpacity style={styles.filterItemActive}>
                     <Text style={styles.filterNameActive}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Action</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Adventure</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Avant Garde</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Award Winning</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Comedy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Drama</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Fantasy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Girls Love</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Horror</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Mystery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Romance</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Sci-Fi</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Sports</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Supernatural</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>Suspense</Text>
                  </TouchableOpacity>
               </View>
               <Text style={styles.titleName}>Release Year</Text>
               <View style={styles.sortButtonBlock}>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>2023</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>2022</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>2021</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.filterItem}>
                     <Text style={styles.filterName}>2020</Text>
                  </TouchableOpacity>
               </View>
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
