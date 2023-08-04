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
            <Text style={styles.title}>{errorMessage}</Text>
            <Icon name="close" onPress={toggleMessage} color={'black'} />
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
})
