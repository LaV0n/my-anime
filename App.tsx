import React from 'react'
import { Provider } from 'react-redux'
import { store } from './bll/store'
import { Navigation } from './navigation/Navigation'
import { ThemeProvider } from '@rneui/themed'
import { theme } from './common/theme'

export default function App() {
   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <Navigation />
         </ThemeProvider>
      </Provider>
   )
}
