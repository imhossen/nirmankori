"use client";
import {createContext,useContext,useEffect,useState} from "react";
export type ThemeMode="light"|"dark"|"system";
const ThemeContext=createContext<{theme:ThemeMode;setTheme:(t:ThemeMode)=>void}>({theme:"system",setTheme:()=>{}});
export function ThemeProvider({children}:{children:React.ReactNode}){const [theme,setThemeState]=useState<ThemeMode>("system");useEffect(()=>{const saved=(localStorage.getItem("nirman-theme") as ThemeMode)||"system";setThemeState(saved)},[]);useEffect(()=>{const root=document.documentElement;root.dataset.theme=theme;root.classList.toggle("dark",theme==="dark"||(theme==="system"&&matchMedia("(prefers-color-scheme: dark)").matches));localStorage.setItem("nirman-theme",theme)},[theme]);return <ThemeContext.Provider value={{theme,setTheme:(t)=>setThemeState(t)}}>{children}</ThemeContext.Provider>}
export const useTheme=()=>useContext(ThemeContext);
