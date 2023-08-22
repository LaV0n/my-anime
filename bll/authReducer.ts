import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthType, UserDataType } from '../common/types'
import { changeStatus, setError } from './appReducer'
import {
   signInWithEmailAndPassword,
   signOut,
   createUserWithEmailAndPassword,
   sendPasswordResetEmail,
} from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { clearMyList } from './myDataReducer'
import { errorAsString } from '../utils/errorAsString'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setColorMode, setUserName, setUserStorageData } from './profileReducer'

const initialState: AuthType = {
   uid: '',
   email: '',
}
const slice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(login.fulfilled, state => {
         if (auth.currentUser) {
            state.email = auth.currentUser.email!
            state.uid = auth.currentUser.uid
         }
      })
      builder.addCase(logout.fulfilled, state => {
         state.email = ''
         state.uid = ''
      })
      builder.addCase(signUp.fulfilled, state => {
         if (auth.currentUser) {
            state.email = auth.currentUser.email!
            state.uid = auth.currentUser.uid
         }
      })
      builder.addCase(getUserData.fulfilled, (state, action) => {
         if (action.payload) {
            state.email = action.payload.email
            state.uid = action.payload.uid
         }
      })
   },
})

export const authReducer = slice.reducer

export const login = createAsyncThunk<unknown, { email: string; password: string }>(
   'auth/login',
   async ({ email, password }, { dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         await signInWithEmailAndPassword(auth, email, password)
         const userId = auth.currentUser?.uid ? auth.currentUser.uid : 'customId'
         const docRef = doc(db, 'users', userId)
         const data = await getDoc(docRef)
         dispatch(changeStatus('success'))
         if (data.exists() && auth.currentUser) {
            dispatch(setUserName(data.data().name))
            await setUserStorageData({
               name: data.data().name,
               email: auth.currentUser.email!,
               uid: auth.currentUser.uid,
               colorMode: 'dark',
            })
         }
      } catch (err) {
         dispatch(changeStatus('error'))
         const { code } = JSON.parse(JSON.stringify(err))
         if (code === 'auth/user-not-found') {
            dispatch(setError('No user found for that email'))
         }
         if (code === 'auth/wrong-password') {
            dispatch(setError('Wrong password provided for that user.'))
         }
      }
   }
)
export const logout = createAsyncThunk<unknown, undefined>(
   'auth/logout',
   async (_, { dispatch }) => {
      dispatch(changeStatus('loading'))
      dispatch(clearMyList)
      try {
         await signOut(auth)
         await AsyncStorage.removeItem('user')
         dispatch(clearMyList)
         dispatch(setUserName(''))
         dispatch(changeStatus('success'))
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
      }
   }
)
export const signUp = createAsyncThunk<
   unknown,
   { email: string; password: string; userName: string }
>('auth/signUp', async ({ email, password, userName }, { dispatch }) => {
   dispatch(changeStatus('loading'))
   try {
      dispatch(changeStatus('success'))
      dispatch(clearMyList)
      await createUserWithEmailAndPassword(auth, email, password)
      const userId = auth.currentUser?.uid ? auth.currentUser?.uid : 'customId'
      const docRef = doc(db, 'users', userId)
      await setDoc(docRef, { name: userName })
      dispatch(setUserName(userName))
      if (auth.currentUser) {
         await setUserStorageData({
            name: userName,
            email: auth.currentUser.email!,
            uid: auth.currentUser.uid,
            colorMode: 'dark',
         })
      }
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
   }
})
export const getUserData = createAsyncThunk<
   AuthType,
   undefined,
   { rejectValue: { error: string } }
>('auth/getUserData', async (_, { dispatch, rejectWithValue }) => {
   dispatch(changeStatus('loading'))
   try {
      dispatch(changeStatus('success'))
      const value = await AsyncStorage.getItem('user')
      const userData = JSON.parse(value!) as UserDataType
      dispatch(setUserName(userData.name))
      dispatch(setColorMode(userData.colorMode))
      return { uid: userData.uid, email: userData.email }
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return rejectWithValue({ error })
   }
})
export const resetPassword = createAsyncThunk<unknown, string>(
   'auth/resetPassword',
   async (email, { dispatch }) => {
      try {
         await sendPasswordResetEmail(auth, email)
      } catch (err) {
         const error = errorAsString(err)
         dispatch(setError(error))
      }
   }
)
