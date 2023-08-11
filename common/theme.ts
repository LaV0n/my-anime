import { createTheme } from '@rneui/themed'

export const theme = createTheme({
   mode: 'dark',
   lightColors: {
      primary: 'black',
      background: 'white',
      grey0: 'grey',
      grey1: '#c9c9c9',
      secondary: '#06bf48',
      white: 'white',
      black: 'black',
      grey2: 'rgba(0,0,0,0.6)',
      grey3: 'rgba(0,0,0,0.4)',
   },
   darkColors: {
      primary: 'white',
      background: 'black',
      grey0: 'grey',
      grey1: '#1f222a',
      secondary: '#06bf48',
      white: 'white',
      black: 'black',
      grey2: 'rgba(0,0,0,0.6)',
      grey3: 'rgba(0,0,0,0.4)',
   },
})
