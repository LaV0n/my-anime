import React from 'react'
import { Provider } from 'react-redux'
import { store } from './bll/store'
import { Navigation } from './navigation/Navigation'

export default function App() {
   return (
      <Provider store={store}>
         <Navigation />
      </Provider>
   )
}
