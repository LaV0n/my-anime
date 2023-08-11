import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { Icon, useTheme } from '@rneui/themed'
import { changeItemData } from '../bll/myDataReducer'
import { useAppDispatch } from '../bll/store'
import { CustomSelectListType } from '../common/types'
import { getCurrentAnimeItem } from '../bll/animeListReducer'

export const CustomSelectList = ({
   idDoc,
   myStatus,
   isMyList,
   currentAnimeId,
}: CustomSelectListType) => {
   const [selected, setSelected] = useState('')
   const { theme } = useTheme()
   const dispatch = useAppDispatch()
   const data = [
      { key: 'watched', value: 'watched' },
      { key: 'unwatch', value: 'unwatch' },
      { key: 'dropped', value: 'dropped' },
   ]

   const onSelectedHandler = () => {
      if (myStatus !== selected) {
         dispatch(changeItemData({ id: idDoc, data: selected }))
         if (currentAnimeId) {
            dispatch(getCurrentAnimeItem(currentAnimeId))
         }
      }
   }

   return (
      <SelectList
         setSelected={(val: string) => setSelected(val)}
         data={data}
         save="value"
         search={false}
         arrowicon={<Icon name={'expand-more'} style={{ marginLeft: 10 }} />}
         dropdownTextStyles={{ color: isMyList ? theme.colors.primary : theme.colors.white }}
         inputStyles={{ color: isMyList ? theme.colors.primary : theme.colors.white }}
         boxStyles={{ borderRadius: 15, width: 120, borderWidth: isMyList ? 1 : 0 }}
         onSelect={onSelectedHandler}
         defaultOption={data.filter(d => d.value === myStatus)[0]}
      />
   )
}
