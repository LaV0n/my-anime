import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthType } from '../common/types'
import { changeStatus, setError } from './appReducer'
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { clearMyList } from './myDataReducer'
import { errorAsString } from '../utils/errorAsString'
import AsyncStorage from '@react-native-async-storage/async-storage'

const setUserData = async (user: AuthType) => {
   try {
      await AsyncStorage.setItem('user', JSON.stringify(user))
   } catch (e) {
      // saving error
   }
}

const initialState: AuthType = {
   uid: '',
   email: '',
   name: '',
}
const slice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder.addCase(login.fulfilled, (state, action) => {
         if (auth.currentUser) {
            state.email = auth.currentUser.email!
            state.uid = auth.currentUser.uid
            state.name = action.payload
            setUserData({
               name: action.payload,
               email: auth.currentUser.email!,
               uid: auth.currentUser.uid,
            })
         }
      })
      builder.addCase(logout.fulfilled, state => {
         state.email = ''
         state.uid = ''
         state.name = ''
      })
      builder.addCase(signUp.fulfilled, (state, action) => {
         if (auth.currentUser) {
            state.email = auth.currentUser.email!
            state.uid = auth.currentUser.uid
            state.name = action.payload
            setUserData({
               name: action.payload,
               email: auth.currentUser.email!,
               uid: auth.currentUser.uid,
            })
         }
      })
      builder.addCase(getUserData.fulfilled, (state, action) => {
         if (action.payload) {
            state.email = action.payload.email
            state.name = action.payload.name
            state.uid = action.payload.uid
         }
      })
   },
})

export const authReducer = slice.reducer

export const login = createAsyncThunk<string, { email: string; password: string }>(
   'auth/login',
   async ({ email, password }, { dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         await signInWithEmailAndPassword(auth, email, password)
         const userId = auth.currentUser?.uid ? auth.currentUser.uid : 'customId'
         const docRef = doc(db, 'users', userId)
         const data = await getDoc(docRef)
         dispatch(changeStatus('success'))
         if (data.exists()) {
            return data.data().name
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
         dispatch(changeStatus('success'))
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
      }
   }
)
export const signUp = createAsyncThunk<
   string,
   { email: string; password: string; userName: string }
>('auth/signUp', async ({ email, password, userName }, { dispatch }) => {
   dispatch(changeStatus('loading'))
   try {
      dispatch(changeStatus('success'))
      dispatch(clearMyList)
      await createUserWithEmailAndPassword(auth, email, password)
      const newUser = {
         name: userName,
      }
      const userId = auth.currentUser?.uid ? auth.currentUser?.uid : 'customId'
      const docRef = doc(db, 'users', userId)
      await setDoc(docRef, newUser)
      return userName
   } catch (err) {
      const error = errorAsString(err)
      dispatch(changeStatus('error'))
      dispatch(setError(error))
      return ''
   }
})
export const getUserData = createAsyncThunk<AuthType, undefined>(
   'auth/getUserData',
   async (_, { dispatch }) => {
      dispatch(changeStatus('loading'))
      try {
         dispatch(changeStatus('success'))
         const value = await AsyncStorage.getItem('user')
         if (value !== null) {
            return JSON.parse(value)
         }
      } catch (err) {
         const error = errorAsString(err)
         dispatch(changeStatus('error'))
         dispatch(setError(error))
      }
   }
)
