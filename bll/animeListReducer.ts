import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeResponseType, AnimeType } from '../types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'

const initialState: AnimeType[] = []

const slice = createSlice({
   name: 'animeList',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(getAnimeList.fulfilled, (state, action) => {
         action.payload.forEach(a => {
            const anime = {
               id: a.node.id,
               title: a.node.title,
               picture: a.node.main_picture.large,
            }
            state.push(anime)
         })
      })
   },
})
1
export const animeListReducer = slice.reducer

export const getAnimeList = createAsyncThunk<AnimeResponseType[], undefined>(
   'animeList/getAnimeList',
   async (_, { dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         const res = await MyAnimeListAPI.getAllAnime()
         dispatch(changeStatus('success'))
         return res.data.data
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
      }
   }
)
