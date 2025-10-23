import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReducersName } from './constants'
import { RootState } from '.'

export interface SignupState {
  currentStep: number
  authMethod: 'email' | 'google'
  form: {
    email?: string
    password?: string
    firstName?: string
    lastName?: string
    role?: string
    jobTitle?: string
    companyName?: string
    companySize?: string
    industry?: string
    website?: string
    primaryUseCase?: string
    currentTools?: string[]
    enterpriseFeatures?: string[]
    expectedUserCount?: string
    selectedPlan?: string
  }
}

const initialState: SignupState = {
  currentStep: 1,
  form: {},
  authMethod: 'email',
}

export const signupSlice = createSlice({
  name: ReducersName.Signup,
  initialState,
  reducers: {
    signupSetCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    signupGoToNextStep: state => {
      state.currentStep += 1
    },
    signupGoToPrevStep: state => {
      if (state.currentStep > 1) state.currentStep -= 1
    },
    signupAppendForm: (
      state,
      action: PayloadAction<Partial<SignupState['form']>>,
    ) => {
      state.form = { ...state.form, ...action.payload }
    },
    signupSetGoogleAuthData: (
      state,
      action: PayloadAction<
        Pick<SignupState['form'], 'email' | 'firstName' | 'lastName'>
      >,
    ) => {
      state.authMethod = 'google'
      state.form = {
        ...state.form,
        ...action.payload,
      }
    },
  },
})

export const {
  signupGoToNextStep,
  signupGoToPrevStep,
  signupAppendForm,
  signupSetGoogleAuthData,
  signupSetCurrentStep,
} = signupSlice.actions

export const signupReducer = signupSlice.reducer

const signupSelectState = (state: RootState) => state[ReducersName.Signup]

export const signupSelectForm = (state: RootState) =>
  signupSelectState(state).form

export const signupSelectEmail = createSelector(
  [signupSelectForm],
  form => form.email,
)

export const signupSelectCurrentStep = createSelector(
  [signupSelectState],
  state => state.currentStep,
)
