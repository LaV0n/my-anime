import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StatisticViewType } from '../common/types'
import { Colors, Icon, Theme, useTheme } from '@rneui/themed'

export const StatisticBlock = (statistics: StatisticViewType) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const [isOpen, setIsOpen] = useState(false)

   return (
      <View style={styles.container}>
         <TouchableOpacity style={styles.headerBlock} onPress={() => setIsOpen(!isOpen)}>
            <Text style={styles.secondTitle}> Statistics of viewers</Text>
            {isOpen ? (
               <Icon name={'expand-less'} color={theme.colors.primary} />
            ) : (
               <Icon name={'expand-more'} color={theme.colors.primary} />
            )}
         </TouchableOpacity>
         {isOpen && (
            <View>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>watching: </Text>
                  {statistics.status.watching}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>completed: </Text>
                  {statistics.status.completed}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>plan to watch: </Text>
                  {statistics.status.plan_to_watch}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>dropped: </Text>
                  {statistics.status.dropped}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>on hold: </Text>
                  {statistics.status.on_hold}
               </Text>
               <Text style={styles.smallTitle}>
                  <Text style={styles.smallTitleGrey}>total: </Text> {statistics.num_list_users}
               </Text>
            </View>
         )}
      </View>
   )
}

const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      container: {
         marginTop: 20,
      },
      secondTitle: {
         color: colors.colors.primary,
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
      headerBlock: {
         flexDirection: 'row',
         gap: 20,
         alignItems: 'center',
      },
   })
