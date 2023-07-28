import { createTheme } from '@rneui/themed'

export const theme = createTheme({
   mode: 'dark',
   lightColors: {
      primary: 'black',
      background: 'white',
      grey0: 'grey',
      grey1: '#1f222a',
      secondary: '#06bf48',
      white: 'black',
      grey2: 'rgba(0,0,0,0.6)',
   },
   darkColors: {
      primary: 'white',
      background: 'black',
      grey0: 'grey',
      grey1: '#1f222a',
      secondary: '#06bf48',
      white: 'white',
      grey2: 'rgba(0,0,0,0.6)',
   },
})
