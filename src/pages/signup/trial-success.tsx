interface Props {
  firstName: string
  companyName: string
}

export const TrialSuccess = ({ companyName, firstName }: Props) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-8 z-50 animate-in fade-in slide-in-from-bottom-8 duration-1000"
      style={{
        background: (() => {
          // Get primary color from wizard data if available
          try {
            const wizardData = sessionStorage.getItem('wizard-form-data')
            if (wizardData) {
              const parsedData = JSON.parse(wizardData)
              if (parsedData.primaryColor) {
                const color = parsedData.primaryColor
                return `linear-gradient(120deg, ${color}15 0%, ${color}25 25%, ${color}35 50%, ${color}25 75%, ${color}15 100%), #ffffff`
              }
            }
          } catch (error) {
            console.error('Error parsing wizard primary color:', error)
          }
          // Fallback to original gradient
          return `linear-gradient(120deg, #f8fafc 0%, #e2e8f0 25%, #cbd5e1 50%, #e2e8f0 75%, #f8fafc 100%), #ffffff`
        })(),
      }}
    >
      {/* Success Content */}
      <div className="text-center max-w-2xl">
        {/* Success Message */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          {(() => {
            // Get community name from wizard data if available
            try {
              const wizardData = sessionStorage.getItem('wizard-form-data')
              if (wizardData) {
                const parsedData = JSON.parse(wizardData)
                if (parsedData.communityName) {
                  return `${parsedData.communityName} is ready!`
                }
              }
            } catch (error) {
              console.error('Error parsing wizard data:', error)
            }
            // Fallback to original logic
            return `${companyName || firstName || 'Your community'} is ready!`
          })()}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
          We're setting up your community and preparing everything for launch.
        </p>

        {/* Loading Text */}
        <div className="text-lg text-gray-500">
          <span>Redirecting to onboarding...</span>
        </div>
      </div>
    </div>
  )
}
