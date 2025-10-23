import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducersName } from './constants'
import { RootState } from '@/store'

export interface BrandState {
  id?: string
  name?: string
  domain?: string
  description?: string
  longDescription?: string
  logos?: {
    theme?: string
    formats?: {
      src: string
      format: string
      width: number
      height: number
    }[]
    type: string
  }[]
  colors?: {
    hex: string
    type: string
    brightness?: number
  }[]
  fonts?: {
    name: string
    type: string
    origin?: string
  }[]
  images?: {
    formats?: {
      src: string
      format: string
      width: number
      height: number
    }[]
    type: string
  }[]
  links?: {
    name: string
    url: string
  }[]
  company?: {
    employees?: number
    foundedYear?: number
    location?: {
      city?: string
      country?: string
      state?: string
    }
    industries?: {
      id: string
      name: string
      emoji?: string
      score?: number
      slug?: string
    }[]
  }
}

const initialState: BrandState = {}

export const brandSlice = createSlice({
  name: ReducersName.Brand,
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<BrandState>) => {
      state = action.payload
    },
  },
})

export const { setBrand } = brandSlice.actions

export const brandReducer = brandSlice.reducer

export const selectBrandState = (state: RootState) => state[ReducersName.Brand]
