import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Overlay } from '@rneui/themed'
import { useAppDispatch, useAppSelector } from '../bll/store'
import { setError } from '../bll/appReducer'

export const ErrorMessage = () => {
   const errorMessage = useAppSelector(state => state.app.error)
   const [isOpen, setIsOpen] = useState(true)
   const dispatch = useAppDispatch()

   const toggleMessage = () => {
      setIsOpen(!isOpen)
      dispatch(setError(''))
   }
   return (
      <Overlay isVisible={!!errorMessage} onBackdropPress={toggleMessage}>
         <View style={styles.container}>
            <View style={styles.headerBlock}>
               <Text style={styles.headerTitle}>{errorMessage.split(',')[0]}</Text>
               <Icon name="close" onPress={toggleMessage} color={'black'} />
            </View>
            <Text style={styles.title}>{errorMessage.split(',')[1]}</Text>
         </View>
      </Overlay>
   )
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: 'white',
      padding: 20,
      gap: 20,
   },
   title: {
      color: 'black',
      fontWeight: '400',
      fontSize: 18,
   },
   headerTitle: {
      color: 'red',
      fontWeight: '600',
      fontSize: 22,
      textAlign: 'center',
      width: '90%',
   },
   headerBlock: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
})
