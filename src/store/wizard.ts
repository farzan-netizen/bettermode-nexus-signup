import { createSlice } from '@reduxjs/toolkit'
import { ReducersName } from './constants'

export interface WizardState {
  form: {
    hasMigrationPreference?: boolean | null
    existingCommunityName?: string
    communityName?: string
    description?: string
    websiteUrl?: string
    logo?: File | null
    primaryColor?: string
    isManualBranding?: boolean
    selectedSpaces?: string[]
  }
}

const initialState: WizardState = {
  form: {},
}

export const wizardSlice = createSlice({
  name: ReducersName.Wizard,
  initialState,
  reducers: {},
})

export const {} = wizardSlice.actions

export const wizardReducer = wizardSlice.reducer
