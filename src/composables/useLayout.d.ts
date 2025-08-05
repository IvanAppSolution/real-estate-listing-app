import { ComputedRef, Ref } from 'vue'

export interface ColorPalette {
  50: string
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
  950: string
}

export interface Color {
  name: string
  palette: ColorPalette
}

export interface UseLayoutReturn {
  primaryColors: Ref<Color[]>
  surfaces: Ref<Color[]>
  isDarkMode: ComputedRef<boolean>
  primary: ComputedRef<string>
  surface: ComputedRef<string | null>
  toggleDarkMode: () => void
  setDarkMode: (value: boolean) => void
  setPrimary: (value: string) => void
  setSurface: (value: string) => void
  updateColors: (type: 'primary' | 'surface', colorName: string) => void
}

export declare function useLayout(): UseLayoutReturn
