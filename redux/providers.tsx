"use client"

import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from '@/components/theme-provider'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
       <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >

        {children}
          </ThemeProvider>
    </Provider>
  )
}

export default Providers
