export interface SignupFormData {
  email: string
  authMethod: 'email' | 'google'
  verificationCode: string
  password: string
  firstName: string
  lastName: string
  role: string
  jobTitle: string
  companyName: string
  companySize: string
  industry: string
  website: string
  primaryUseCase: string
  currentTools: string[]
  enterpriseFeatures: string[]
  expectedUserCount: string
  selectedPlan: string
}

export interface EnterpriseFeature {
  id: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}
