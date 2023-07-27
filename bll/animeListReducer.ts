import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AnimeResponseType, AnimeType, CommonListType, CurrentAnimeType } from '../common/types'
import { MyAnimeListAPI } from '../api/api'
import { errorAsString } from '../utils/errorAsString'
import { changeStatus, setError } from './appReducer'
import { AppRootStateType } from './store'

const filteredData = async (allItems: AnimeResponseType[], uid: string, animeList: AnimeType[]) => {
   const result: AnimeType[] = []
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
   currentAnimeItem: null,
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
      builder.addCase(getCurrentAnimeItem.fulfilled, (state, action) => {
         state.currentAnimeItem = action.payload
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
         const data = await filteredData(
            res.data.data,
            getState().auth.uid,
            getState().myData.animeList
         )
         dispatch(changeStatus('success'))
         return data
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
      const data = await filteredData(
         res.data.data,
         getState().auth.uid,
         getState().myData.animeList
      )
      dispatch(changeStatus('success'))
      return data
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return []
   }
})

export const getCurrentAnimeItem = createAsyncThunk<
   CurrentAnimeType,
   string,
   { state: AppRootStateType; rejectValue: { error: string } }
>('animeList/getCurrentAnimeItem', async (idAnime, { dispatch, rejectWithValue, getState }) => {
   dispatch(changeStatus('loading'))
   try {
      const res = await MyAnimeListAPI.getCurrentAnimeItem(idAnime)
      dispatch(changeStatus('success'))
      const resData = res.data as CurrentAnimeType
      const myList = getState().myData.animeList
      for (let i = 0; i < myList.length; i++) {
         if (myList[i].id === resData.id) {
            resData.myStatus = myList[i].myStatus
            resData.myRating = myList[i].myRating
            resData.idDoc = myList[i].idDoc
         }
      }
      return resData
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return rejectWithValue({ error })
   }
})
