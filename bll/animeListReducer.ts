import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeResponseType, AnimeType } from '../types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'

const initialState: AnimeType[] = []

const slice = createSlice({
   name: 'animeList',
   initialState,
   reducers: {
      clearList(state) {
         state = []
      },
   },
   extraReducers: builder => {
      builder.addCase(getAnimeList.fulfilled, (state, action) => {
         state.push(...action.payload)
      })
   },
})

export const animeListReducer = slice.reducer
export const { clearList } = slice.actions

export const getAnimeList = createAsyncThunk<AnimeType[], undefined, { state: AppRootStateType }>(
   'animeList/getAnimeList',
   async (_, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      dispatch(clearList)
      try {
         const res = await MyAnimeListAPI.getAllAnime()
         const result: AnimeType[] = []
         const allItems: AnimeResponseType[] = res.data.data
         for (let i = 0; i < allItems.length; i++) {
            const responseItem = await MyAnimeListAPI.getTitleShortInfo(allItems[i].node.id)
            if (getState().auth.uid) {
               const index = getState().profile.animeList.findIndex(
                  a => a.id === allItems[i].node.id
               )
               if (index !== -1) {
                  result.push(getState().profile.animeList[index])
               } else {
                  result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
               }
            } else {
               result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
            }
         }
         dispatch(changeStatus('success'))
         return result
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
         return []
      }
   }
)
