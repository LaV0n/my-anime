import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthType } from '../types'
import { changeStatus, setError } from './appReducer'
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { clearMyList } from './profileReducer'

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
         const userId = auth.currentUser?.uid ? auth.currentUser?.uid : 'customId'
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
      try {
         await signOut(auth)
         dispatch(clearMyList())
         dispatch(changeStatus('success'))
      } catch (err: any) {
         dispatch(changeStatus('error'))
         dispatch(setError(err))
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
      await createUserWithEmailAndPassword(auth, email, password)
      const newUser = {
         name: userName,
      }
      const userId = auth.currentUser?.uid ? auth.currentUser?.uid : 'customId'
      const docRef = doc(db, 'users', userId)
      await setDoc(docRef, newUser)
      return userName
   } catch (err: any) {
      dispatch(changeStatus('error'))
      dispatch(setError(err))
      return ''
   }
})
