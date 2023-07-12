import { RootStackScreenProps } from '../types'
import { Button, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { MyAnimeListAPI } from '../api/api'

export const Home = ({ navigation }: RootStackScreenProps<'Home'>) => {
   const [titles, setTitles] = useState('default')
   const getAnime = () => {
      MyAnimeListAPI.getAllAnime().then(res => setTitles(JSON.stringify(res.data)))
   }

   return (
      <View style={styles.container}>
         <Text>list of anime</Text>
         <StatusBar style="auto" />
         <Button title="go to profile" onPress={() => navigation.navigate('Profile')} />
         <View>
            <Text>{titles}</Text>
         </View>
         <Button title="get anime" onPress={getAnime} />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
})
