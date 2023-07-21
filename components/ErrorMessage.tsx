import React, { useState } from 'react'
import { Text } from 'react-native'
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
         <Text>{errorMessage}</Text>
         <Icon name="close" onPress={toggleMessage} />
      </Overlay>
   )
}
