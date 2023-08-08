import React from 'react'
import { AirbnbRating } from '@rneui/themed'
import { changeItemData } from '../bll/myDataReducer'
import { useAppDispatch } from '../bll/store'
import { RatingStarsType } from '../common/types'
import { View } from 'react-native'
import { getCurrentAnimeItem } from '../bll/animeListReducer'

export const RatingStars = ({ myRating, id, selectedColor, currentAnimeId }: RatingStarsType) => {
   const dispatch = useAppDispatch()

   const setRatingHandler = (number: number) => {
      dispatch(changeItemData({ id, data: number }))
      if (currentAnimeId) {
         dispatch(getCurrentAnimeItem(currentAnimeId))
      }
   }

   return (
      <View>
         <AirbnbRating
            size={15}
            showRating={false}
            onFinishRating={(number: number) => setRatingHandler(number)}
            defaultRating={myRating}
            selectedColor={selectedColor}
         />
      </View>
   )
}
