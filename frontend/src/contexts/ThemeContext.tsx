"use client" 


import { createContext , useContext ,ReactNode, useState } from "react"

type Theme = 'light' | 'dark'

interface ThemeCtx {
    theme: Theme,
    toggleTheme : () => void
}

const ThemeContext = createContext<ThemeCtx>({
    theme : 'light',
    toggleTheme : () => {}
})


export function ThemeProvider ({children} : {children:ReactNode}) {
    const [theme,setTheme] = useState<Theme>('light');
    const toggleTheme = () => setTheme(t => (t=== 'light' ? 'dark' : 'light'))

    return (
        <ThemeContext.Provider value={{theme , toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)