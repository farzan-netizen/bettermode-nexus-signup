import { configureStore } from '@reduxjs/toolkit'
import { wizardReducer } from './wizard'
import { signupReducer } from './signup'
import { ReducersName } from './constants'
import { brandReducer } from '@/store/brand'

export const store = configureStore({
  reducer: {
    [ReducersName.Signup]: signupReducer,
    [ReducersName.Wizard]: wizardReducer,
    [ReducersName.Brand]: brandReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
