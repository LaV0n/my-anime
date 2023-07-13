import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const slice = createSlice({
   name: 'auth',
   initialState,
   reducers: {},
})

export const authReducer = slice.reducer
