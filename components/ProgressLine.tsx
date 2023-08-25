import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Colors, Slider, Theme, useTheme } from '@rneui/themed'
import { ProgressLineType } from '../common/types'
import { useAppDispatch } from '../bll/store'
import { changeItemData } from '../bll/myDataReducer'

export const ProgressLine = ({ startValue, maxValue, idDoc }: ProgressLineType) => {
   const { theme } = useTheme()
   const styles = makeStyles(theme)
   const [value, setValue] = useState(startValue)
   const [isDisabled, setIsDisabled] = useState(true)
   const dispatch = useAppDispatch()

   const setValueHandler = () => {
      dispatch(changeItemData({ id: idDoc, data: value, requestType: 'myProgress' }))
      setIsDisabled(true)
   }
   useEffect(() => {
      setValue(startValue)
   }, [idDoc, startValue])

   return (
      <TouchableOpacity style={styles.contentView} onPress={() => setIsDisabled(false)}>
         <Slider
            value={value}
            onValueChange={setValue}
            maximumValue={maxValue}
            minimumValue={0}
            step={1}
            onSlidingComplete={setValueHandler}
            disabled={isDisabled}
            maximumTrackTintColor={theme.colors.grey0}
            minimumTrackTintColor={theme.colors.secondary}
            thumbStyle={isDisabled ? styles.disabledThumb : styles.thumb}
            thumbProps={{
               children: (
                  <Text
                     style={
                        isDisabled
                           ? { color: theme.colors.secondary }
                           : { color: theme.colors.white }
                     }
                  >
                     {value}
                  </Text>
               ),
            }}
         />
      </TouchableOpacity>
   )
}
const makeStyles = (colors: { colors: Colors } & Theme) =>
   StyleSheet.create({
      contentView: {
         paddingHorizontal: 5,
         width: 120,
         justifyContent: 'center',
         alignItems: 'stretch',
      },
      thumb: {
         color: colors.colors.white,
         justifyContent: 'center',
         alignItems: 'center',
         width: 30,
         height: 30,
         borderRadius: 15,
         backgroundColor: colors.colors.secondary,
      },
      disabledThumb: {
         color: colors.colors.white,
         width: 35,
         height: 20,
         alignItems: 'center',
         bottom: 10,
         textAlign: 'center',
         backgroundColor: colors.colors.background,
      },
   })
