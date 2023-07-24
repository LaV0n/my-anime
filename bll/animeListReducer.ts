import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeResponseType, AnimeType, CommonListType } from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'

const filteredData = async (res: any, uid: string, animeList: AnimeType[]) => {
   const result: AnimeType[] = []
   const allItems: AnimeResponseType[] = res.data.data
   for (let i = 0; i < allItems.length; i++) {
      const responseItem = await MyAnimeListAPI.getTitleShortInfo(allItems[i].node.id)
      if (uid) {
         const index = animeList.findIndex(a => a.id === allItems[i].node.id)
         if (index !== -1) {
            result.push(animeList[index])
         } else {
            result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
         }
      } else {
         result.push({ ...responseItem.data, myStatus: 'unwatch', myRating: 0, idDoc: '' })
      }
   }
   return result
}

const initialState: CommonListType = {
   homeAnimeList: [],
}

const slice = createSlice({
   name: 'animeList',
   initialState,
   reducers: {
      clearList(state) {
         state.homeAnimeList = []
      },
   },
   extraReducers: builder => {
      builder.addCase(getAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = action.payload
      })
      builder.addCase(getSearchAnimeList.fulfilled, (state, action) => {
         state.homeAnimeList = action.payload
      })
   },
})

export const animeListReducer = slice.reducer
export const { clearList } = slice.actions

export const getAnimeList = createAsyncThunk<AnimeType[], undefined, { state: AppRootStateType }>(
   'animeList/getAnimeList',
   async (_, { dispatch, getState }) => {
      dispatch(changeStatus('loading'))
      try {
         const res = await MyAnimeListAPI.getAllAnime()
         dispatch(changeStatus('success'))
         return await filteredData(res, getState().auth.uid, getState().myData.animeList)
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
         return []
      }
   }
)
export const getSearchAnimeList = createAsyncThunk<
   AnimeType[],
   string,
   { state: AppRootStateType }
>('animeList/getSearchAnimeList', async (searchAnime, { dispatch, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getSearchAnime(searchAnime)
      dispatch(changeStatus('success'))
      return await filteredData(res, getState().auth.uid, getState().myData.animeList)
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return []
   }
})
