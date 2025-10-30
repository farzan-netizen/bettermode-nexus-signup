import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ReducersName } from './constants'
import type { RootState } from '.'

export interface WizardState {
  currentStep: number
  form: {
    hasMigrationPreference?: boolean | null
    existingCommunityName?: string
    communityName?: string
    description?: string
    websiteUrl?: string
    logo?: File | null
    primaryColor?: string
    isManualBranding?: boolean
    spaces?: string[]
  }
}

const initialState: WizardState = {
  currentStep: 1,
  form: {},
}

export const wizardSlice = createSlice({
  name: ReducersName.Wizard,
  initialState,
  reducers: {
    wizardSetCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    wizardGoToNextStep: state => {
      state.currentStep += 1
    },
    wizardGoToPrevStep: state => {
      if (state.currentStep > 1) state.currentStep -= 1
    },
    wizardAppendForm: (
      state,
      action: PayloadAction<Partial<WizardState['form']>>,
    ) => {
      state.form = { ...state.form, ...action.payload }
    },
  },
})

export const {
  wizardAppendForm,
  wizardGoToNextStep,
  wizardGoToPrevStep,
  wizardSetCurrentStep,
} = wizardSlice.actions

export const wizardReducer = wizardSlice.reducer

const wizardSelectState = (state: RootState) => state[ReducersName.Wizard]

export const wizardSelectForm = (state: RootState) =>
  wizardSelectState(state).form

export const wizardSelectCurrentStep = (state: RootState) =>
  wizardSelectState(state).currentStep

export const wizardSelectCommunityName = (state: RootState) =>
  wizardSelectState(state).form?.communityName

export const wizardSelectExistingCommunityName = (state: RootState) =>
  wizardSelectState(state).form?.existingCommunityName

export const wizardSelectSpaces = (state: RootState) =>
  wizardSelectState(state).form?.spaces || []
